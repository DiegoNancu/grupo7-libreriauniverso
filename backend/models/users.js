const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
    },
    rut: {
        type: String,
        required: true,
        minLength: 11,
        maxLength: 12,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
    },
    email: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
    },
    number: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 9,
    },
});

module.exports = mongoose.model("user", userSchema);