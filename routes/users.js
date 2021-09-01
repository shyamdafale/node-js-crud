const express = require("express");
const router = express.Router();
const User = require("../model/user");


router.get('/', async (req, res) => {

    console.log("Users Get Request is Called");

    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error is " + error);
    }
});

router.get('/:id', async (req, res) => {

    console.log("Users Get Request is Called for ID =" + req.params.id);

    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        console.error("Error is " + error);
        res.send("Error is " + error)
    }
});

router.post('/signup', async (req, res) => {

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        password: req.body.password,
        loginAttempt: req.body.loginAttempt
    });

    try {
        const a1 = await user.save();
        res.json(a1);
    } catch (error) {
        console.error("Error is " + error);
        res.send("<h1>Error while fetching the Users</h1><p>" + error + "</p>");
    }

});



router.patch('/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        user.mobileNo = req.body.mobileNo;
        const u1 = await user.save();
        res.json(u1);
    } catch (error) {
        console.error("Error is " + error);
        res.send("<h1>Error while fetching the Users</h1><p>" + error + "</p>");
    }

});


router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: "Cannot authorize user.",
            });
        }
        //1. Find if any account with that email exists in DB
        const user = await User.findOne({ email: email });
        // NOT FOUND - Throw error
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "Account not found",
            });
        }

        //3. Verify the password is valid
        const isValid = await User.findOne({ password: password });
        if (!isValid) {
            return res.status(400).json({
                error: true,
                message: "Invalid credentials",
            });
        }
        await user.save();

        //Success
        return res.send({
            success: true,
            message: "User logged in successfully",
        });
    } catch (err) {
        console.error("Login error", err);
        return res.status(500).json({
            error: true,
            message: "Couldn't login. Please try again later.",
        });
    }
});


module.exports = router;