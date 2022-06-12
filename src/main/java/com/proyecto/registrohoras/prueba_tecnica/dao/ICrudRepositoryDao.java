package com.proyecto.registrohoras.prueba_tecnica.dao;

import com.proyecto.registrohoras.prueba_tecnica.models.Empleado;
import com.proyecto.registrohoras.prueba_tecnica.utils.AccesoDatoExcepcion;

import java.util.List;

public interface ICrudRepositoryDao<T> {

    List<T> listar();

    void crear(T o) throws AccesoDatoExcepcion;

    void editar(T o) throws AccesoDatoExcepcion;

    void eliminar(Long id) throws AccesoDatoExcepcion;

    T buscarId(Long id) throws AccesoDatoExcepcion;
}
