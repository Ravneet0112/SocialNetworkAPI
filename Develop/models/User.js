const mongoose = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Must use a valid email address'] },
        thoughts: [],
        friends: [],
    });
