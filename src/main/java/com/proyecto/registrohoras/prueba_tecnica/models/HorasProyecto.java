package com.proyecto.registrohoras.prueba_tecnica.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "horas_proyecto")
public class HorasProyecto {

    @Id
    @Getter @Setter @Column(name = "ID")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Getter @Setter @Column(name = "EMPLEADO_ID")
    private Long empleadoId;

    @Getter @Setter @Column(name = "PROYECTO_ID")
    private Long proyectoId;

    @Getter @Setter @Column(name = "FECHA")
    private Date fecha;

    @Getter @Setter @Column(name = "HORAS_TRABAJADAS")
    private Integer horasTrabajadas;



}
