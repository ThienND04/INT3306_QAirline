const userRouter = require('./user');

function Route(app) {
    app.use('/users', userRouter)
    // app.use('/', siteRoute);
}

module.exports = Route;