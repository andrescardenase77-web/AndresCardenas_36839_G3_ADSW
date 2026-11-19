const ComponenteAcademico = require('./ComponenteAcademico');

/**
 * Hoja (Leaf) del patrón Composite.
 * Representa un estudiante individual que no contiene otros componentes.
 */
class Estudiante extends ComponenteAcademico {

    constructor(id, nombre, edad) {
        super(id, nombre);
        this.edad = edad;
    }

    mostrar(indentacion = 0) {
        const prefijo = '  '.repeat(indentacion);
        console.log(`${prefijo}- [Estudiante] ID: ${this.id} | Nombre: ${this.nombre} | Edad: ${this.edad}`);
    }

    contarEstudiantes() {
        return 1;
    }

    buscarPorId(id) {
        return this.id === id ? this : null;
    }

    obtenerEstudiantes() {
        return [this];
    }
}

module.exports = Estudiante;
