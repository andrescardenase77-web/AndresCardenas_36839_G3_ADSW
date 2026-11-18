
const EstudianteVista = require('./vista/EstudianteVista');
const EstudianteControlador = require('./controlador/EstudianteControlador');

const vista = new EstudianteVista();
const controlador = new EstudianteControlador(vista);

async function menu() {

    let opcion;

    do {
        console.log('\n===== CRUD DE ESTUDIANTES =====');
        console.log('1. Registrar estudiante');
        console.log('2. Listar estudiantes');
        console.log('3. Buscar estudiante');
        console.log('4. Editar estudiante');
        console.log('5. Eliminar estudiante');
        console.log('6. Salir');

        opcion = await vista.solicitarDato('Seleccione una opción: ');

        switch (opcion) {

            case '1':
                await controlador.crearEstudiante();
                break;

            case '2':
                controlador.listarEstudiantes();
                break;
            case '3':
                await controlador.buscarEstudiante();
                break;

            case '4':
                await controlador.editarEstudiante();
                break;

            case '5':
                await controlador.eliminarEstudiante();
                break;

            case '6':
                vista.mostrarMensaje('Saliendo del sistema...');
                break;

            default:
                vista.mostrarMensaje('Opción no válida.');
        }

    } while (opcion !== '6');

    vista.cerrar();
}

menu();
