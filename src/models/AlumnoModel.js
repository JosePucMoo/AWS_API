class Alumno {

    constructor(nombres, apellidos, matricula, promedio) {
        this.id = Math.floor(Math.random() * 1000000);
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.matricula = matricula;
        this.promedio = promedio;
    }
}

export default Alumno;