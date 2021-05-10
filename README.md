#Webserver 
conCredito Examen de Vacante Programador JR 
Desarrollado en nodeJS y html, css y js sin framework de frontend.
APP basica donde la ruta default (localhost:8080) nos muestra el listado de prospectos almacenados en la DB.
Una vez agregado un prospecto se puede consultar la informacion asi como los documentos agregados y evaluar cambiando su estatus de "AUTORIZADO" o "RECHAZADO" si esta ultima opcion se selecciona aparecera un input/text de ingresar "Observaciones(campo obligatorio)".
Una vez evaluado el prospecto no puede volver a evaluarse por lo tanto no se accedera mas a ese apartado pero si se puede consultar dicha informacion del prospecto.

->Ejecutar "npm install" en el power shell con direccion dentro de la carpeta del proyecto.
->.env ya esta configurada una DB de mongo para su testeo.
->Ejecutar "nodemon app" o "node app" de igual manera en el power shell con direccion dentro de la carpeta del proyecto y abrir en el navegador "localhost:8080(O el puerto que llegue a configurar, por default esta en 8080)".