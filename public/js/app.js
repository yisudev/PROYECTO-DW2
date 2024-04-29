var docente =[]
function show() {

	let tr = "";
	docente = JSON.parse(localStorage.getItem('docentes'));
	docente.forEach((d) => {
		tr =
			tr +
			"<tr><td>" +
			d.doceName +
			" </td><td> " +
			d.doceLastName +
			" </td><td> " +
			d.doceEmail +
			"<td>" +
			d.doceBirth +
			" </td><td> " +
			d.doceCel +
			" </td> " +
			"<td><a class='btedit' data-id='" +
			d.doceId +
			"' >Editar</a> <td><a class='btborrar ' data-id='" +
			d.doceId +
			"' >Borrar</a></td> </tr>";
	})
	document.getElementById('table-body').innerHTML = tr;
	eventos();
}