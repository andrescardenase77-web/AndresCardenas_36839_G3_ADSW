const Estudiante = require('../modelo/Estudiante');
const RepositorioEstudiante = require('../datos/RepositorioEstudiante');

class EstudianteControlador {

    constructor(vista, repositorio = new RepositorioEstudiante()) {
        this.vista = vista;
        this.repositorio = repositorio;
    }

    // VALIDAR DATOS DEL ESTUDIANTE (RF-05)
    validarDatos(id, nombre, edad) {
        if (!id || id.trim() === '') {
            return 'Error: El ID es obligatorio y no puede estar vacío.';
        }

        if (!nombre || nombre.trim() === '') {
            return 'Error: El nombre es obligatorio y no puede estar vacío.';
        }

        const edadNumero = Number(edad);
        if (edad === undefined || edad === null || String(edad).trim() === '' || Number.isNaN(edadNumero) || !Number.isInteger(edadNumero) || edadNumero <= 0) {
            return 'Error: La edad debe ser un número entero positivo válido.';
        }

        return null;
    }

    // CREAR ESTUDIANTE (RF-01, RF-05)
    async crearEstudiante() {
        const id = (await this.vista.solicitarDato('Ingrese el ID: ')).trim();

        const existe = this.repositorio.buscarPorId(id);

        if (existe) {
            this.vista.mostrarMensaje('El ID ya está registrado.');
            return;
        }

        const nombre = (await this.vista.solicitarDato('Ingrese el nombre: ')).trim();
        const edadTexto = (await this.vista.solicitarDato('Ingrese la edad: ')).trim();

        const error = this.validarDatos(id, nombre, edadTexto);
        if (error) {
            this.vista.mostrarMensaje(error);
            return;
        }

        const estudiante = new Estudiante(id, nombre, Number(edadTexto));

        this.repositorio.guardar(estudiante);

        this.vista.mostrarMensaje('Estudiante registrado correctamente.');
    }

    // LISTAR ESTUDIANTES (RF-04)
    listarEstudiantes() {
        const estudiantes = this.repositorio.listarTodos();
        this.vista.mostrarEstudiantes(estudiantes);
    }

    // BUSCAR ESTUDIANTE
    async buscarEstudiante() {
        const id = (await this.vista.solicitarDato('Ingrese el ID: ')).trim();

        const estudiante = this.repositorio.buscarPorId(id);

        this.vista.mostrarEstudiante(estudiante);
    }

    // EDITAR ESTUDIANTE (RF-02, RF-05)
    async editarEstudiante() {
        const id = (await this.vista.solicitarDato('Ingrese el ID del estudiante: ')).trim();

        const estudiante = this.repositorio.buscarPorId(id);

        if (!estudiante) {
            this.vista.mostrarMensaje('Estudiante no encontrado.');
            return;
        }

        const nombre = (await this.vista.solicitarDato('Nuevo nombre: ')).trim();
        const edadTexto = (await this.vista.solicitarDato('Nueva edad: ')).trim();

        const error = this.validarDatos(id, nombre, edadTexto);
        if (error) {
            this.vista.mostrarMensaje(error);
            return;
        }

        this.repositorio.actualizar(id, nombre, Number(edadTexto));

        this.vista.mostrarMensaje('Estudiante actualizado correctamente.');
    }

    // ELIMINAR ESTUDIANTE (RF-03)
    async eliminarEstudiante() {
        const id = (await this.vista.solicitarDato('Ingrese el ID del estudiante: ')).trim();

        const estudiante = this.repositorio.buscarPorId(id);

        if (!estudiante) {
            this.vista.mostrarMensaje('Estudiante no encontrado.');
            return;
        }

        if (estudiante.edad < 18) {
            this.vista.mostrarMensaje('No se puede eliminar al estudiante porque es menor de edad (menor a 18 años).');
            return;
        }

        this.repositorio.eliminar(id);

        this.vista.mostrarMensaje('Estudiante eliminado correctamente.');
    }
}

module.exports = EstudianteControlador;
