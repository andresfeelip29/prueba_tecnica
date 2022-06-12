package com.proyecto.registrohoras.prueba_tecnica.controllers;

import com.proyecto.registrohoras.prueba_tecnica.dao.ICrudRepositoryDao;
import com.proyecto.registrohoras.prueba_tecnica.models.Empleado;
import com.proyecto.registrohoras.prueba_tecnica.utils.AccesoDatoExcepcion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmpleadoController {

    @Autowired
    @Qualifier("EmpleadoDaoImpl")
    private ICrudRepositoryDao empleadoDao;

    @RequestMapping(value = "api/empleados", method = RequestMethod.GET)
    public List<Empleado> listarEmpleados(){
        return empleadoDao.listar();
    }

    @RequestMapping(value = "api/empleados/{id}", method = RequestMethod.DELETE)
    public void eliminarEmpleado(@PathVariable Long id) throws AccesoDatoExcepcion {
        empleadoDao.eliminar(id);
    }

    @RequestMapping(value = "api/empleados/{id}", method = RequestMethod.GET)
    public Empleado buscarId(@PathVariable Long id) throws AccesoDatoExcepcion {
        return (Empleado) empleadoDao.buscarId(id);
    }


    @RequestMapping(value = "api/empleados", method = RequestMethod.POST)
    public void crearEmpleado(@RequestBody Empleado empleado) throws AccesoDatoExcepcion {
        empleadoDao.crear(empleado);
    }

    @RequestMapping(value = "api/empleados", method = RequestMethod.PUT)
    public void editarEmpleado(@RequestBody Empleado empleado) throws AccesoDatoExcepcion {
        empleadoDao.editar(empleado);
    }

}
