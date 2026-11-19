const ComponenteAcademico = require('./ComponenteAcademico');

/**
 * Compuesto (Composite) del patrón Composite.
 * Representa un grupo o curso que puede contener tanto Estudiantes (hojas)
 * como otros GrupoEstudiantes (subgrupos), tratándolos de forma uniforme.
 */
class GrupoEstudiantes extends ComponenteAcademico {

    constructor(id, nombre) {
        super(id, nombre);
        this.hijos = [];
    }

    agregar(componente) {
        this.hijos.push(componente);
    }

    eliminar(id) {
        const indice = this.hijos.findIndex(hijo => hijo.id === id);
        if (indice !== -1) {
            this.hijos.splice(indice, 1);
            return true;
        }

        for (const hijo of this.hijos) {
            if (hijo instanceof GrupoEstudiantes && hijo.eliminar(id)) {
                return true;
            }
        }

        return false;
    }

    mostrar(indentacion = 0) {
        const prefijo = '  '.repeat(indentacion);
        console.log(`${prefijo}+ [Grupo] ID: ${this.id} | ${this.nombre} (Total estudiantes: ${this.contarEstudiantes()})`);
        this.hijos.forEach(hijo => hijo.mostrar(indentacion + 1));
    }

    contarEstudiantes() {
        return this.hijos.reduce((total, hijo) => total + hijo.contarEstudiantes(), 0);
    }

    buscarPorId(id) {
        if (this.id === id) {
            return this;
        }
        for (const hijo of this.hijos) {
            const encontrado = hijo.buscarPorId(id);
            if (encontrado) {
                return encontrado;
            }
        }
        return null;
    }

    obtenerEstudiantes() {
        return this.hijos.flatMap(hijo => hijo.obtenerEstudiantes());
    }
}

module.exports = GrupoEstudiantes;
