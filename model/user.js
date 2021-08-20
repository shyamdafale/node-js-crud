const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName : {
        type : String,
        required : true
    },

    lastName : {
        type : String
    },

    email : {
        type : String,
        required : true
    },
    mobileNo : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    loginAttempt : {
        type : Number,
        default : 0
    }

});


module.exports = mongoose.model('User',userSchema);

