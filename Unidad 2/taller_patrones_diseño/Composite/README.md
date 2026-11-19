# Patrón de Diseño: Composite (Compuesto)

## ¿En qué consiste el patrón Composite?
El patrón **Composite** es un patrón de diseño estructural que permite componer objetos en estructuras de árbol para representar jerarquías de parte-todo. Su característica principal es que permite a los clientes tratar de manera uniforme tanto a los objetos individuales (*hojas*) como a las composiciones de objetos (*compuestos*).

Gracias a una interfaz común, una operación aplicada sobre un nodo compuesto se delega recursivamente a todos sus hijos, sin que el código cliente tenga que distinguir si está operando sobre un elemento simple o sobre un grupo completo.

---

## Ejemplo claro de cómo funciona
Un ejemplo cotidiano es el sistema de archivos de un computador:
- Un **Archivo** (hoja) tiene un tamaño propio.
- Una **Carpeta** (compuesto) puede contener archivos y otras subcarpetas; su tamaño es la suma recursiva del tamaño de todo lo que contiene.

Ambos comparten el mismo método `obtenerTamaño()`:

```js
const archivo1 = new Archivo('tarea.pdf', 200);
const archivo2 = new Archivo('foto.png', 500);
const carpeta = new Carpeta('Documentos');
carpeta.agregar(archivo1);
carpeta.agregar(archivo2);

console.log(archivo1.obtenerTamaño()); // 200
console.log(carpeta.obtenerTamaño());  // 700
```

---

## Justificación de cómo se implementó en el CRUD de Estudiantes
En el taller CRUD original, todos los estudiantes se guardaban en una lista plana (`this.estudiantes = []`). En un entorno académico real, los estudiantes se organizan en jerarquías (por ejemplo: Institución → Facultad → Semestre/Paralelo → Estudiantes).

Al aplicar el patrón **Composite**:
1. **Componente Base (`modelo/ComponenteAcademico.js`):** Define la interfaz uniforme que comparten todos los nodos del árbol: `mostrar(indentacion)`, `contarEstudiantes()`, `buscarPorId(id)` y `obtenerEstudiantes()`.
2. **Hoja (`modelo/Estudiante.js`):** Extiende `ComponenteAcademico` y representa a un estudiante individual (`contarEstudiantes()` retorna `1`).
3. **Compuesto (`modelo/GrupoEstudiantes.js`):** Extiende `ComponenteAcademico` y contiene un arreglo `hijos` que puede alojar tanto `Estudiante` como otros `GrupoEstudiantes`. Sus operaciones recorren recursivamente a sus hijos.
4. **Repositorio y Controlador (`datos/RepositorioEstudiante.js`, `logica/EstudianteControlador.js`):** El repositorio mantiene un `GrupoEstudiantes` raíz (`ROOT - Institución`). Todas las operaciones del CRUD original (buscar, listar, editar, eliminar) funcionan de forma transparente sobre el árbol, y además se pueden crear grupos/subgrupos y visualizar la jerarquía completa con conteo automático de estudiantes.

### Ejecución
```bash
node index.js
```
