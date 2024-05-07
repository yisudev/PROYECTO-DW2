var docentes = []; // lista de docentes
var docente = "";
/*Recuperamos todos los datos del formulario y botones */
const doceId = document.getElementById('doceId');
const doceName = document.getElementById('doceName');
const doceLastName = document.getElementById('doceLastName');
const doceEmail = document.getElementById('doceEmail');
const doceBirth = document.getElementById('doceBirth');
const doceCel = document.getElementById('doceCel');
const addBtn = document.getElementById('addBtn');
const editBtn = document.getElementById('editBtn');
const addFormDoce = document.getElementsByClassName('container-form-add')[0];
const backBtnFormDoce = document.getElementById('atras');
const editFormDoce =document.getElementsByClassName('container-form-edit')[0];
const editFormMateEdit = document.getElementsByClassName('container-form-edit-mate')[0];
const addContainerMate = document.getElementsByClassName('add-container-mate')[0];
/* Funcion añadir docente a la lista */
function addDocente() {
    docentes.push({ //guardamos en el arreglo los valores de los datos del formulario
        doceId: doceId.value,
        doceName: doceName.value,
        doceLastName: doceLastName.value,
        doceEmail: doceEmail.value,
        doceBirth: doceBirth.value,
        doceCel: doceCel.value
    });
    localStorage.setItem('docentes', JSON.stringify(docentes)); //guardamos el arreglo en el local storage
    showDocente(); //mostramos los docentes
}
/* Funcion para mostrar a los docentes en la tabla */
function showDocente() {
    if (localStorage.getItem('docentes') === null) {
        localStorage.setItem('docentes', JSON.stringify(docentes));
    }
    let tr = "";
    docentes = JSON.parse(localStorage.getItem('docentes'));
    docentes.forEach((d) => {
        tr +=
            "<tr><td data-id='" + d.doceId + "' class='docente-name'>" +
            d.doceName +
            " </td><td> " +
            d.doceLastName +
            " </td><td> " +
            d.doceEmail +
            " </td><td>" +
            d.doceBirth +
            " </td><td> " +
            d.doceCel +
            " </td><td><a class='btn btn-primary btn-sm bteditDocente' data-id='" +
            d.doceId +
            "' >Editar</a></td><td><a class='btn btn-danger btn-sm btborrarDocente' data-id='" +
            d.doceId +
            "' >Borrar</a></td></tr>";
    });
    
    document.getElementById('table-body').innerHTML = tr;
    eventosDocente();
}
//funcion para pasar los datos al formulario de editar
function editFormDocente(e) { //recibimos de parametro un evento
	addFormDoce.classList.toggle('hidden');
	editFormDoce.classList.toggle('hidden');
	backBtnFormDoce.classList.toggle('hidden');
    const doceIdInput = e.target.getAttribute('data-id'); //vemos el target del evento y obtenemos el data id
    docentes.forEach((d) => {//recorremos el arreglo con un variable d
        if (d.doceId == doceIdInput) { //verificamos si el doceID es igual Al doce input que agarramos del data id
            document.getElementById('doceIdEdit').value = d.doceId;//guardamos en los input los valores de cada dato del arreglo
            document.getElementById('doceNameEdit').value = d.doceName;
            document.getElementById('doceLastNameEdit').value = d.doceLastName;
            document.getElementById('doceEmailEdit').value = d.doceEmail;
            document.getElementById('doceBirthEdit').value = d.doceBirth;
            document.getElementById('doceCelEdit').value = d.doceCel;
        }
    })
}
//funcion para editar el docente
function editDocente() {
    const doceIdInput = document.getElementById('doceIdEdit').value; // obtenemos el value de doceId para saber que editamos
    docentes.forEach((d) => { //volvemos a recorrer el arreglo
        if (d.doceId == doceIdInput) { //verificamos si doceId es igual al valor que recuperamos de doceId
            d.doceName = document.getElementById('doceNameEdit').value; //guardamos en los datos del arreglo los valores de los input
            d.doceLastName = document.getElementById('doceLastNameEdit').value;
            d.doceEmail = document.getElementById('doceEmailEdit').value;
            d.doceBirth = document.getElementById('doceBirthEdit').value;
            d.doceCel = document.getElementById('doceCelEdit').value;
        }
    })
    localStorage.setItem('docentes', JSON.stringify(docentes)); //guardamos en el local storage el arreglo modificado
    showDocente();//mostramos la tabla de docentes
}
//funcion para eliminar
function deleteElementDocente(e) { //recibimos el evento como parametro
    const doceIdInput = e.target.getAttribute('data-id'); //conseguimos el data id
    docentes.forEach((d, i) => { //recorremos el arreglo
        if (d.doceId == doceIdInput) { // verificamos si el doceID es igual al data id recuperado
            docentes.splice(i, 1); //eliminamos esos datos de docente del arreglo
        }
    })
    localStorage.setItem('docentes', JSON.stringify(docentes)); //guardamos los cambios del arreglo en el local storage
    showDocente();
}
//una funcion con un bucle que detecta cuando se hace click en boton editar o eliminar del docente y llama la funcion correspondiente
function eventosDocente() {
    var btseditar = document.getElementsByClassName("bteditDocente");
    for (let i = 0; i < btseditar.length; i++) {
        btseditar[i].addEventListener("click", editFormDocente);
    }
    var btsborrar = document.getElementsByClassName("btborrarDocente");
    for (let i = 0; i < btsborrar.length; i++) {
        btsborrar[i].addEventListener("click", deleteElementDocente)
    }
    var doceNames = document.querySelectorAll("#table-body .docente-name");
    doceNames.forEach((element) => {
        element.addEventListener("click", function(e) {
            const doceId = e.target.getAttribute('data-id');
            docente = doceId; // Actualizar la variable global docente con el doceId específico de la fila
            console.log("Valor actual de docente:", docente); // Opcional: Mostrar el valor actual de docente en la consola
            addContainerMate.classList.toggle('hidden')
            showMate();
        });
    });

    // También puedes agregar estilos de cursor para indicar que estas celdas son clickeables
    doceNames.forEach((element) => {
        element.style.cursor = "pointer";
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const storedDocentes = localStorage.getItem('docentes');
    if (storedDocentes) {
        docentes = JSON.parse(storedDocentes);
        showDocente();
    }
});
//eventos de click con los botones
backBtnFormDoce.addEventListener('click',()=>{
addFormDoce.classList.toggle('hidden');
editFormDoce.classList.toggle('hidden');
backBtnFormDoce.classList.toggle('hidden');
})
addBtn.addEventListener('click', addDocente);
editBtn.addEventListener('click', editDocente);

var materias = [];

const mateID = document.getElementById('mateID');
const mateName = document.getElementById('mateName');
const mateCodi = document.getElementById('mateCodi');
const mateAno = document.getElementById('mateAno');
const addBtnMate = document.getElementById('addBtnMate');
const editBtnMate = document.getElementById('editBtnMate');

function addMate() {
    materias.push({
        doceID: docente,
        mateID: mateID.value,
        mateName: mateName.value,
        mateCodi: mateCodi.value,
        mateAno: mateAno.value
    });
    localStorage.setItem('materias', JSON.stringify(materias));
    showMate();
}

function showMate() {
    let tr = "";
    if (localStorage.getItem('materias') === null) {
        localStorage.setItem('materias', JSON.stringify(materias));
    }
    materias.forEach((m) => {
        if (m.doceID == docente) {
            tr +=
                "<tr><td>" +
                m.mateName +
                " </td><td> " +
                m.mateCodi +
                " </td><td> " +
                m.mateAno +
                "</td><td><a class='btn btn-primary btn-sm bteditMate' data-id='" +
                m.mateID +
                "' >Editar</a></td><td><a class='btn btn-danger btn-sm btborrarMate' data-id='" +
                m.mateID +
                "' >Borrar</a></td></tr>";
        }
    });
    document.getElementById('table-body-materia').innerHTML = tr;
    eventosMate();
}

function editFormMate(e) {
	editFormMateEdit.classList.toggle('hidden')
    const mateIdInput = e.target.getAttribute('data-id');
    materias.forEach((m) => {
        if (m.mateID == mateIdInput) {
            document.getElementById('mateIDEdit').value = m.mateID;
            document.getElementById('mateNameEdit').value = m.mateName;
            document.getElementById('mateCodiEdit').value = m.mateCodi;
            document.getElementById('mateAnoEdit').value = m.mateAno;
        }
    });
}

function editMate() {
    const mateIDInput = document.getElementById('mateIDEdit').value;
    materias.forEach((m) => {
        if (m.mateID == mateIDInput) {
            m.mateName = document.getElementById('mateNameEdit').value;
            m.mateCodi = document.getElementById('mateCodiEdit').value;
            m.mateAno = document.getElementById('mateAnoEdit').value;
        }
    });
    localStorage.setItem('materias', JSON.stringify(materias));
    showMate();
}

function deleteElementMate(e) {
    const mateIdInput = e.target.getAttribute('data-id');
    materias = materias.filter((m) => m.mateID !== mateIdInput);
    localStorage.setItem('materias', JSON.stringify(materias));
    showMate();
}

function eventosMate() {
    var btseditar = document.getElementsByClassName("bteditMate");
    for (let i = 0; i < btseditar.length; i++) {
        
        btseditar[i].addEventListener("click", editFormMate);
    }
    var btsborrar = document.getElementsByClassName("btborrarMate");
    for (let i = 0; i < btsborrar.length; i++) {
        btsborrar[i].addEventListener("click", deleteElementMate);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const storedMaterias = localStorage.getItem('materias');
    if (storedMaterias) {
        materias = JSON.parse(storedMaterias);
        showMate();
    }
});

addBtnMate.addEventListener('click', addMate);
editBtnMate.addEventListener('click', editMate);
