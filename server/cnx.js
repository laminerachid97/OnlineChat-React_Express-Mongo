const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    await mongoose.connect(process.env.mongoURI)
        .then(() => console.log('connected'))
        .catch(err => console.error(err))
}

module.exports = connectDB;

