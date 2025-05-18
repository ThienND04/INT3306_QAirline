const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const bcrypt = require("bcryptjs");

const otpSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    otpCode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '10m' }, 
    isUsed: { type: Boolean, default: false }
});

otpSchema.pre("save", async function (next) {
    if (!this.isModified("otpCode")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.otpCode = await bcrypt.hash(this.otpCode, salt);
        next();
    } catch (error) {
        next(error);
    }
}
);

otpSchema.plugin(mongooseDelete, 
    { 
        overrideMethods: 'all',
        deletedAt: true,
    });

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 }); // 10 minutes expiration

module.exports = mongoose.model('Otp', otpSchema);