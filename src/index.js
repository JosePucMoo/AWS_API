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

// Ruta para manejar métodos no permitidos en /alumnos (por ejemplo, POST, PUT, DELETE)
app.all('/profesores', (req, res) => {
    res.status(405).json({
        error: `Método ${req.method} no permitido en ${req.originalUrl}`
    });
});

// Middleware para manejar rutas no encontradas (404)
app.all('*', (req, res) => {
    res.status(404).json({
        error: `Ruta no encontrada: ${req.originalUrl}`
    });
});


// Starting server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})

