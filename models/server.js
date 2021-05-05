const cors = require('cors');
const express = require('express');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.prospectosPath = '/api/prospectos';
        //Middlewares
        this.middlewares();
        //Parseo y lectura
        this.app.use(express.json());
        //Rutas de la aplicacion
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.prospectosPath, require('../routes/prospectos'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;