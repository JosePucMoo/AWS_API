class Profesor {

    constructor(numeroEmpleado, nombres, apellidos, horasClase) {
        this.id = Math.floor(Math.random() * 1000000);
        this.numeroEmpleado = numeroEmpleado;
        this.nombres = nombres, 
        this.apellidos = apellidos;
        this.horasClase = horasClase;
    }
}

export default Profesor;