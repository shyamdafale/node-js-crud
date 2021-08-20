const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const url = "mongodb://localhost/UrbanFarmerDB";
const app = express();



mongoose.connect(url,{useNewUrlParser:true});
const con =  mongoose.connection;

con.on('open',function() {
    console.log("Connecting...");
})

//Middleware to be impored and used
app.use(express.json());
app.use(cors());


const userRouter =  require("./routes/users");
app.use('/users',userRouter);



app.listen(9000, () => {
    console.log("The Server is running on http://localhost:9000");
});


