const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const slug = require('mongoose-slug-generator');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true }, 
    address: { type: String, required: true }, 

    lastName: { type: String, required: true }, 
    middleAndFirstName: { type: String, required: true }, 

    displayOrder: { type: Number, enum: [1, 2], default: 1 }, 
    gender : { type: String, enum: ['Nam', 'Nữ', 'Khác'], required: true }, 

    birthDate: {
        day: { type: Number, required: true },
        month: { type: Number, required: true },
        year: { type: Number, required: true }
    },

    nationality: { type: String, required: true }, // Quốc tịch
    language: { type: String, required: true }, // Ngôn ngữ
    role: { type: String, enum: ['user', 'admin'], default: 'user' },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
}
);

mongoose.plugin(slug);

module.exports = mongoose.model('User', userSchema);
