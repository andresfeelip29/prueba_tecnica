package com.proyecto.registrohoras.prueba_tecnica.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "empleado")
@ToString @EqualsAndHashCode
public class Empleado {

    @Id
    @Getter @Setter @Column(name = "ID")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Getter @Setter @Column(name = "PRIMER_NOMBRE")
    private String nombre;

    @Getter @Setter @Column(name = "PRIMER_APELLIDO")
    private String apellido;


}
