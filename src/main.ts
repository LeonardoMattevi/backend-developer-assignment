import morgan from 'morgan'
import config from 'config'
import helmet from 'helmet'
import indexRoutes from './routes/index'
import express, { Application } from 'express'
// import * as expressAsyncErrors from 'express-async-errors';
require('express-async-errors');

const app: Application = express();
const port: Number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
config.get<Boolean>('enableAccessLogs') && app.use(morgan('tiny'));
app.use(helmet());
app.use(express.static('public'));
indexRoutes(app);

app.listen(port, () => console.log(`server "${config.get<Boolean>('name') }" start on ${port}...`))