const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productId : {
        type : Number,
        required : true
    },
        productName : {
        type : String,
        required : true
    }
    
});


module.exports = mongoose.model('Product',productSchema);