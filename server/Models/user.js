const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
})

const CounterUser = mongoose.model('CounterUser', counterSchema);

const UserSchema = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: Number,
    createdAt: { type: Date, default: Date.now }
});

// Pre-save hook to auto-increment `_id`
UserSchema.pre("save", async function (next) {
    if (this.isNew) {  // Only for new documents
        const counter = await CounterUser.findByIdAndUpdate(
            { _id: "userId" }, // Counter name
            { $inc: { seq: 1 } }, // Increment the sequence
            { new: true, upsert: true }
        );
        this._id = counter.seq; // Set the incremented value as `_id`
    }
    next();
});

// Hash password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    try {
        const Salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, Salt);
        next();
    } catch (error) {
        next(error);
    }
})

UserSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const user = await User.findOne({ email: this.email });
            if (!user) {
                next();
            } else {
                
                next(new Error("Already Exists"));
            }
        } catch (err) {
            next(err); 
        }
    } else {
        next();
    }
})

UserSchema.methods.verifyPassword = async function (userPassword) {
    try {
        return await bcrypt.compare(userPassword, this.password)
    } catch (error) {
        throw new Error(error);
    }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;