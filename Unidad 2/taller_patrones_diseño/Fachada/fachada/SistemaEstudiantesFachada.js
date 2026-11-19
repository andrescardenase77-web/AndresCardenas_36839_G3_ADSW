const Estudiante = require('../modelo/Estudiante');
const RepositorioEstudiante = require('../datos/RepositorioEstudiante');
const ValidadorEstudiante = require('../logica/ValidadorEstudiante');
const EstudianteVista = require('../presentacion/EstudianteVista');

/**
 * Fachada (Facade) que oculta la complejidad de instanciar y coordinar
 * los subsistemas internos: vista, repositorio y validador.
 * El cliente (index.js) interactúa únicamente con esta clase.
 */
class SistemaEstudiantesFachada {

    constructor() {
        this.vista = new EstudianteVista();
        this.repositorio = new RepositorioEstudiante();
        this.validador = new ValidadorEstudiante();
    }

    async solicitarOpcion() {
        return await this.vista.solicitarDato('Seleccione una opción: ');
    }

    mostrarMensaje(mensaje) {
        this.vista.mostrarMensaje(mensaje);
    }

    async registrarEstudiante() {
        const id = (await this.vista.solicitarDato('Ingrese el ID: ')).trim();

        if (this.repositorio.buscarPorId(id)) {
            this.vista.mostrarMensaje('El ID ya está registrado.');
            return;
        }

        const nombre = (await this.vista.solicitarDato('Ingrese el nombre: ')).trim();
        const edadTexto = (await this.vista.solicitarDato('Ingrese la edad: ')).trim();

        const error = this.validador.validarDatos(id, nombre, edadTexto);
        if (error) {
            this.vista.mostrarMensaje(error);
            return;
        }

        const estudiante = new Estudiante(id, nombre, Number(edadTexto));
        this.repositorio.guardar(estudiante);
        this.vista.mostrarMensaje('Estudiante registrado correctamente.');
    }

    listarEstudiantes() {
        const estudiantes = this.repositorio.listarTodos();
        this.vista.mostrarEstudiantes(estudiantes);
    }

    async buscarEstudiante() {
        const id = (await this.vista.solicitarDato('Ingrese el ID: ')).trim();
        const estudiante = this.repositorio.buscarPorId(id);
        this.vista.mostrarEstudiante(estudiante);
    }

    async editarEstudiante() {
        const id = (await this.vista.solicitarDato('Ingrese el ID del estudiante: ')).trim();
        const estudiante = this.repositorio.buscarPorId(id);

        if (!estudiante) {
            this.vista.mostrarMensaje('Estudiante no encontrado.');
            return;
        }

        const nombre = (await this.vista.solicitarDato('Nuevo nombre: ')).trim();
        const edadTexto = (await this.vista.solicitarDato('Nueva edad: ')).trim();

        const error = this.validador.validarDatos(id, nombre, edadTexto);
        if (error) {
            this.vista.mostrarMensaje(error);
            return;
        }

        this.repositorio.actualizar(id, nombre, Number(edadTexto));
        this.vista.mostrarMensaje('Estudiante actualizado correctamente.');
    }

    async eliminarEstudiante() {
        const id = (await this.vista.solicitarDato('Ingrese el ID del estudiante: ')).trim();
        const estudiante = this.repositorio.buscarPorId(id);

        if (!estudiante) {
            this.vista.mostrarMensaje('Estudiante no encontrado.');
            return;
        }

        const errorEliminacion = this.validador.puedeEliminar(estudiante);
        if (errorEliminacion) {
            this.vista.mostrarMensaje(errorEliminacion);
            return;
        }

        this.repositorio.eliminar(id);
        this.vista.mostrarMensaje('Estudiante eliminado correctamente.');
    }

    cerrar() {
        this.vista.cerrar();
    }
}

module.exports = SistemaEstudiantesFachada;
