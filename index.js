const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const url = "mongodb://localhost/UrbanFarmerDB";
const url = `mongodb+srv://admin:admin@cluster0.kszi7.mongodb.net/urbanfarmer?retryWrites=true&w=majority`
const app = express();
const morgan = require('morgan')
app.use(morgan('combined'))
const serverless = require("serverless-http");


mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on('open', function () {
    console.log("mongo is running .. 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ");
})

//Middleware to be impored and used
app.use(express.json());
app.use(cors());


const userRouter = require("./routes/users");
app.use('/users', userRouter);

app.listen(4000, () => {
    console.log("The Server is running on http://localhost:9000");
});


module.exports = app;


module.exports.handler = serverless(app);
