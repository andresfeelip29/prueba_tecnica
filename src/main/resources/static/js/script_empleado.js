var modalAgregarEmpleado = new bootstrap.Modal(document.getElementById("modalAgregarEmpleado"));
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

	document.getElementById("btnAgregarEmpleado").addEventListener("click", () => {
		limpiarErrorInput();
		limpiarImput();
		modalAgregarEmpleado.toggle();
		btnGuardarEmpleado();
	});
	listarEmpleados();
})();

async function guardarEmpleado() {
	let empleado = {};
	empleado.nombre = document.getElementById("nombreEmpleado").value;
	empleado.apellido = document.getElementById("apellidoEmpleado").value;
	limpiarImput();
	if (empleado.nombre != "" && empleado.apellido != "") {
		const request = await fetch("api/empleados", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(empleado),
		});
		if (request.ok) {
			console.log("Datos guardados con exito");
			modalExitosa.toggle();
			modalAgregarEmpleado.hide();
			listarEmpleados();
		} else {
			console.log(
				"Error al guardar los datos: " + request.status + " cuerpo: " + request.body
			);
			modalError.toggle();
			modalAgregarEmpleado.hide();
		}
		limpiarErrorInput();
	} else {
		if (empleado.nombre == "") {
			document.getElementById("errorNombre").style.display = "flex";
		} else if (empleado.apellido == "") {
			document.getElementById("errorApellido").style.display = "flex";
		}
	}
}

async function listarEmpleados() {
	let texto = "";
	const request = await fetch("api/empleados", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const empleados = await request.json();
	empleados.forEach((empleado) => {
		texto += "<tr>";
		texto += `<th scope='row'> ${empleado.id}</th>`;
		texto += `<td>${empleado.nombre}</td>`;
		texto += `<td>${empleado.apellido}</td>`;
		texto += "<td>";
		texto += '<button type="button" ';
		texto += `class="btn btn-primary mb-3 mx-2" onclick = "cargarEmpleado(${empleado.id})"`;
		texto +=
			'style=" --bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem;">';
		texto += '<i class="bi bi-pencil" style="color: white"></i>';
		texto += "</button>";
		texto += '<button type="button" ';
		texto += `class="btn btn-danger mb-3" onclick = "eliminarEmpleado(${empleado.id})"`;
		texto +=
			'style=" --bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem;">';
		texto += '<i class="bi bi-x" style="color: white"></i>';
		texto += "</button>";
		texto += "</td>";
		texto += "</tr>";
	});
	document.getElementById("bodyTableEmpleado").innerHTML = texto;
}

async function cargarEmpleado(id) {
	let empleado = {};
	modalAgregarEmpleado.toggle();
	btnEditarEmpleado();
	if (!isNaN(id) && id >= 0) {
		const request = await fetch(`api/empleados/${id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		empleado = await request.json();
		document.getElementById("idEmpleado").value = empleado.id;
		document.getElementById("nombreEmpleado").value = empleado.nombre;
		document.getElementById("apellidoEmpleado").value = empleado.apellido;
	} else {
		console.log("Id invalido");
	}
}

async function editarEmpleado() {
	let empleado = {};
	empleado.id = document.getElementById("idEmpleado").value;
	empleado.nombre = document.getElementById("nombreEmpleado").value;
	empleado.apellido = document.getElementById("apellidoEmpleado").value;
	limpiarImput();
	if (empleado.nombre != "" && empleado.apellido != "") {
		const request = await fetch("api/empleados", {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(empleado),
		});
		if (request.ok) {
			console.log("Datos guardados con exito");
			modalExitosa.toggle();
			modalAgregarEmpleado.hide();
			listarEmpleados();
		} else {
			console.log(
				"Error al guardar los datos: " + request.status + " cuerpo: " + request.body
			);
			modalError.toggle();
			modalAgregarEmpleado.hide();
		}

		document.getElementById("errorNombre").style.display = "none";
		document.getElementById("errorApellido").style.display = "none";
	} else {
		if (empleado.nombre == "") {
			document.getElementById("errorNombre").style.display = "flex";
		} else if (empleado.apellido == "") {
			document.getElementById("errorApellido").style.display = "flex";
		}
	}
}

async function eliminarEmpleado(id) {
	const request = await fetch(`api/empleados/${id}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	if (request.ok) {
		console.log("Empleado eliminado con exito");
		modalExitosa.toggle();
		listarEmpleados();
	} else {
		console.log("Error al guardar los datos: " + request.status + " cuerpo: " + request.body);
		modalError.toggle();
	}
}

async function buscarEmpleado() {
	let id = Number.parseInt(document.getElementById("inputBuscar").value);
	let texto = "";
	let empleado = {};
	if (!isNaN(id) && id >= 0) {
		const request = await fetch(`api/empleados/${id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		if (request.ok) {
			empleado = await request.json();
			texto += "<tr>";
			texto += `<th scope='row'> ${empleado.id}</th>`;
			texto += `<td>${empleado.nombre}</td>`;
			texto += `<td>${empleado.apellido}</td>`;
			texto += "<td>";
			texto += '<button type="button" ';
			texto += `class="btn btn-primary mb-3 mx-2" onclick = "cargarEmpleado(${empleado.id})"`;
			texto +=
				'style=" --bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem;">';
			texto += '<i class="bi bi-pencil" style="color: white"></i>';
			texto += "</button>";
			texto += '<button type="button" ';
			texto += `class="btn btn-danger mb-3" onclick = "eliminarEmpleado(${empleado.id})"`;
			texto +=
				'style=" --bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem;">';
			texto += '<i class="bi bi-x" style="color: white"></i>';
			texto += "</button>";
			texto += "</td>";
			texto += "</tr>";
			document.getElementById("bodyTableEmpleado").innerHTML = texto;
		} else {
			console.log("No se encontro id");
			modalError.toggle();
		}
	} else {
		console.log("Id invalido");
		modalError.toggle();
	}
	document.getElementById("inputBuscar").value = "";
}
