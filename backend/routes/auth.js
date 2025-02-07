require("dotenv").config();

const express = require("express");
const router = express.Router();
const User = require("../models/user")

const jwt = require('jsonwebtoken');

//TODO: should encrypt passwords and add token expiration

// register new user
router.post("/register", async(req, res) => {
    try {
        const { email, password } = req.body;

        //check if user already exists 
        const existingUser = await User.findOne({email: email})
        if (existingUser) {
            return res.status(400).json({ error: "User Already Exists"})
        }

        //create new user model
        const newUser = new User({ email, password }); 
        await newUser.save();

        //finished
        res.status(201).json({
            message: "User Created"
        });
    } catch (err) {
        res.status(500).json({ error: "Error Creating User" });
    }
});

// allow user to login
router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        // get user from email
        const user = await User.findOne({ email: email });

        // check if user exists and password matches emails password
        if (!user || user.password != password) {
            return res.status(401).json("Invalid Login");
        }

        // create and return auth token to user
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: "Error Logging In" });
    }
})

module.exports = router;