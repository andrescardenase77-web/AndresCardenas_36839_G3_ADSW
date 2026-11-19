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

    mostrarEstructura(componenteRaiz) {
        console.log('\n===== ESTRUCTURA JERÁRQUICA (COMPOSITE) =====');
        componenteRaiz.mostrar(0);
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

    cerrar() {
        this.rl.close();
    }
}

module.exports = EstudianteVista;
