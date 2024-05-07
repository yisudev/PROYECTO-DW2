var docentes = []
const doceId = document.getElementById('doceId');
const doceName = document.getElementById('doceName');
const doceLastName = document.getElementById('doceLastName');
const doceEmail = document.getElementById('doceEmail');
const doceBirth = document.getElementById('doceBirth');
const doceCel = document.getElementById('doceCel');
const addBtn = document.getElementById('addBtn');
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
    if (localStorage.getItem('docentes') === null) { // validamos si existe el local storage docentes o no
        localStorage.setItem('docentes', JSON.stringify(docentes)); //creamos el localstorage si aun no se creo
    }
    let tr = ""; // creamos una variable tr donde guardaremos la fila a imprimir
    docentes = JSON.parse(localStorage.getItem('docentes'));//obtenemos el item docentes del local storage
    docentes.forEach((d) => { //recorremos el arreglo con un variable d
        tr +=
            "<tr><td>" +//abrimos el table row y empezamos a citar los datos
            d.doceName + //accedemos a los datos atraves del . 
            " </td><td> " +
            d.doceLastName +
            " </td><td> " +
            d.doceEmail +
            " </td><td>" +
            d.doceBirth +
            " </td><td> " +
            d.doceCel +
            " </td> " +
            "<td><a class='bteditDocente' data-id='" + //colocamos el atributo data id y lo ponemos con el doceId
            d.doceId +
            "' >Editar</a></td> <td><a class='btborrarDocente' data-id='" + //lo mismo para editar
            d.doceId +
            "' >Borrar</a></td> </tr>";
    })
    document.getElementById('table-body').innerHTML = tr; //hacemos una alteracion del html y pasamos lo que guardamos en tr
}

//funcion para pasar los datos al formulario de editar 
function editFormsDocente(e) {  //recibimos de parametro un evento 
    addFormDoce.classList.toggle('hidden');
    editFormsDocente.classList.toggle('hidden');
    backBtnFormDoce.classlist.toggle('hidden');
    const doceIdInput = e.target.getAttribute('data-id'); // vemos el target del evento y obtenemos el data id
    docentes.forEach((d) => {//recordemos el arreglo con una variable d
        if (d.doceId == doceIdInput) { // verificamos si el doceID es igual al doceInput que agarramos del data id
            document.getElementById('doceIdEdit').value = d.doceId;// guardamos en los input los valores de cada rato del arreglo
            document.getElementById('doceNameEdit').value = d.doceName;
            document.getElementById('doceLastNameEdit').value = d.doceLastName;
            document.getElementById('doceEmailEdit').value = d.doceEmail;
            document.getElementById('doceBirthEdit').value = d.doceBirth
            document.getElementById('doceCelEdit').value = d.doceCel;
        }
    })
}


function editDocente() {
    const doceIdInput = document.getElementById('doceIdEdit').value; // obtenemos el value de doceId para saber que editamos 
    docentes.forEach((d)) => { //volvemos a recorrer el arreglo 
        if (d.doceId == doceIdInput) {//verificamos si doceId es igual al valor que recuperamos de doceId
            d.doceName = document.getElementById('doceNameEdit').value; //guardamos en los datos del arreglo los valores de los input 
            d.doceLastName = document.getElementById('doceLastNameEdit').value;
            d.doceEmail = document.getElementById('doceEmailEdit').value;
            d.doceBirth = document.getElementById('doceBirthEdit').value;
            d.doceCel = document.getElementById('doceCelEdit').value;

        }
    })
    localStorage.setItem('docentes', JSON.stringify(docentes)); // guardamos en el local storage el arreglo modificado
    showDocente();//mostramos la tabla de docentes
}
addBtn.addEventListener('click', addDocente);
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
}