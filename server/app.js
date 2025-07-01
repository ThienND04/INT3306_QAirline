const express = require('express');
const db = require('./config/db');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const cors = require('cors');
const route = require('./routes/index');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const createAdmin = require('./utils/createAdmin');

createAdmin();

const app = express();
db.connect();

app.use(morgan('combined'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
route(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
