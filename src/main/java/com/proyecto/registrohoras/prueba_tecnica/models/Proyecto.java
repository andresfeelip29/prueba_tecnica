package com.proyecto.registrohoras.prueba_tecnica.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "proyecto")
public class Proyecto {

    @Id
    @Getter @Setter @Column(name = "ID")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;


    @Getter @Setter @Column(name = "NOMBRE_PROYECTO")
    private String nombre;
}
