import express from 'express';
import AlumnoRoute from './routes/alumnos.route.js';
import ProfesorRoute from './routes/profesores.route.js';
import fileUpload from 'express-fileupload';

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(
    fileUpload({
        useTempFiles: false
    })
);

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

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})

