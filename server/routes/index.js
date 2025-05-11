const userRouter = require('./user');
const aircraftRouter = require('./aircraft');
const flightRouter = require('./flight');
const airportRouter = require('./airport');
const ticketRouter = require('./ticket');

function Route(app) {
    app.use('/aircrafts', aircraftRouter);
    app.use('/flights', flightRouter);
    app.use('/airports', airportRouter);
    app.use('/tickets', ticketRouter);
    app.use('/users', userRouter);
    // app.use('/', siteRoute);
}

module.exports = Route;