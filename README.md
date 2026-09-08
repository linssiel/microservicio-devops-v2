# Microservicio DevOps - Evaluacion Parcial 1

**Asignatura:** Ingenieria DevOps (DOY0101)  
**Proyecto:** Microservicio en Node.js con estrategia GitFlow e Integracion Continua  

## 1. Por que elegi GitFlow para este proyecto

Para organizar el desarrollo del microservicio opte por la metodologia **GitFlow**, ya que me permite mantener un control estricto sobre el codigo que entra a produccion y trabajar en nuevas caracteristicas sin romper lo que ya esta funcionando.

### Comparativa de modelos de trabajo:
* **GitFlow (Elegido):** Trabaja con dos ramas de larga duracion (`main` y `develop`). Me sirvio mucho para esta evaluacion porque pude crear una rama para la funcionalidad de autenticacion (`feature/login-auth`) y otra para solucionar un fallo urgente en la base de datos (`hotfix/fix-db`), integrando todo de forma ordenada mediante Pull Requests sin tocar produccion directamente.
* **Trunk-Based Development:** Todos suben cambios directamente a una sola rama principal. Es muy rapido para equipos maduros, pero para este proyecto habria sido riesgoso porque cualquier error en el codigo habria afectado la rama principal sin pasar por una revision previa.
* **GitHub Flow:** Es un flujo mas simple basado en ramas cortas que van directo a `main`. Aunque es facil de usar, no me daba la separacion clara que necesitaba entre un entorno de desarrollo e integracion (`develop`) y uno de produccion (`main`).

**Conclusion:** GitFlow fue la mejor opcion para esta entrega porque garantiza un ciclo de vida claro para el software, permitiendome probar los cambios en `develop` y ejecutar pipelines automaticos antes de autorizar el pase a `main`.

## 2. Convenciones y Buenas Practicas del Repositorio

Para mantener el proyecto ordenado y facilitar la mantencion del codigo, aplique las siguientes reglas:

### Estructura de Ramas
* `main`: Contiene unicamente codigo estable y listo para desplegar.
* `develop`: Es la rama de integracion donde uni las nuevas funcionalidades antes de pasar a produccion.
* `feature/login-auth`: Rama donde desarrolle el modulo de autenticacion del usuario.
* `hotfix/fix-db`: Rama que cree de emergencia para corregir el timeout de la conexion a la base de datos.

### Formato de Commits (Conventional Commits)
Escribi los mensajes de commit siguiendo una estructura clara para saber exactamente que cambio en cada paso:
* `feat:` Para agregar una nueva funcion (ej: `feat: agrega ruta de login`).
* `fix:` Para corregir errores en el codigo (ej: `fix: corregido timeout de bd`).
* `ci:` Para cambios en la configuracion de GitHub Actions (ej: `ci: agrega pipeline de github actions`).
* `docs:` Para cambios en este documento o documentacion del codigo.

### Flujo de Integracion (Pull Requests)
* Evite hacer *push* directo a las ramas `main` y `develop`.
* Todo cambio lo realice en su propia rama y solicite la union mediante un **Pull Request (PR)**.
* Cada PR solo se aprobo tras pasar la verificacion automatica del pipeline en GitHub Actions.

## 3. Declaracion de Uso de Inteligencia Artificial

Uso de herramientas de IA generativa durante el desarrollo del proyecto:

| Herramienta | En que se utilizo | Validacion realizada |
| :--- | :--- | :--- |
| **Gemini / ChatGPT** | Apoyo en la resolucion de sintaxis para el archivo `.github/workflows/ci.yml`, comandos de PowerShell para la estructura de carpetas y sugerencias de formato Markdown. | Todos los comandos, la estructura de ramas, los merges manuales y el pipeline los probe y ejecute directamente en la terminal de VS Code y en mi repositorio de GitHub. |

## 4. Reflexion Personal

> "Durante el desarrollo de este proyecto me di cuenta de lo importante que es tener un flujo de trabajo bien definido. Al principio trabajar sola con tantas ramas como `develop`, `feature` y `hotfix` parecia un proceso largo, pero al simular el error en la base de datos vi lo util que es reparar un problema urgente sin ensuciar el desarrollo que esta en curso. Ademas, ver el check verde en GitHub Actions me dio la tranquilidad de que el codigo al menos compila e instala sus dependencias antes de fusionarlo a la rama principal."