const RepositorioDecorador = require('./RepositorioDecorador');

/**
 * Decorador concreto que agrega registro de auditoría (logging)
 * a cada operación del repositorio sin modificar su código original.
 */
class LogRepositorioDecorador extends RepositorioDecorador {

    registrarLog(accion, detalle = '') {
        const marcaTiempo = new Date().toLocaleTimeString();
        console.log(`[LOG ${marcaTiempo}] ${accion}${detalle ? ' -> ' + detalle : ''}`);
    }

    guardar(estudiante) {
        this.registrarLog('GUARDAR', `ID=${estudiante.id}, Nombre=${estudiante.nombre}, Edad=${estudiante.edad}`);
        return super.guardar(estudiante);
    }

    listarTodos() {
        const resultado = super.listarTodos();
        this.registrarLog('LISTAR', `Total registros=${resultado.length}`);
        return resultado;
    }

    buscarPorId(id) {
        const resultado = super.buscarPorId(id);
        this.registrarLog('BUSCAR', `ID=${id} (${resultado ? 'Encontrado' : 'No encontrado'})`);
        return resultado;
    }

    actualizar(id, nombre, edad) {
        const actualizado = super.actualizar(id, nombre, edad);
        this.registrarLog('ACTUALIZAR', `ID=${id} (${actualizado ? 'Éxito' : 'Fallido'})`);
        return actualizado;
    }

    eliminar(id) {
        const eliminado = super.eliminar(id);
        this.registrarLog('ELIMINAR', `ID=${id} (${eliminado ? 'Éxito' : 'Fallido'})`);
        return eliminado;
    }
}

module.exports = LogRepositorioDecorador;
