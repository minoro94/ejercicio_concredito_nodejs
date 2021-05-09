const cors = require('cors');
const express = require('express');
const { dbConection } = require('../db/config.db');
const multer = require('multer');
const path = require('path');
const creadorId = require('../helpers/uuid-creador');
let nameArchivo = [];
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        let nombreArchivo = file.originalname.replace(/ /g, "_");
        const nombreArchivoId = new creadorId();
        nombreArchivo = `${nombreArchivoId.id}¿${nombreArchivo}`;
        nameArchivo.push(nombreArchivo);
        cb(null, nombreArchivo);
    }
});



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.prospectosPath = '/api/prospectos';
        //Conectar a la DB
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Parseo y lectura
        this.app.use(express.json());
        //Rutas de la aplicacion
        this.routes();
    }


    async conectarDB() {
        await dbConection();
    }



    middlewares() {
        this.app.use(multer({
            storage,
            dest: path.join(__dirname, '../public/uploads'),
            fileFilter: (req, file, cb) => {
                const filetypes = /pdf/;
                const mimetype = filetypes.test(file.mimetype);
                const extname = filetypes.test(path.extname(file.originalname));
                if (mimetype && extname) {
                    return cb(null, true);
                }
                cb("Error el archivo debe ser un PDF valido");
            }
        }).array('file'));
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    obtenerNombreArchivos(ArregloArchivos = []) {
        ArregloArchivos = nameArchivo;
        nameArchivo = [];
        return ArregloArchivos;
    }

    routes() {
        this.app.use(this.prospectosPath, require('../routes/prospectos.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;