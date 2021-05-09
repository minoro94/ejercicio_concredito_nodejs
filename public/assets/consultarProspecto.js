const id = window.location.search;
const urlParams = new URLSearchParams(id);
const _id = urlParams.get('id');
const observaciones = document.getElementById("observaciones");
const archivo = document.getElementById("archivo");
const divPadre = document.getElementById("divPadre");

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
        formulario.estatusConsulta.value = `Estatus: ${dataConsulta.estatus}`;
        for (let i = 0; i < dataConsulta.archivos.length; i++) {
            let elemento = document.createElement("option");
            let cadenaSeparada = dataConsulta.archivos[i].split("¿");
            elemento.value = dataConsulta.archivos[i];
            elemento.textContent = cadenaSeparada[1];
            archivo.appendChild(elemento);
        }
        if (dataConsulta.observaciones != '') {
            observaciones.classList.add('on');
            formulario.observacionesConsulta.value = `Observaciones: ${dataConsulta.observaciones}`;
        } else {
            observaciones.classList.remove('on');
        }
    } else {
        alert(`EL id: ${id} no existe`);
        window.location = `index.html`;
    }
};

abrirArchivo = () => {
    if (archivo.options[archivo.selectedIndex].value != 'Seleccione un Archivo') {
        return window.open(`/uploads/${archivo.options[archivo.selectedIndex].value}`);
    }
    alert('Seleccione un archivo para abrir');
};

window.onload = cargarProspectoporId(_id);