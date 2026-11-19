# Patrón de Diseño: Fachada (Facade)

## ¿En qué consiste el patrón Fachada?
El patrón **Fachada** es un patrón de diseño estructural que proporciona una interfaz simplificada y unificada para interactuar con un conjunto complejo de clases, módulos o subsistemas.

Su propósito principal es reducir el acoplamiento entre el código cliente y los subsistemas internos: el cliente no necesita conocer cómo se instancian, configuran o coordinan las piezas internas, sino que solo llama a métodos claros y directos expuestos por la fachada.

---

## Ejemplo claro de cómo funciona
Piensa en encender un cine en casa (*Home Theater*):
- Sin fachada, tendrías que encender manualmente el proyector, bajar la pantalla, encender el amplificador, ajustar el volumen, encender el reproductor y poner la película.
- Con una fachada (`CineEnCasaFachada`), solo llamas a un método:

```js
const cine = new CineEnCasaFachada();
cine.verPelicula('Inception');
```

Internamente, la fachada coordina todos los subsistemas en el orden correcto sin que el usuario tenga que interactuar con cada uno por separado.

---

## Justificación de cómo se implementó en el CRUD de Estudiantes
En el taller CRUD original, el archivo cliente `index.js` debía importar, instanciar y cablear manualmente tres componentes distintos (`EstudianteVista`, `RepositorioEstudiante` y `EstudianteControlador`), además de llamar directamente a la vista para solicitar opciones, mostrar mensajes y cerrar la consola.

Al aplicar el patrón **Fachada**:
1. **Subsistemas separados y enfocados:**
   - `datos/RepositorioEstudiante.js`: gestiona el almacenamiento en memoria.
   - `logica/ValidadorEstudiante.js`: centraliza las validaciones de datos y reglas de negocio (como impedir eliminar menores de 18 años).
   - `presentacion/EstudianteVista.js`: maneja la entrada/salida por consola.
2. **Fachada unificada (`fachada/SistemaEstudiantesFachada.js`):** Instancia y coordina los tres subsistemas internamente, exponiendo una interfaz limpia (`registrarEstudiante`, `listarEstudiantes`, `buscarEstudiante`, `editarEstudiante`, `eliminarEstudiante`, `solicitarOpcion`, `mostrarMensaje`, `cerrar`).
3. **Cliente desacoplado (`index.js`):** Ahora solo importa `SistemaEstudiantesFachada`, desconociendo por completo cómo se validan, almacenan o muestran los estudiantes.

### Ejecución
```bash
node index.js
```
