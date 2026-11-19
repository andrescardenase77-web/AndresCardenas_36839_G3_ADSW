const SistemaEstudiantesFachada = require('./fachada/SistemaEstudiantesFachada');

// El cliente únicamente conoce e interactúa con la Fachada
const sistema = new SistemaEstudiantesFachada();

async function menu() {

    let opcion;

    do {
        console.log('\n===== CRUD DE ESTUDIANTES (PATRÓN FACHADA) =====');
        console.log('1. Registrar estudiante');
        console.log('2. Listar estudiantes');
        console.log('3. Buscar estudiante');
        console.log('4. Editar estudiante');
        console.log('5. Eliminar estudiante');
        console.log('6. Salir');

        opcion = await sistema.solicitarOpcion();

        switch (opcion) {

            case '1':
                await sistema.registrarEstudiante();
                break;

            case '2':
                sistema.listarEstudiantes();
                break;

            case '3':
                await sistema.buscarEstudiante();
                break;

            case '4':
                await sistema.editarEstudiante();
                break;

            case '5':
                await sistema.eliminarEstudiante();
                break;

            case '6':
                sistema.mostrarMensaje('Saliendo del sistema...');
                break;

            default:
                sistema.mostrarMensaje('Opción no válida.');
        }

    } while (opcion !== '6');

    sistema.cerrar();
}

menu();
