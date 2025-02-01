const sendToken = (user, statusCode, res) => {
    // Creating JWT Token
    const token = user.getJwtToken();

    // Setting cookies

    const options = {
        expires:new Date(
            Date.now()+ process.env.COOKIE_EXPRIES_TIME *24 *60  *60 * 1000
            ),
        //  not acces js 
        httponly: true,

    }

    res.status(statusCode)
    .cookie('token', token,options)
    .json({
        success: true,
        token,
        user
    });
};

module.exports = sendToken;
