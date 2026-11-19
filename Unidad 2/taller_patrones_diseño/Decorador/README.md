# Patrón de Diseño: Decorador (Decorator)

## ¿En qué consiste el patrón Decorador?
El patrón **Decorador** es un patrón de diseño estructural que permite añadir nuevas funcionalidades o comportamientos a un objeto de forma dinámica, envolviéndolo dentro de objetos especiales llamados *decoradores* que comparten la misma interfaz que el objeto original.

De esta manera se evita modificar el código fuente de la clase base (cumpliendo el principio Abierto/Cerrado) y se evita crear una explosión de subclases por herencia cuando se desean combinar múltiples comportamientos.

---

## Ejemplo claro de cómo funciona
Un ejemplo clásico es una cafetería:
- Tienes un objeto base: `CafeSimple` (cuesta \$2).
- Puedes envolverlo con un decorador `ConLeche(cafe)` que suma \$0.50.
- Luego puedes envolver ese resultado con otro decorador `ConCanela(cafeConLeche)` que suma \$0.30.

Todos exponen el mismo método `obtenerCosto()`. Cada decorador delega la llamada al objeto que envuelve y añade su propio comportamiento antes o después:

```js
let bebida = new CafeSimple();           // $2.00
bebida = new ConLeche(bebida);           // $2.50
bebida = new ConCanela(bebida);          // $2.80
console.log(bebida.obtenerCosto());      // 2.80
```

---

## Justificación de cómo se implementó en el CRUD de Estudiantes
En el taller CRUD original, la clase `RepositorioEstudiante` se encarga únicamente de almacenar y manipular el arreglo de estudiantes en memoria (`guardar`, `listarTodos`, `buscarPorId`, `actualizar`, `eliminar`).

Si en un sistema real queremos agregar **auditoría (logs en consola)** y **métricas de uso (estadísticas de operaciones)** sin contaminar ni modificar `RepositorioEstudiante`, el patrón Decorador es la solución ideal:

1. **Componente Concreto (`datos/RepositorioEstudiante.js`):** Se mantiene intacto respecto al CRUD original.
2. **Decorador Base (`datos/decoradores/RepositorioDecorador.js`):** Recibe cualquier repositorio en su constructor e implementa exactamente los mismos métodos CRUD, delegándolos al objeto envuelto.
3. **Decoradores Concretos:**
   - `LogRepositorioDecorador`: Registra en consola la hora y el detalle de cada operación (`GUARDAR`, `LISTAR`, `BUSCAR`, `ACTUALIZAR`, `ELIMINAR`).
   - `EstadisticasRepositorioDecorador`: Contabiliza cuántas veces se ejecutó cada operación y expone `obtenerResumen()`.
4. **Transparencia para el Controlador (`logica/EstudianteControlador.js`):** El controlador recibe el repositorio ya decorado desde `index.js` y continúa llamando a los mismos métodos CRUD sin enterarse de que el repositorio fue extendido dinámicamente.

### Ejecución
```bash
node index.js
```
