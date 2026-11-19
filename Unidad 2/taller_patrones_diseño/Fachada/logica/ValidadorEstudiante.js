/**
 * Subsistema encargado exclusivamente de las reglas de validación
 * y restricciones de negocio de los estudiantes.
 */
class ValidadorEstudiante {

    validarDatos(id, nombre, edad) {
        if (!id || id.trim() === '') {
            return 'Error: El ID es obligatorio y no puede estar vacío.';
        }

        if (!nombre || nombre.trim() === '') {
            return 'Error: El nombre es obligatorio y no puede estar vacío.';
        }

        const edadNumero = Number(edad);
        if (
            edad === undefined ||
            edad === null ||
            String(edad).trim() === '' ||
            Number.isNaN(edadNumero) ||
            !Number.isInteger(edadNumero) ||
            edadNumero <= 0
        ) {
            return 'Error: La edad debe ser un número entero positivo válido.';
        }

        return null;
    }

    puedeEliminar(estudiante) {
        if (estudiante.edad < 18) {
            return 'No se puede eliminar al estudiante porque es menor de edad (menor a 18 años).';
        }
        return null;
    }
}

module.exports = ValidadorEstudiante;
