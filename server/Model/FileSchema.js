const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    "name": String,
    "type": String,
    "size": String,
    "image": Buffer,
    "path": String
})

module.exports = mongoose.model("File", FileSchema);