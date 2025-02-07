const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Note = mongoose.model("Note", noteSchema); // looks in Notes, singular of collection name
module.exports = Note;