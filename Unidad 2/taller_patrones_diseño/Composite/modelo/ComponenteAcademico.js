/**
 * Componente base (Component) del patrón Composite.
 * Define la interfaz común para elementos individuales (Estudiante)
 * y elementos compuestos (GrupoEstudiantes).
 */
class ComponenteAcademico {

    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    mostrar(indentacion = 0) {
        throw new Error('El método mostrar() debe ser implementado por las subclases.');
    }

    contarEstudiantes() {
        throw new Error('El método contarEstudiantes() debe ser implementado por las subclases.');
    }

    buscarPorId(id) {
        throw new Error('El método buscarPorId() debe ser implementado por las subclases.');
    }

    obtenerEstudiantes() {
        throw new Error('El método obtenerEstudiantes() debe ser implementado por las subclases.');
    }
}

module.exports = ComponenteAcademico;
