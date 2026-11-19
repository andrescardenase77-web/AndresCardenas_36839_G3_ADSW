const Estudiante = require('../modelo/Estudiante');
const GrupoEstudiantes = require('../modelo/GrupoEstudiantes');

/**
 * Repositorio que administra un árbol Composite cuya raíz es un GrupoEstudiantes.
 */
class RepositorioEstudiante {

    constructor() {
        this.raiz = new GrupoEstudiantes('ROOT', 'Institución');
    }

    guardar(estudiante, idGrupoPadre = 'ROOT') {
        const grupoDestino = this.buscarGrupoPorId(idGrupoPadre);
        if (!grupoDestino) {
            return false;
        }
        grupoDestino.agregar(estudiante);
        return true;
    }

    guardarGrupo(grupo, idGrupoPadre = 'ROOT') {
        const grupoDestino = this.buscarGrupoPorId(idGrupoPadre);
        if (!grupoDestino) {
            return false;
        }
        grupoDestino.agregar(grupo);
        return true;
    }

    listarTodos() {
        return this.raiz.obtenerEstudiantes();
    }

    obtenerEstructura() {
        return this.raiz;
    }

    buscarComponentePorId(id) {
        return this.raiz.buscarPorId(id);
    }

    buscarPorId(id) {
        const componente = this.raiz.buscarPorId(id);
        return componente instanceof Estudiante ? componente : null;
    }

    buscarGrupoPorId(id) {
        const componente = this.raiz.buscarPorId(id);
        return componente instanceof GrupoEstudiantes ? componente : null;
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
        return this.raiz.eliminar(id);
    }
}

module.exports = RepositorioEstudiante;
