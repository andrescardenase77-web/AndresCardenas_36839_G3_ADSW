const readline = require('readline');

class EstudianteVista {

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    solicitarDato(mensaje) {
        return new Promise((resolve) => {
            this.rl.question(mensaje, (respuesta) => {
                resolve(respuesta);
            });
        });
    }

    mostrarMensaje(mensaje) {
        console.log(mensaje);
    }

    mostrarEstudiantes(estudiantes) {
        if (estudiantes.length === 0) {
            console.log('No existen estudiantes registrados.');
            return;
        }

        console.log('\n===== LISTA DE ESTUDIANTES =====');

        estudiantes.forEach((estudiante) => {
            console.log('ID:', estudiante.id);
            console.log('Nombre:', estudiante.nombre);
            console.log('Edad:', estudiante.edad);
            console.log('---------------------------');
        });
    }

    mostrarEstudiante(estudiante) {
        if (!estudiante) {
            console.log('Estudiante no encontrado.');
            return;
        }

        console.log('\n===== ESTUDIANTE ENCONTRADO =====');
        console.log('ID:', estudiante.id);
        console.log('Nombre:', estudiante.nombre);
        console.log('Edad:', estudiante.edad);
    }

    mostrarEstadisticas(resumen) {
        console.log('\n===== ESTADÍSTICAS DE OPERACIONES (DECORADOR) =====');
        console.log('Creaciones:', resumen.creaciones);
        console.log('Listados:', resumen.listados);
        console.log('Búsquedas:', resumen.busquedas);
        console.log('Actualizaciones:', resumen.actualizaciones);
        console.log('Eliminaciones:', resumen.eliminaciones);
    }

    cerrar() {
        this.rl.close();
    }
}

module.exports = EstudianteVista;
