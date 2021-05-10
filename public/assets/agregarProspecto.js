const btnEnviar = document.getElementById('agregarProspecto');
const error_box = document.getElementById("error_box");
const error = document.getElementsByClassName("error");
let url = 'http://localhost:8080/api/prospectos';
let prospecto_nombre,
    prospecto_primerapellido,
    prospecto_segundoapellido,
    prospecto_telefono,
    prospecto_rfc,
    prospecto_calle,
    prospecto_numero,
    prospecto_colonia,
    prospecto_codigopostal,
    fileField,
    nombreArchivos = {},
    nombreArchivo;

formulario.addEventListener('submit', async(e) => {
    if (agregarProspecto(e)) {
        let formData = new FormData();
        for (const file of fileField.files) {
            console.log(file);
            formData.append("file", file);
            nombreArchivo = file.name.replace(/ /g, "_");
            formData.append("archivos", nombreArchivo);
        }
        console.log(nombreArchivos);
        formData.append("nombre", prospecto_nombre);
        formData.append("primerapellido", prospecto_primerapellido);
        formData.append("segundoapellido", prospecto_segundoapellido);
        formData.append("calle", prospecto_calle);
        formData.append("numero", prospecto_numero);
        formData.append("colonia", prospecto_colonia);
        formData.append("codigopostal", prospecto_codigopostal);
        formData.append("telefono", prospecto_telefono);
        formData.append("rfc", prospecto_rfc);

        await fetch(url, {
            method: 'POST',
            body: formData,
            cache: 'no-cache'
        }).then((response) => {
            console.log(response);
            if (response.status == 200) {
                alert('Prospecto Agregado Correctamente');
                limpiaFormulario();
            } else {
                alert('Ocurrio un error');
            }
        });


    }
});

function agregarProspecto(e) {
    e.preventDefault();
    prospecto_nombre = formulario.nombre.value.trim();
    prospecto_primerapellido = formulario.primerapellido.value.trim();
    prospecto_segundoapellido = formulario.segundoapellido.value.trim();
    prospecto_telefono = parseInt(formulario.telefono.value.trim());
    prospecto_rfc = formulario.rfc.value.trim();
    prospecto_calle = formulario.calle.value.trim();
    prospecto_numero = formulario.numero.value.trim();
    prospecto_colonia = formulario.colonia.value.trim();
    prospecto_codigopostal = parseInt(formulario.codigopostal.value.trim());
    fileField = document.getElementById("inpFile");
    if (validarFormulario()) {
        error_box.classList.remove('active');
        for (let index = 0; index < error.length; index++) {
            error[index].classList.remove('active');
        }
        return true;
    } else {
        error_box.classList.add('active');
        error_box.innerHTML = 'Por favor completa el formulario correctamente';
        for (let index = 0; index < error.length; index++) {
            error[index].classList.add('active');
        }
        return false;
    }
}

validarFormulario = () => {
    if (prospecto_nombre == '' || prospecto_primerapellido == '' || isNaN(prospecto_telefono) || prospecto_rfc == '' ||
        prospecto_calle == '' || prospecto_numero == '' || prospecto_colonia == '' || isNaN(prospecto_codigopostal) || formulario.file.value == '') {
        return false;
    }

    return true;
};

limpiaFormulario = () => {
    formulario.nombre.value = "";
    formulario.primerapellido.value = "";
    formulario.segundoapellido.value = "";
    formulario.telefono.value = "";
    formulario.rfc.value = "";
    formulario.calle.value = "";
    formulario.numero.value = "";
    formulario.colonia.value = "";
    formulario.codigopostal.value = "";
    formulario.file.value = "";
};

validarExtension = () => {
    let archivo = document.getElementById("inpFile").value,
        extension = archivo.substring(archivo.lastIndexOf('.'), archivo.length);
    if (document.getElementById("inpFile").getAttribute('accept').split(',').indexOf(extension) < 0) {
        alert(`Archivo no valido. No se permite la extension ${extension}`);
        formulario.file.value = "";
    }
};
window.addEventListener('beforeunload', ev => {
    ev.returnValue = 'Da igual lo que escriba sale un msg por defecto :p';
});