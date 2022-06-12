var modalAgregarHorasProyecto = new bootstrap.Modal(
	document.getElementById("modalAgregarHorasProyectos")
);
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

	document.getElementById("btnAgregarHorasProyecto").addEventListener("click", () => {
		limpiarErrorInput();
		limpiarImput();
		modalAgregarHorasProyecto.toggle();
		btnGuardarHorasProyecto();
	});
	listarHorasProyectos();
})();

async function guardarHorasProyecto() {
	let horasProyecto = {};
	horasProyecto.empleadoId = Number.parseInt(
		document.getElementById("idHorasProyectoEmpleado").value
	);
	horasProyecto.proyectoId = Number.parseInt(document.getElementById("idProyecto_Horas").value);
	horasProyecto.fecha = document.getElementById("fecha").value;
	horasProyecto.horasTrabajadas = Number.parseInt(document.getElementById("horas").value);
	limpiarImput();
	if (
		!isNaN(horasProyecto.empleadoId) &&
		!isNaN(horasProyecto.proyectoId) &&
		!isNaN(horasProyecto.horasTrabajadas)
	) {
		const request = await fetch("api/horas_proyectos", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(horasProyecto),
		});
		if (request.ok) {
			console.log("Datos guardados con exito");
			modalExitosa.toggle();
			modalAgregarHorasProyecto.hide();
			listarHorasProyectos();
		} else {
			console.log(
				"Error al guardar los datos: " + request.status + " cuerpo: " + request.body
			);
			modalError.toggle();
			modalAgregarProyecto.hide();
		}
		limpiarErrorInput();
	} else {
		if (isNaN(horasProyecto.empleadoId)) {
			document.getElementById("error_id_empleado").style.display = "flex";
		}
		if (isNaN(horasProyecto.proyectoId)) {
			document.getElementById("error_id_proyecto").style.display = "flex";
		}
		if (isNaN(horasProyecto.horasTrabajadas)) {
			document.getElementById("error_fecha").style.display = "flex";
		}
		if (horasProyecto.fecha == "") {
			document.getElementById("error_horas").style.display = "flex";
		}
	}
}

async function listarHorasProyectos() {
	let texto = "";
	const request = await fetch("api/horas_proyectos", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const horasProyectos = await request.json();
	horasProyectos.forEach((horasProyecto) => {
		texto += "<tr>";
		texto += `<th scope='row'> ${horasProyecto.id}</th>`;
		texto += `<td>${horasProyecto.empleadoId}</td>`;
		texto += `<td>${horasProyecto.proyectoId}</td>`;
		texto += `<td>${horasProyecto.fecha}</td>`;
		texto += `<td>${horasProyecto.horasTrabajadas}</td>`;
		texto += "<td>";
		texto += '<button type="button" ';
		texto += `class="btn btn-primary mb-3 mx-2" onclick = "cargarHorasProyecto(${horasProyecto.id})"`;
		texto +=
			'style=" --bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem;">';
		texto += '<i class="bi bi-pencil" style="color: white"></i>';
		texto += "</button>";
		texto += '<button type="button" ';
		texto += `class="btn btn-danger mb-3" onclick = "eliminarHorasProyecto(${horasProyecto.id})"`;
		texto +=
			'style=" --bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem;">';
		texto += '<i class="bi bi-x" style="color: white"></i>';
		texto += "</button>";
		texto += "</td>";
		texto += "</tr>";
	});
	document.getElementById("bodyTableHorasProyectos").innerHTML = texto;
}

async function cargarHorasProyecto(id) {
	let horasProyecto = {};
	modalAgregarHorasProyecto.toggle();
	btnEditarHorasProyecto();
	if (!isNaN(id) && id >= 0) {
		const request = await fetch(`api/horas_proyectos/${id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		horasProyecto = await request.json();
		document.getElementById("idHorasProyecto").value = horasProyecto.id;
		document.getElementById("idHorasProyectoEmpleado").value = horasProyecto.empleadoId;
		document.getElementById("idProyecto_Horas").value = horasProyecto.proyectoId;
		document.getElementById("fecha").value = horasProyecto;
		document.getElementById("horas").value = horasProyecto.horasTrabajadas;
	} else {
		console.log("Id invalido");
	}
}

async function editarHorasProyecto() {
	let horasProyecto = {};
	horasProyecto.id = document.getElementById("idHorasProyecto").value;
	horasProyecto.empleadoId = Number.parseInt(
		document.getElementById("idHorasProyectoEmpleado").value
	);
	horasProyecto.proyectoId = Number.parseInt(document.getElementById("idProyecto_Horas").value);
	horasProyecto.fecha = document.getElementById("fecha").value;
	horasProyecto.horasTrabajadas = Number.parseInt(document.getElementById("horas").value);
	limpiarImput();
	if (
		!isNaN(horasProyecto.empleadoId) &&
		!isNaN(horasProyecto.proyectoId) &&
		!isNaN(horasProyecto.horasTrabajadas)
	) {
		const request = await fetch("api/horas_proyectos", {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(horasProyecto),
		});
		if (request.ok) {
			console.log("Datos guardados con exito");
			modalExitosa.toggle();
			modalAgregarHorasProyecto.hide();
			listarHorasProyectos();
		} else {
			console.log(
				"Error al guardar los datos: " + request.status + " cuerpo: " + request.body
			);
			modalError.toggle();
			modalAgregarHorasProyecto.hide();
		}
		limpiarErrorInput();
	} else {
		if (isNaN(horasProyecto.empleadoId)) {
			document.getElementById("error_id_empleado").style.display = "flex";
		}
		if (isNaN(horasProyecto.proyectoId)) {
			document.getElementById("error_id_proyecto").style.display = "flex";
		}
		if (isNaN(horasProyecto.horasTrabajadas)) {
			document.getElementById("error_fecha").style.display = "flex";
		}
		if (horasProyecto.fecha == "") {
			document.getElementById("error_horas").style.display = "flex";
		}
	}
}

async function eliminarHorasProyecto(id) {
	const request = await fetch(`api/horas_proyectos/${id}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	if (request.ok) {
		console.log("Proyecto Horas eliminado con exito");
		modalExitosa.toggle();
		listarHorasProyectos();
	} else {
		console.log("Error al guardar los datos: " + request.status + " cuerpo: " + request.body);
		modalError.toggle();
	}
}

async function buscarHorasProyecto() {
	let id = Number.parseInt(document.getElementById("inputBuscarHorasProyecto").value);
	texto = "";
	let horasProyecto = {};
	if (!isNaN(id) && id >= 0) {
		const request = await fetch(`api/horas_proyectos/${id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		if (request.ok) {
			horasProyecto = await request.json();
			texto += "<tr>";
			texto += `<th scope='row'> ${horasProyecto.id}</th>`;
			texto += `<td>${horasProyecto.empleadoId}</td>`;
			texto += `<td>${horasProyecto.proyectoId}</td>`;
			texto += `<td>${horasProyecto.fecha}</td>`;
			texto += `<td>${horasProyecto.horasTrabajadas}</td>`;
			texto += "<td>";
			texto += '<button type="button" ';
			texto += `class="btn btn-primary mb-3 mx-2" onclick = "cargarHorasProyecto(${horasProyecto.id})"`;
			texto +=
				'style=" --bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem;">';
			texto += '<i class="bi bi-pencil" style="color: white"></i>';
			texto += "</button>";
			texto += '<button type="button" ';
			texto += `class="btn btn-danger mb-3" onclick = "eliminarHorasProyecto(${horasProyecto.id})"`;
			texto +=
				'style=" --bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem;">';
			texto += '<i class="bi bi-x" style="color: white"></i>';
			texto += "</button>";
			texto += "</td>";
			texto += "</tr>";
			document.getElementById("bodyTableHorasProyectos").innerHTML = texto;
		} else {
			console.log("No se encontro id");
			modalError.toggle();
		}
	} else {
		console.log("Id invalido");
		modalError.toggle();
	}
	document.getElementById("inputBuscarHorasProyecto").value = "";
}
