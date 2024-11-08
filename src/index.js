import express from 'express';
import AlumnoRoute from './routes/AlumnosRoute.js';
import ProfesorRoute from './routes/ProfesoresRoute.js';
import morgan from 'morgan';

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.use('/', AlumnoRoute);
app.use('/', ProfesorRoute);

// Starting server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})

