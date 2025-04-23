const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type:Number, default: 0 }
})

const CounterChat = mongoose.model('CounterChat', counterSchema);

const chatSchema = new mongoose.Schema({
    _id: Number,
    senderId: { type: Number, required: true },
    senderName: { type: String, required: true },
    message: { type: String, required: true },
    sentAt: { type: Date, default: Date.now }
})

chatSchema.pre("save", async function (next) {
    if (this.isNew) {  // Only for new documents
        const counter = await CounterChat.findByIdAndUpdate(
            { _id: "userId" }, // Counter name
            { $inc: { seq: 1 } }, // Increment the sequence
            { new: true, upsert: true }
        );
        this._id = counter.seq; // Set the incremented value as `_id`
    }
    next();
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;