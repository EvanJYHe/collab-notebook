const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},

    notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
    createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model("User", userSchema); // looks in Users, singular of collection name
module.exports = User;