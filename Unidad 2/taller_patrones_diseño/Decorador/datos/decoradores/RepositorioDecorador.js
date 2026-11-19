/**
 * Decorador base que implementa la misma interfaz que RepositorioEstudiante
 * y delega todas las llamadas al repositorio envuelto.
 */
class RepositorioDecorador {

    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    guardar(estudiante) {
        return this.repositorio.guardar(estudiante);
    }

    listarTodos() {
        return this.repositorio.listarTodos();
    }

    buscarPorId(id) {
        return this.repositorio.buscarPorId(id);
    }

    actualizar(id, nombre, edad) {
        return this.repositorio.actualizar(id, nombre, edad);
    }

    eliminar(id) {
        return this.repositorio.eliminar(id);
    }
}

module.exports = RepositorioDecorador;
