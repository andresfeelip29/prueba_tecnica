package com.proyecto.registrohoras.prueba_tecnica.controllers;

import com.proyecto.registrohoras.prueba_tecnica.dao.ICrudRepositoryDao;
import com.proyecto.registrohoras.prueba_tecnica.models.HorasProyecto;
import com.proyecto.registrohoras.prueba_tecnica.models.Proyecto;
import com.proyecto.registrohoras.prueba_tecnica.utils.AccesoDatoExcepcion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProyectoController {

    @Autowired
    @Qualifier("ProyectoDaoImpl")
    private ICrudRepositoryDao proyectoDao;

    @RequestMapping(value = "api/proyectos", method = RequestMethod.GET)
    public List<Proyecto> listarProyectos(){
        return proyectoDao.listar();
    }

    @RequestMapping(value = "api/proyectos/{id}", method = RequestMethod.DELETE)
    public void eliminarProyecto(@PathVariable Long id) throws AccesoDatoExcepcion {
        proyectoDao.eliminar(id);
    }

    @RequestMapping(value = "api/proyectos/{id}", method = RequestMethod.GET)
    public Proyecto buscarId(@PathVariable Long id) throws AccesoDatoExcepcion {
        return (Proyecto) proyectoDao.buscarId(id);
    }

    @RequestMapping(value = "api/proyectos", method = RequestMethod.POST)
    public void crearProyecto(@RequestBody Proyecto proyecto) throws AccesoDatoExcepcion {
        proyectoDao.crear(proyecto);
    }

    @RequestMapping(value = "api/proyectos", method = RequestMethod.PUT)
    public void editarProyecto(@RequestBody Proyecto proyecto) throws AccesoDatoExcepcion {
        proyectoDao.editar(proyecto);
    }
}
