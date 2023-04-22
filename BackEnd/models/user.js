const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    
    userName : { type: String, required: true },
    password : { type: String, required: true },
    maxScore : { type: Number, default: 0, required: true },
    cumulativeScore : { type: Number, default: 0, required: true},
    attempts : { type: Number, default: 0, required: true},
    maxAttempts : { type: Number, default: 100, required: true}

});

module.exports = mongoose.model("User", userSchema);