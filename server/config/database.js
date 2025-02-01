const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(con => {
      console.log(`MongoDb is connected to the host: ${con.connection.host}`);
    })
    // .catch((err) => {
    //     console.log(err)
    // })
    // we removed catch function because while we enter wrong DB path
    // that time it will make an error with db running
    // with out catch its an Unhandle Rejection Error

};

module.exports = connectDatabase;
