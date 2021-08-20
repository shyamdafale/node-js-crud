const express = require("express");
const router = express.Router();
const User = require("../model/user");


router.get('/',async(req,res)=> {

    console.log("Users Get Request is Called");

    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error is "+error);
    }
});

router.get('/:id',async(req,res)=> {

    console.log("Users Get Request is Called for ID ="+ req.params.id);

    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        console.error("Error is "+error);
        res.send("Error is "+error)
    }
});

router.post('/', async(req,res)=> {

const user = new User({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    mobileNo : req.body.mobileNo,
    password : req.body.password,
    loginAttempt : req.body.loginAttempt
});

try {
    const a1 = await user.save();
    res.json(a1);
} catch (error) {
    console.error("Error is "+error);
    res.send("<h1>Error while fetching the Users</h1><p>"+error+"</p>");
}

});



router.patch('/:id', async(req,res)=> {
    
    try {

        const user = await User.findById(req.params.id);
        user.mobileNo = req.body.mobileNo;
        const u1 = await user.save();
        res.json(u1);
    } catch (error) {
        console.error("Error is "+error);
        res.send("<h1>Error while fetching the Users</h1><p>"+error+"</p>");
    }
    
    });
    


module.exports = router;

