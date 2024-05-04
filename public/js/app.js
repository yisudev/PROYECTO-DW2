var docentes =[]
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

addBtn.addEventListener('click', addDocente);