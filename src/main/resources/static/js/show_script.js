function mostrarEmpleados() {
	document.getElementById("contenedor-tableEmpleados").style.display = "grid";
	document.getElementById("contenedor-tableProyectos").style.display = "none";
	document.getElementById("contenedor-tableHorasProyectos").style.display = "none";
}

function mostrarProyectos() {
	document.getElementById("contenedor-tableEmpleados").style.display = "none";
	document.getElementById("contenedor-tableProyectos").style.display = "grid";
	document.getElementById("contenedor-tableHorasProyectos").style.display = "none";
}

function mostrarHorasProyectos() {
	document.getElementById("contenedor-tableEmpleados").style.display = "none";
	document.getElementById("contenedor-tableProyectos").style.display = "none";
	document.getElementById("contenedor-tableHorasProyectos").style.display = "grid";
}

function btnGuardarEmpleado() {
	document.getElementById("inputId").style.display = "none";
	document.getElementById("guardarEmpleado").style.display = "flex";
	document.getElementById("editarEmpleado").style.display = "none";
}

function btnEditarEmpleado() {
	document.getElementById("guardarEmpleado").style.display = "none";
	document.getElementById("inputId").style.display = "flex";
	document.getElementById("editarEmpleado").style.display = "flex";
}

function btnGuardarProyecto() {
	document.getElementById("inputIdProyecto").style.display = "none";
	document.getElementById("guardarProyecto").style.display = "flex";
	document.getElementById("editarProyecto").style.display = "none";
}
function btnEditarProyecto() {
	document.getElementById("guardarProyecto").style.display = "none";
	document.getElementById("inputIdProyecto").style.display = "flex";
	document.getElementById("editarProyecto").style.display = "flex";
}

function btnGuardarHorasProyecto() {
	document.getElementById("inputIdHorasProyecto").style.display = "none";
	document.getElementById("guardarHorasProyecto").style.display = "flex";
	document.getElementById("editarHorasProyecto").style.display = "none";
}
function btnEditarHorasProyecto() {
	document.getElementById("guardarHorasProyecto").style.display = "none";
	document.getElementById("inputIdHorasProyecto").style.display = "flex";
	document.getElementById("editarHorasProyecto").style.display = "flex";
}

function limpiarImput() {
	document.getElementById("nombreEmpleado").value = "";
	document.getElementById("apellidoEmpleado").value = "";
	document.getElementById("nombreProyecto").value = "";
	document.getElementById("idHorasProyectoEmpleado").value = "";
	document.getElementById("idProyecto_Horas").value = "";
	document.getElementById("fecha").value = "";
	document.getElementById("horas").value = "";
}

function limpiarErrorInput() {
	document.getElementById("errorNombre").style.display = "none";
	document.getElementById("errorApellido").style.display = "none";
	document.getElementById("error_id_empleado").style.display = "none";
	document.getElementById("error_id_proyecto").style.display = "none";
	document.getElementById("error_fecha").style.display = "none";
	document.getElementById("error_horas").style.display = "none";
}
