// const usersRoute = require('../routes/users');
// const homeRoute = require('../routes/home');
// const { errorMidLogger } = require('../middleware/midErrors');
import { Application } from 'express'
import homeRoute from './homeRoute'
import itemsRoute from './api/nodeRoute'
import routesErrorsLogger from '../middleware/routesErrors';

export default function(app: Application) {
    app.use('/', homeRoute);
    app.use('/api/node', itemsRoute);

    app.use(routesErrorsLogger);
}