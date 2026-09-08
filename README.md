# Documentacion Tecnica - Microservicio DevOps (EP1)

**Asignatura:** Ingenieria DevOps (DOY0101)  
**Evaluacion:** Evaluacion Parcial 1  

---

## 1. Justificacion del Modelo de Ramificacion (IE1)

Para la gestion del codigo fuente de este microservicio se ha seleccionado el modelo **GitFlow**.

### Comparativa Tecnica de Modelos:
* **GitFlow (Seleccionado):** Establece dos ramas principales de larga duracion (`main` para produccion y `develop` para integracion)[cite: 1]. El desarrollo de caracteristicas aisladas en ramas `feature/*` y la correccion de errores criticos en `hotfix/*` garantiza una trazabilidad absoluta y evita la contaminacion de la rama estable de produccion[cite: 1].
* **Trunk-Based Development:** Todos los desarrolladores envian cambios frecuentemente a una unica rama principal (*trunk* o `main`). Si bien acelera la entrega, requiere un nivel avanzado de automatizacion con *Feature Flags* y suite de pruebas robustas para no romper entornos productivos.
* **GitHub Flow:** Modelo liviano basado en despliegues continuos directamente desde ramas de caracteristicas a `main`. No separa explicitamente entornos de integracion de los de produccion.

**Conclusion:** Se adopta **GitFlow** ya que permite simular de forma controlada el ciclo de vida del software en un entorno Cloud, validando cambios en `develop` antes de promover el codigo hacia `main` mediante verificaciones automaticas de Pull Requests[cite: 1].

---

## 2. Guia de Buenas Practicas y Convenciones (IE5)

### Estrategia y Nomenclatura de Ramas
* `main`: Codigo estable en produccion[cite: 1].
* `develop`: Entorno de integracion continua[cite: 1].
* `feature/<nombre-caracteristica>`: Nuevas funcionalidades (ej: `feature/user-authentication`)[cite: 1].
* `hotfix/<nombre-arreglo>`: Parches urgentes aplicados directamente desde `main` (ej: `hotfix/critical-security-patch`)[cite: 1].

### Estandar de Commits (Conventional Commits)
Se define el uso estricto de la siguiente estructura para los mensajes de confirmacion:
* `feat:` Nueva funcionalidad para el microservicio.
* `fix:` Correccion de un fallo o error (*bug fix*).
* `docs:` Cambios en la documentacion.
* `style:` Formato o estilo de codigo (sin impacto en logica).
* `refactor:` Reestructuracion interna del codigo.
* `test:` Adicion o actualizacion de pruebas.

*Ejemplo:* `feat(auth): implement JWT token validation`

### Flujos de Merge y Revision de Codigo
1. Queda prohibido hacer *push* directo a las ramas `main` y `develop`.
2. Todo cambio debe originarse en una rama `feature/*` o `hotfix/*`.
3. La integracion se realizara unicamente mediante **Pull Requests (PR)**.
4. Para aprobar un PR, las comprobaciones automaticas del pipeline de **GitHub Actions** deben finalizar con exito (`status: success`).

---

## 3. Declaracion del Uso de Inteligencia Artificial (Requisito Duoc UC)

| Herramienta de IA | Uso Aplicado | Validacion y Alcance |
| :--- | :--- | :--- |
| Gemini / ChatGPT | Formateo del documento Markdown, sintaxis del archivo YAML para GitHub Actions y revision de sintaxis de comandos Git. | La logica del microservicio, las pruebas del pipeline y la redaccion de conclusiones fueron validadas y probadas tecnicamente. |

---

## 4. Reflexion Individual (Requisito Duoc UC)

> "A traves de esta evaluacion comprendi la relevancia practica de aplicar un modelo de ramificacion estructurado como GitFlow en un proyecto software. La integracion de automatizaciones mediante GitHub Actions me permitio evidenciar como se minimizan los errores humanos y se garantiza la calidad del codigo previo a su liberacion a produccion."