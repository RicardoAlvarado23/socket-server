import Server from './clases/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = Server.instance;

// Middleware para la configuracion del bodyparser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

// COrs

server.app.use(cors({
    origin: true,
    credentials: true
}));

// Middleware para las rutas
server.app.use('/', router);

server.start(() => {
    console.log(`El Servidor esta corriendo en el puerto: ${server.port}`);
});