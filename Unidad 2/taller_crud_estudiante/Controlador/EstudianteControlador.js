
const Estudiante = require('../modelo/Estudiante');

class EstudianteControlador {

    constructor(vista) {
        this.vista = vista;
        this.estudiantes = [];
    }

    // CREAR ESTUDIANTE
    async crearEstudiante() {
        const id = await this.vista.solicitarDato('Ingrese el ID: ');

        const existe = this.estudiantes.find(e => e.id === id);

        if (existe) {
            this.vista.mostrarMensaje('El ID ya está registrado.');
            return;
        }

        const nombre = await this.vista.solicitarDato('Ingrese el nombre: ');
        const apellido = await this.vista.solicitarDato('Ingrese el apellido: ');
        const direccion = await this.vista.solicitarDato('Ingrese la dirección: ');

        const estudiante = new Estudiante(id, nombre, apellido, direccion);

        this.estudiantes.push(estudiante);

        this.vista.mostrarMensaje('Estudiante registrado correctamente.');
    }

    // LISTAR ESTUDIANTES
    listarEstudiantes() {
        this.vista.mostrarEstudiantes(this.estudiantes);
    }

    // BUSCAR ESTUDIANTE
    async buscarEstudiante() {
        const id = await this.vista.solicitarDato('Ingrese el ID: ');

        const estudiante = this.estudiantes.find(e => e.id === id);

        this.vista.mostrarEstudiante(estudiante);
    }

    // EDITAR ESTUDIANTE
    async editarEstudiante() {
        const id = await this.vista.solicitarDato('Ingrese el ID del estudiante: ');

        const estudiante = this.estudiantes.find(e => e.id === id);

        if (!estudiante) {
            this.vista.mostrarMensaje('Estudiante no encontrado.');
            return;
        }

        estudiante.nombre = await this.vista.solicitarDato('Nuevo nombre: ');
        estudiante.apellido = await this.vista.solicitarDato('Nuevo apellido: ');
        estudiante.direccion = await this.vista.solicitarDato('Nueva dirección: ');

        this.vista.mostrarMensaje('Estudiante actualizado correctamente.');
    }

    // ELIMINAR ESTUDIANTE
    async eliminarEstudiante() {
        const id = await this.vista.solicitarDato('Ingrese el ID del estudiante: ');

        const indice = this.estudiantes.findIndex(e => e.id === id);

        if (indice === -1) {
            this.vista.mostrarMensaje('Estudiante no encontrado.');
            return;
        }

        this.estudiantes.splice(indice, 1);

        this.vista.mostrarMensaje('Estudiante eliminado correctamente.');
    }
}

module.exports = EstudianteControlador;
