const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Flight Booking API',
            version: '1.0.0',
            description: 'API tài liệu cho hệ thống đặt vé máy bay',
        },
        servers: [
            { url: 'http://localhost:5000/api/v1' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // hoặc có thể bỏ nếu không dùng JWT
                },
            },
        },
        security: [
            {
                bearerAuth: []
            }
        ],
    },
    apis: ['./routes/*.js'], // nơi chứa swagger comment (dùng JSDoc)
};

const specs = swaggerJsdoc(options);
module.exports = specs;