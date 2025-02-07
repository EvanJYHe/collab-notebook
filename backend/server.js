require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL)
    .then((result) => console.log("connected to db"))
    .catch((err) => console.log(err))

