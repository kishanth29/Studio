const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter name']

    },
    email:{
        type:String,
        required:[true,'please enter email'],
        unique:true,
        validate:[validator.isEmail,'please enter valid email address']

    },
    password:{
        type:String,
        required:[true, 'please enter password'],
        maxlength:[6,'password cannot exceed 6 characters'],
        //  select field using for not showing password while usser getting data
        select: false
    },
    avatar:{
        type:String
        
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date,
    
    createdAT:{
        type: Date,
        default: Date.now
    },
    
})

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);     
})




//  jwt token

UserSchema.methods.getJwtToken = function (){
    return jwt.sign({id:this.id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES_TIME
    })    
}


// // password verification both are same or not


UserSchema.methods.isValidPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}



//  reset password token

UserSchema.methods.getResetToken = function(){
    //  generate token
    const token = crypto.randomBytes(20).toString('hex');
    //  enerate hash and set reset password token
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    // set token expired time 30 minutes
    this.resetPasswordTokenExpire = Date.now() + 70 * 600 * 1000;

    return token
}

const User = mongoose.model('User', UserSchema);

module.exports = User;