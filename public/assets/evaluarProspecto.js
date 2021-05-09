const id = window.location.search;
const urlParams = new URLSearchParams(id);
const _id = urlParams.get('id');
const seleccion = document.getElementById('estatus');
const info = document.getElementById('info');
const observacion = document.createElement('input');
const error_box = document.getElementById("error_box");
const error = document.getElementsByClassName("error");
let prospecto_observaciones,
    prospecto_estatus;

cargarProspectoporId = async(id) => {
    let url = (window.location.hostname.includes('localhost')) ?
        `http://localhost:8080/api/prospectos/${id}` :
        `https://restserver-concredito.herokuapp.com/api/prospectos/${id}`;
    const respuesta = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-cache'
    });
    if (respuesta.status == 200) {
        const dataConsulta = await respuesta.json();
        formulario.nombreConsulta.value = `Nombre: ${dataConsulta.nombre}`;
        formulario.primerapellidoConsulta.value = `Primer Apellido: ${dataConsulta.primerapellido}`;
        formulario.segundoapellidoConsulta.value = `Segundo Apellido: ${dataConsulta.segundoapellido}`;
        formulario.telefonoConsulta.value = `Telefono: ${dataConsulta.telefono}`;
        formulario.rfcConsulta.value = `RFC: ${dataConsulta.rfc}`;
        formulario.calleConsulta.value = `Calle: ${dataConsulta.calle}`;
        formulario.numeroConsulta.value = `Numero: ${dataConsulta.numero}`.toString();
        formulario.coloniaConsulta.value = `Colonia: ${dataConsulta.colonia}`;
        formulario.codigopostalConsulta.value = `Codigo Postal: ${dataConsulta.codigopostal}`;
        for (let i = 0; i < dataConsulta.archivos.length; i++) {
            let elemento = document.createElement("option");
            let cadenaSeparada = dataConsulta.archivos[i].split("¿");
            elemento.value = dataConsulta.archivos[i];
            elemento.textContent = cadenaSeparada[1];
            archivo.appendChild(elemento);
        }
        // formulario.estatusConsulta.value = `Estatus: ${dataConsulta.estatus}`;
    } else {
        alert(`EL id: ${id} no existe`);
        window.location = `index.html`;
    }
};

formulario.addEventListener('submit', async(e) => {
    if (evaluarProspecto(e)) {
        let url = (window.location.hostname.includes('localhost')) ?
            `http://localhost:8080/api/prospectos/${_id}` :
            `https://restserver-concredito.herokuapp.com/api/prospectos/${id}`;
        const respuesta = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": _id,
                "observaciones": prospecto_observaciones,
                "estatus": prospecto_estatus
            }),
            cache: 'no-cache'
        }).then((response) => {
            if (response.status == 200) {
                alert('Prospecto Evaluado Correctamente');
                window.location = `index.html`;
            } else {
                console.log(response);
                alert('Ocurrio un error');
            }
        });


    }
});


function evaluarProspecto(e) {
    e.preventDefault();

    if (seleccion.options[seleccion.selectedIndex].value == 'RECHAZADO') {
        prospecto_observaciones = formulario.observacion.value.trim();
    } else {
        prospecto_observaciones = '';
    }
    prospecto_estatus = seleccion.options[seleccion.selectedIndex].value;
    console.log(prospecto_estatus);
    console.log(prospecto_observaciones);
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
    if (prospecto_observaciones == '' && prospecto_estatus == 'RECHAZADO') {
        return false;
    }

    return true;
};
window.onload = cargarProspectoporId(_id);

opcion = () => {
    if (seleccion.options[seleccion.selectedIndex].text == 'Rechazado') {
        observacion.type = "textarea";
        observacion.placeholder = "Obeservaciones";
        observacion.setAttribute("name", "observacion");
        observacion.setAttribute("class", "error");
        observacion.setAttribute("class", "place");
        info.appendChild(observacion);
    } else {
        info.removeChild(observacion);
    }
};

abrirArchivo = () => {
    if (archivo.options[archivo.selectedIndex].value != 'Seleccione un Archivo') {
        return window.open(`/uploads/${archivo.options[archivo.selectedIndex].value}`);
    }
    alert('Seleccione un archivo para abrir');
};