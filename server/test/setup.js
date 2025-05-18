require('dotenv').config({ path: './test/.env.test' });
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');

before(async () => {
    console.log('Mongouri: ', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: 'admin',
    });
    console.log('Database connected successfully for testing');
});

after(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }

    await mongoose.connection.close();
    console.log('Database connection closed after testing');
});

afterEach(async () => {
    // const collections = await mongoose.connection.db.collections();
    // for (let collection of collections) {
    //     await collection.deleteMany({});
    // }
});

global.request = supertest(app);