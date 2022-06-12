package com.proyecto.registrohoras.prueba_tecnica.dao;

import com.proyecto.registrohoras.prueba_tecnica.models.Empleado;
import com.proyecto.registrohoras.prueba_tecnica.models.HorasProyecto;
import com.proyecto.registrohoras.prueba_tecnica.utils.EscrituraAccesoDatoExcepcion;
import com.proyecto.registrohoras.prueba_tecnica.utils.LecturaAccesoDatoExcepcion;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
@Component("HorasProyectoDaoImpl")
public class HorasProyectoDaoImpl implements ICrudRepositoryDao<HorasProyecto>{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public List<HorasProyecto> listar() {
        String query = "FROM HorasProyecto";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void crear(HorasProyecto horasProyecto) throws EscrituraAccesoDatoExcepcion {
        if(horasProyecto == null){
            throw new EscrituraAccesoDatoExcepcion("Error al insertar las Horas del Proyecto null");
        }else{
            entityManager.merge(horasProyecto);
        }
    }

    @Override
    public void editar(HorasProyecto horasProyecto) throws EscrituraAccesoDatoExcepcion{
        if(horasProyecto == null){
            throw new EscrituraAccesoDatoExcepcion("Error al editar proyecto null");
        }else{
            HorasProyecto actualizarHorasProyecto = entityManager.find(HorasProyecto.class, horasProyecto.getId());
            actualizarHorasProyecto.setEmpleadoId(horasProyecto.getEmpleadoId());
            actualizarHorasProyecto.setProyectoId(horasProyecto.getProyectoId());
            actualizarHorasProyecto.setFecha(horasProyecto.getFecha());
            actualizarHorasProyecto.setHorasTrabajadas(horasProyecto.getHorasTrabajadas());
            entityManager.merge(actualizarHorasProyecto);
        }
    }

    @Override
    public void eliminar(Long id) throws LecturaAccesoDatoExcepcion, EscrituraAccesoDatoExcepcion {
        if (id == null || id <= 0) {
            throw new LecturaAccesoDatoExcepcion(" Error al eliminar, Id invalido debe ser mayor a 0");
        }
        HorasProyecto horasProyecto = entityManager.find(HorasProyecto.class, id);
        if(horasProyecto == null){
            throw new EscrituraAccesoDatoExcepcion(" Error el id: "+ id + " a eliminar no existe" );
        }
        else{
            entityManager.remove(horasProyecto);
        }
    }

    @Override
    @Transactional
    public HorasProyecto buscarId(Long id) throws LecturaAccesoDatoExcepcion,EscrituraAccesoDatoExcepcion {
        if (id == null || id <= 0) {
            throw new LecturaAccesoDatoExcepcion(" Error al buscar Hora de trabajo, Id invalido debe ser mayor a 0");
        }
        HorasProyecto horasProyecto = entityManager.find(HorasProyecto.class, id);
        if(horasProyecto == null){
            throw new EscrituraAccesoDatoExcepcion(" El empleado con id "+ id + " no existe" );
        }

        return horasProyecto;
    }

}
