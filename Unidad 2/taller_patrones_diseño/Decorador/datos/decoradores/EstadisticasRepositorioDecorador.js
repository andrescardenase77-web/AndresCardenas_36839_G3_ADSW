const RepositorioDecorador = require('./RepositorioDecorador');

/**
 * Decorador concreto que contabiliza el número de operaciones
 * realizadas sobre el repositorio.
 */
class EstadisticasRepositorioDecorador extends RepositorioDecorador {

    constructor(repositorio) {
        super(repositorio);
        this.estadisticas = {
            creaciones: 0,
            listados: 0,
            busquedas: 0,
            actualizaciones: 0,
            eliminaciones: 0
        };
    }

    guardar(estudiante) {
        this.estadisticas.creaciones++;
        return super.guardar(estudiante);
    }

    listarTodos() {
        this.estadisticas.listados++;
        return super.listarTodos();
    }

    buscarPorId(id) {
        this.estadisticas.busquedas++;
        return super.buscarPorId(id);
    }

    actualizar(id, nombre, edad) {
        const resultado = super.actualizar(id, nombre, edad);
        if (resultado) {
            this.estadisticas.actualizaciones++;
        }
        return resultado;
    }

    eliminar(id) {
        const resultado = super.eliminar(id);
        if (resultado) {
            this.estadisticas.eliminaciones++;
        }
        return resultado;
    }

    obtenerResumen() {
        return { ...this.estadisticas };
    }
}

module.exports = EstadisticasRepositorioDecorador;
