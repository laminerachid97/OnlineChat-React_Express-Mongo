const express = require('express');
const apis = express.Router();
const User = require('./Models/user');
const Chat = require('./Models/chat');

apis.get('/test', (req, res) => {
    res.json("test");
})

apis.post('/new-user', async (req, res) => {
    const userInfo = req.body;

    try {
        if (userInfo) {
            const user = new User(userInfo);
            await user.save()
                .then(savedUser => {
                    console.log(savedUser);
                    res.status(200).json({ message: `new user saved ${user._id}`, id: user._id, name: user.name });
                });
        } else {
            res.status(404).json({ message: `no user exist` });
        }
    } catch (error) {
        console.error(error.message);
        res.status(404).json({ message: error.message });
    }
})

apis.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email })

    if (user) {
        const isMatch = await user.verifyPassword(password);
        if (isMatch) {
            res.status(200).json({ message: user });
        } else {
            res.status(404).json({ message: "password incorrect" });
        }
    } else {
        res.status(404).json({ message: "email incorrect" });
    }
})

apis.post('/new-chat', async (req, res) => {
    const infoChat = req.body;

    try {
        if (infoChat) {
            const chat = new Chat(infoChat);
            await chat.save()
                .then(saveChat => {
                    console.log(saveChat);
                    res.status(200).json({ message: `new user saved ${chat._id}` });
                });

        }
    } catch (error) {
        console.error(error.message);
        res.status(404).json({ message: error.message });
    }

})

apis.get('/get-messages', async (req, res) => {

    try {
        const lenMessages = await Chat.find()
        .sort({ _id: -1 })  // descending order (newest first)
        .limit(20);
        res.status(200).json({ message: lenMessages.reverse() });
    } catch (error) {
        console.error(error.message);
        res.status(404).json({ message: error.message });
    }

})

module.exports = apis;