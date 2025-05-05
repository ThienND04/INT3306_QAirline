const express = require('express');
const db = require('./config/db');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const cors = require('cors');
const route = require('./routes/index');

const app = express();
db.connect();

app.use(morgan('combined'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
route(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;
