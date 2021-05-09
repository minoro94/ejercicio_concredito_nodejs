let tabla = document.getElementById("tabla");
let registros = document.getElementById("registros");
const btnCargarProspectos = document.getElementById('btn_cargar_usuarios');
let url = (window.location.hostname.includes('localhost')) ?
    'http://localhost:8080/api/prospectos/' :
    'https://restserver-concredito.herokuapp.com/api/prospectos';

consultarProspectos = (id) => {
    window.location = `consultarProspecto.html?id=${id}`;
};
evaluarProspecto = (id) => {
    window.location = `evaluarProspecto.html?id=${id}`;
};
cargarProspectos = async() => {
    tabla.innerHTML = '<tr><th>Nombre</th><th>Primer Apellido</th><th>Segundo Apellido</th><th>Estatus</th><th>Consultar</th><th>Evaluar</th></tr>';
    const respuesta = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    loader.classList.add('active');
    const data = await respuesta.json();
    if (data.total > 0) {
        for (let i = 0; i < data.prospectos.length; i++) {
            const prospecto = data.prospectos[i];
            let elemento = document.createElement('tr');
            elemento.innerHTML += ("<td>" + prospecto.nombre + "</td>");
            elemento.innerHTML += ("<td>" + prospecto.primerapellido + "</td>");
            elemento.innerHTML += ("<td>" + prospecto.segundoapellido + "</td>");
            elemento.innerHTML += ("<td>" + prospecto.estatus + "</td>");
            elemento.innerHTML += (`<td><button id='btn_consultar' class='btn active' value="${prospecto._id}" onclick="consultarProspectos(value)" >Consultar</button></td>`);
            if (prospecto.estatus == 'RECHAZADO' || prospecto.estatus == 'AUTORIZADO') {
                elemento.innerHTML += (`<td><button id='btn_evaluar' class='agregar active' value="${prospecto._id}" onclick="evaluarProspecto(value)" disabled>Evaluar</button></td>`);
            } else {
                elemento.innerHTML += (`<td><button id='btn_evaluar' class='agregar active' value="${prospecto._id}" onclick="evaluarProspecto(value)">Evaluar</button></td>`);
            }

            tabla.appendChild(elemento);
        }
        loader.classList.remove('active');
        registros.classList.remove('active');
    } else {
        loader.classList.remove('active');
        registros.classList.add('active');
    }
};
window.onload = cargarProspectos();