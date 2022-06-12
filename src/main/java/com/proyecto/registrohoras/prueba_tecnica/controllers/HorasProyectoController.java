package com.proyecto.registrohoras.prueba_tecnica.controllers;

import com.proyecto.registrohoras.prueba_tecnica.dao.ICrudRepositoryDao;
import com.proyecto.registrohoras.prueba_tecnica.models.Empleado;
import com.proyecto.registrohoras.prueba_tecnica.models.HorasProyecto;
import com.proyecto.registrohoras.prueba_tecnica.utils.AccesoDatoExcepcion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HorasProyectoController {
    @Autowired
    @Qualifier("HorasProyectoDaoImpl")
    private ICrudRepositoryDao horasProyectoDao;

    @RequestMapping(value = "api/horas_proyectos", method = RequestMethod.GET)
    public List<HorasProyecto> listarHorasProyecto(){
        return horasProyectoDao.listar();
    }

    @RequestMapping(value = "api/horas_proyectos/{id}", method = RequestMethod.GET)
    public HorasProyecto buscarId(@PathVariable Long id) throws AccesoDatoExcepcion {
        return (HorasProyecto) horasProyectoDao.buscarId(id);
    }

    @RequestMapping(value = "api/horas_proyectos/{id}", method = RequestMethod.DELETE)
    public void eliminarHorasProyecto(@PathVariable Long id) throws AccesoDatoExcepcion {
        horasProyectoDao.eliminar(id);
    }

    @RequestMapping(value = "api/horas_proyectos", method = RequestMethod.POST)
    public void crearHorasProyecto(@RequestBody HorasProyecto horasProyecto) throws AccesoDatoExcepcion {
        horasProyectoDao.crear(horasProyecto);
    }

    @RequestMapping(value = "api/horas_proyectos", method = RequestMethod.PUT)
    public void editarHorasProyecto(@RequestBody HorasProyecto horasProyecto) throws AccesoDatoExcepcion {
        horasProyectoDao.editar(horasProyecto);
    }
}
