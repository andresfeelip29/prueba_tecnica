package com.proyecto.registrohoras.prueba_tecnica.dao;

import com.proyecto.registrohoras.prueba_tecnica.models.HorasProyecto;
import com.proyecto.registrohoras.prueba_tecnica.models.Proyecto;
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
@Component("ProyectoDaoImpl")
public class ProyectoDaoImpl implements ICrudRepositoryDao<Proyecto> {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public List<Proyecto> listar() {
        String query = "FROM Proyecto";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void crear(Proyecto proyecto) throws EscrituraAccesoDatoExcepcion {
        if (proyecto == null) {
            throw new EscrituraAccesoDatoExcepcion("Error al insertar proyecto null");
        } else {
            entityManager.merge(proyecto);
        }
    }

    @Override
    public void editar(Proyecto proyecto) throws EscrituraAccesoDatoExcepcion {
        if (proyecto == null) {
            throw new EscrituraAccesoDatoExcepcion("Error al editar proyecto null");
        } else {
            Proyecto actualizarProyecto = entityManager.find(Proyecto.class, proyecto.getId());
            actualizarProyecto.setNombre(proyecto.getNombre());
            entityManager.merge(actualizarProyecto);
        }
    }

    @Override
    public void eliminar(Long id) throws LecturaAccesoDatoExcepcion, EscrituraAccesoDatoExcepcion {
        if (id == null || id <= 0) {
            throw new LecturaAccesoDatoExcepcion(" Error al eliminar, Id invalido debe ser mayor a 0");
        }
        Proyecto proyecto = entityManager.find(Proyecto.class, id);
        if (proyecto == null) {
            throw new EscrituraAccesoDatoExcepcion(" Error el id: " + id + " a eliminar no existe");
        } else {
            entityManager.remove(proyecto);
        }
    }

    @Override
    @Transactional
    public Proyecto buscarId(Long id) throws LecturaAccesoDatoExcepcion, EscrituraAccesoDatoExcepcion {
        if (id == null || id <= 0) {
            throw new LecturaAccesoDatoExcepcion(" Error al buscar proyecto, Id invalido debe ser mayor a 0");
        }
        Proyecto proyecto = entityManager.find(Proyecto.class, id);
        if (proyecto == null) {
            throw new EscrituraAccesoDatoExcepcion(" El proyecto con id " + id + " no existe");
        }
        return proyecto;
    }
}
