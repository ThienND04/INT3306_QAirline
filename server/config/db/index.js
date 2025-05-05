const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://qairlineAdmin:uetnhucac@atlascluster.qwjmruh.mongodb.net/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: 'admin',
        });
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection error:', error);
    }
}

module.exports = {connect};