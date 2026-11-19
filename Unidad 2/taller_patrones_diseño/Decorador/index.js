const EstudianteVista = require('./presentacion/EstudianteVista');
const RepositorioEstudiante = require('./datos/RepositorioEstudiante');
const LogRepositorioDecorador = require('./datos/decoradores/LogRepositorioDecorador');
const EstadisticasRepositorioDecorador = require('./datos/decoradores/EstadisticasRepositorioDecorador');
const EstudianteControlador = require('./logica/EstudianteControlador');

const vista = new EstudianteVista();

// Composición dinámica de decoradores sobre el repositorio base
const repositorioBase = new RepositorioEstudiante();
const repositorioConLog = new LogRepositorioDecorador(repositorioBase);
const repositorioDecorado = new EstadisticasRepositorioDecorador(repositorioConLog);

// El controlador recibe el repositorio decorado sin conocer los decoradores aplicados
const controlador = new EstudianteControlador(vista, repositorioDecorado);

async function menu() {

    let opcion;

    do {
        console.log('\n===== CRUD DE ESTUDIANTES (PATRÓN DECORADOR) =====');
        console.log('1. Registrar estudiante');
        console.log('2. Listar estudiantes');
        console.log('3. Buscar estudiante');
        console.log('4. Editar estudiante');
        console.log('5. Eliminar estudiante');
        console.log('6. Ver estadísticas de operaciones');
        console.log('7. Salir');

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
                vista.mostrarEstadisticas(repositorioDecorado.obtenerResumen());
                break;

            case '7':
                vista.mostrarMensaje('Saliendo del sistema...');
                break;

            default:
                vista.mostrarMensaje('Opción no válida.');
        }

    } while (opcion !== '7');

    vista.cerrar();
}

menu();
