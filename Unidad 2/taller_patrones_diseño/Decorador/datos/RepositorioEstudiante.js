class RepositorioEstudiante {

    constructor() {
        this.estudiantes = [];
    }

    guardar(estudiante) {
        this.estudiantes.push(estudiante);
    }

    listarTodos() {
        return this.estudiantes;
    }

    buscarPorId(id) {
        return this.estudiantes.find(e => e.id === id);
    }

    actualizar(id, nombre, edad) {
        const estudiante = this.buscarPorId(id);
        if (!estudiante) {
            return false;
        }
        estudiante.nombre = nombre;
        estudiante.edad = edad;
        return true;
    }

    eliminar(id) {
        const indice = this.estudiantes.findIndex(e => e.id === id);
        if (indice === -1) {
            return false;
        }
        this.estudiantes.splice(indice, 1);
        return true;
    }
}

module.exports = RepositorioEstudiante;
