const userRouter = require('./user');
const aircraftRouter = require('./aircraft');
const flightRouter = require('./flight');
const airportRouter = require('./airport');
const ticketRouter = require('./ticket');
const authRouter = require('./auth');

const version = process.env.API_VERSION || 'v1';

function Route(app) {
    app.use(`/api/${version}/auth`, authRouter);
    app.use(`/api/${version}/aircrafts`, aircraftRouter);
    app.use(`/api/${version}/flights`, flightRouter);
    app.use(`/api/${version}/airports`, airportRouter);
    app.use(`/api/${version}/tickets`, ticketRouter);
    app.use(`/api/${version}/users`, userRouter);
    // app.use('/', siteRoute);
}

module.exports = Route;