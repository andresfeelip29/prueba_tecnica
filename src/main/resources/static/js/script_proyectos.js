var modalAgregarProyecto = new bootstrap.Modal(document.getElementById("modalAgregarProyectos"));
var modalExitosa = new bootstrap.Modal(document.getElementById("modalSuccessful"));
var modalError = new bootstrap.Modal(document.getElementById("modalError"));

(() => {
	("use strict");
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.querySelectorAll(".needs-validation");
	// Loop over them and prevent submission
	Array.from(forms).forEach((form) => {
		form.addEventListener(
			"button",
			(event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add("was-validated");
			},
			false
		);
	});

	document.getElementById("btnAgregarProyecto").addEventListener("click", () => {
		limpiarErrorInput();
		limpiarImput();
		modalAgregarProyecto.toggle();
		btnGuardarProyecto();
	});
	listarProyectos();
})();

async function guardarProyecto() {
	let proyecto = {};
	proyecto.nombre = document.getElementById("nombreProyecto").value;
	limpiarImput();
	if (proyecto.nombre != "") {
		const request = await fetch("api/proyectos", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(proyecto),
		});
		if (request.ok) {
			console.log("Datos guardados con exito");
			modalExitosa.toggle();
			modalAgregarProyecto.hide();
			listarProyectos();
		} else {
			console.log(
				"Error al guardar los datos: " + request.status + " cuerpo: " + request.body
			);
			modalError.toggle();
			modalAgregarProyecto.hide();
		}
		limpiarErrorInput();
	} else {
		if (proyecto.nombre == "") {
			document.getElementById("errorNombre").style.display = "flex";
		}
	}
}

async function listarProyectos() {
	let texto = "";
	const request = await fetch("api/proyectos", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const proyectos = await request.json();
	proyectos.forEach((proyecto) => {
		texto += "<tr>";
		texto += `<th scope='row'> ${proyecto.id}</th>`;
		texto += `<td>${proyecto.nombre}</td>`;
		texto += "<td>";
		texto += '<button type="button" ';
		texto += `class="btn btn-primary mb-3 mx-2" onclick = "cargarProyecto(${proyecto.id})"`;
		texto +=
			'style=" --bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem;">';
		texto += '<i class="bi bi-pencil" style="color: white"></i>';
		texto += "</button>";
		texto += '<button type="button" ';
		texto += `class="btn btn-danger mb-3" onclick = "eliminarProyecto(${proyecto.id})"`;
		texto +=
			'style=" --bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem;">';
		texto += '<i class="bi bi-x" style="color: white"></i>';
		texto += "</button>";
		texto += "</td>";
		texto += "</tr>";
	});
	document.getElementById("bodyTableProyectos").innerHTML = texto;
}

async function cargarProyecto(id) {
	let proyecto = {};
	modalAgregarProyecto.toggle();
	btnEditarProyecto();
	if (!isNaN(id) && id >= 0) {
		const request = await fetch(`api/proyectos/${id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		proyecto = await request.json();
		document.getElementById("idProyecto").value = proyecto.id;
		document.getElementById("nombreProyecto").value = proyecto.nombre;
	} else {
		console.log("Id invalido");
	}
}

async function editarProyecto() {
	let proyecto = {};
	proyecto.id = document.getElementById("idProyecto").value;
	proyecto.nombre = document.getElementById("nombreProyecto").value;
	limpiarImput();
	if (proyecto.nombre != "") {
		const request = await fetch("api/proyectos", {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(proyecto),
		});
		if (request.ok) {
			console.log("Datos guardados con exito");
			modalExitosa.toggle();
			modalAgregarProyecto.hide();
			listarProyectos();
		} else {
			console.log(
				"Error al guardar los datos: " + request.status + " cuerpo: " + request.body
			);
			modalError.toggle();
			modalAgregarProyecto.hide();
		}
		document.getElementById("errorNombre").style.display = "none";
	} else {
		if (empleado.nombre == "") {
			document.getElementById("errorNombre").style.display = "flex";
		}
	}
}

async function eliminarProyecto(id) {
	const request = await fetch(`api/proyectos/${id}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	if (request.ok) {
		console.log("Proyecto eliminado con exito");
		modalExitosa.toggle();
		listarProyectos();
	} else {
		console.log("Error al guardar los datos: " + request.status + " cuerpo: " + request.body);
		modalError.toggle();
	}
}

async function buscarProyecto() {
	let id = Number.parseInt(document.getElementById("inputBuscarProyecto").value);
	texto = "";
	let proyecto = {};
	if (!isNaN(id) && id >= 0) {
		const request = await fetch(`api/proyectos/${id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		if (request.ok) {
			proyecto = await request.json();
			texto += "<tr>";
			texto += `<th scope='row'> ${proyecto.id}</th>`;
			texto += `<td>${proyecto.nombre}</td>`;
			texto += "<td>";
			texto += '<button type="button" ';
			texto += `class="btn btn-primary mb-3 mx-2" onclick = "cargarProyecto(${proyecto.id})"`;
			texto +=
				'style=" --bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem;">';
			texto += '<i class="bi bi-pencil" style="color: white"></i>';
			texto += "</button>";
			texto += '<button type="button" ';
			texto += `class="btn btn-danger mb-3" onclick = "eliminarProyecto(${proyecto.id})"`;
			texto +=
				'style=" --bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem;">';
			texto += '<i class="bi bi-x" style="color: white"></i>';
			texto += "</button>";
			texto += "</td>";
			texto += "</tr>";
			document.getElementById("bodyTableProyectos").innerHTML = texto;
		} else {
			console.log("No se encontro id");
			modalError.toggle();
		}
	} else {
		console.log("Id invalido");
		modalError.toggle();
	}
	document.getElementById("inputBuscarProyecto").value = "";
}
