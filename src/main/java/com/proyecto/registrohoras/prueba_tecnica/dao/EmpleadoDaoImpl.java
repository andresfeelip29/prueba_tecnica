package com.proyecto.registrohoras.prueba_tecnica.dao;

import com.proyecto.registrohoras.prueba_tecnica.models.Empleado;
import com.proyecto.registrohoras.prueba_tecnica.utils.AccesoDatoExcepcion;
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
@Component("EmpleadoDaoImpl")
public class EmpleadoDaoImpl implements ICrudRepositoryDao<Empleado> {

    @PersistenceContext
    private EntityManager entityManager;



    @Override
    @Transactional
    public List<Empleado> listar() {
        String query = "FROM Empleado";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void crear(Empleado empleado) throws EscrituraAccesoDatoExcepcion {
        if(empleado == null){
            throw new EscrituraAccesoDatoExcepcion("Error al insertar empleado null");
        }else{
            entityManager.merge(empleado);
        }
    }

    @Override
    public void editar(Empleado empleado) throws EscrituraAccesoDatoExcepcion{
        if(empleado == null){
            throw new EscrituraAccesoDatoExcepcion("Error al editar empleado null");
        }else{
            Empleado actualizarEmpleado = entityManager.find(Empleado.class, empleado.getId());
            actualizarEmpleado.setApellido(empleado.getApellido());
            actualizarEmpleado.setNombre(empleado.getNombre());
            entityManager.merge(actualizarEmpleado);
        }
    }

    @Override
    public void eliminar(Long id) throws LecturaAccesoDatoExcepcion, EscrituraAccesoDatoExcepcion {
        if (id == null || id <= 0) {
            throw new LecturaAccesoDatoExcepcion(" Error al elimina, Id invalido debe ser mayor a 0");
        }
        Empleado empleado = entityManager.find(Empleado.class, id);
        if(empleado == null){
            throw new EscrituraAccesoDatoExcepcion(" Error el id: "+ id + " a eliminar no existe" );
        }
        else{
            entityManager.remove(empleado);
        }
    }

    @Override
    @Transactional
    public Empleado buscarId(Long id) throws LecturaAccesoDatoExcepcion,EscrituraAccesoDatoExcepcion {
        if (id == null || id <= 0) {
            throw new LecturaAccesoDatoExcepcion(" Error al buscar empleado, Id invalido debe ser mayor a 0");
        }
        Empleado empleado = entityManager.find(Empleado.class, id);
        if(empleado == null){
            throw new EscrituraAccesoDatoExcepcion(" El empleado con id "+ id + " no existe" );
        }

        return empleado;
    }
}
