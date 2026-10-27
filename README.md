# Microservicio DevOps - Evaluacion Parcial 1 y 2

**Asignatura:** Ingenieria DevOps (DOY0101)  
**Proyecto:** Microservicio en Node.js - Evolucion de Pipeline CI/CD, Contenerizacion y Orquestacion  

---

## Resumen de la evolucion del proyecto

Para la evaluacion parcial 2, el proyecto evoluciono desde una integracion continua basica (CI) hacia un flujo completo de entrega continua (CD) con enfoque DevSecOps, incorporar contenedores y orquestacion de infraestructura.

| Componente | Evaluacion Parcial 1 (Base) | Evaluacion Parcial 2 (Implementaciones y Cambios) |
| :--- | :--- | :--- |
| **Elegibilidad de Control de Versiones** | Definicion de GitFlow (`main`, `develop`, `feature`, `hotfix`). | Se mantiene el flujo de trabajo y la trazabilidad asociando imagenes al commit de GitHub (`${{ github.sha }}`). |
| **Pruebas Automatizadas** | Ejecucion basica de scripts en el pipeline `ci.yml`. | Integracion de etapa dedicada de pruebas unitarias (`unit-tests`) en `main.yml` antes de empaquetar. |
| **Empaquetamiento y Contenedores** | Sin contenerizacion. | Creacion de `Dockerfile` optimizado (`node:18-slim`) con usuario no-root por seguridad. |
| **Seguridad y Gobernanza** | Verificaciones basicas. | Implementacion de **Trivy** para escaneo de vulnerabilidades en contenedores con bloqueo del pipeline (`exit-code: 1`). |
| **Orquestacion y Despliegue** | Despliegue manual / Inexistente. | Orquestacion declarativa con `docker-compose.yml`, limites de recursos (0.5 CPU / 512M RAM) y despliegue automatizado simulado. |

---

# 🔹 EVALUACION PARCIAL 1

## 1. Por que elegi GitFlow para este proyecto

Para organizar el desarrollo del microservicio opte por la metodologia **GitFlow**, ya que me permite mantener un control estricto sobre el codigo que entra a produccion y trabajar en nuevas caracteristicas sin romper lo que ya esta funcionando.

### Comparativa de modelos de trabajo:
- **GitFlow (Elegido):** Trabaja con dos ramas de larga duracion (`main` y `develop`). Me sirvio mucho para esta evaluacion porque pude crear una rama para la funcionalidad de autenticacion (`feature/login-auth`) y otra para solucionar un fallo urgente en la base de datos (`hotfix/fix-db`), integrando todo de forma ordenada mediante Pull Requests sin tocar produccion directamente.
- **Trunk-Based Development:** Todos suben cambios directamente a una sola rama principal. Es muy rapido para equipos maduros, pero para este proyecto habria sido riesgoso porque cualquier error en el codigo habria afectado la rama principal sin pasar por una revision previa.
- **GitHub Flow:** Es un flujo mas simple basado en ramas cortas que van directo a `main`. Aunque es facil de usar, no me daba la separacion clara que necesitaba entre un entorno de desarrollo e integracion (`develop`) y uno de produccion (`main`).

**Conclusion:** GitFlow fue la mejor opcion para esta entrega porque garantiza un ciclo de vida claro para el software, permitiendome probar los cambios en `develop` y ejecutar pipelines automaticos antes de autorizar el pase a `main`.

## 2. Convenciones y buenas practicas del repositorio (EP1)

### Estructura de Ramas
- `main`: Contiene unicamente codigo estable y listo para desplegar.
- `develop`: Es la rama de integracion donde uni las nuevas funcionalidades antes de pasar a produccion.
- `feature/login-auth`: Rama donde desarrolle el modulo de autenticacion del usuario.
- `hotfix/fix-db`: Rama que cree de emergencia para corregir el timeout de la conexion a la base de datos.

### Formato de commits (Conventional Commits)
- `feat:` Para agregar una nueva funcion (ej: `feat: agrega ruta de login`).
- `fix:` Para corregir errores en el codigo (ej: `fix: corregido timeout de bd`).
- `ci:` Para cambios en la configuracion de GitHub Actions (ej: `ci: agrega pipeline de github actions`).
- `docs:` Para cambios en este documento o documentacion del codigo.

### Flujo de integracion (Pull Requests)
- Evite hacer *push* directo a las ramas `main` y `develop`.
- Todo cambio lo realice en su propia rama y solicite la union mediante un **Pull Request (PR)**.

## 3. Declaración de Uso de Inteligencia Artificial (EP1)

| Herramienta | En que se utilizo | Validacion realizada |
| :--- | :--- | :--- |
| **Gemini / ChatGPT** | Apoyo en la resolucion de sintaxis para el archivo `.github/workflows/ci.yml`, comandos de PowerShell para la estructura de carpetas y sugerencias de formato Markdown. | Todos los comandos, la estructura de ramas, los merges manuales y el pipeline los probe y ejecute directamente en la terminal de VS Code y en mi repositorio de GitHub. |

## 4. Reflexión Personal (EP1)

> "Durante el desarrollo de este proyecto me di cuenta de lo importante que es tener un flujo de trabajo bien definido. Al principio trabajar sola con tantas ramas como `develop`, `feature` y `hotfix` parecia un proceso largo, pero al simular el error en la base de datos vi lo util que es reparar un problema urgente sin ensuciar el desarrollo que esta en curso. Ademas, ver el check verde en GitHub Actions me dio la tranquilidad de que el codigo al menos compila e instala sus dependencias antes de fusionarlo a la rama principal."

---

# 🔹 EVALUACION PARCIAL 2

## 1. Justificación de los Cambios e Implementaciones (EP2)

Para esta segunda evaluacion, el pipeline fue completamente actualizado para cubrir todo el ciclo de vida de la aplicacion utilizando **GitHub Actions**. Las principales mejoras e implementaciones aplicadas son:

1. **Contenerizacion del Microservicio (`Dockerfile` - IE1):** Se empaqueto la aplicacion Node.js utilizando una imagen optimizada `node:18-slim` y se configuro un usuario no-root (`appuser`) para cumplir con requerimientos de seguridad y gobernanza.
2. **Pruebas Automatizadas Integradas (IE2):** Se estructuro un job de pruebas automatizadas en el pipeline para validar el codigo antes de la construccion de imagenes.
3. **Escaneo de Seguridad DevSecOps y Regla de Bloqueo (`Trivy` - IE3):** Se incorporo el escaneo de seguridad en la imagen Docker mediante Trivy. Se configuro una politica estricta de bloqueo (`exit-code: 1`), cancelando el pipeline de forma automatica si se detectan vulnerabilidades de severidad `CRITICAL` o `HIGH`.
4. **Orquestación y Gestion de Recursos (`docker-compose.yml` - IE5):** Se definio la infraestructura de forma declarativa con `docker-compose.yml`, configurando limites explicitos de hardware (maximo 0.5 CPU y 512M de memoria RAM) para garantizar estabilidad y desempeno.
5. **Despliegue Automatico Simulado y Trazabilidad (IE4):** El pipeline despliega automaticamente el microservicio orquestado en un entorno cloud simulado. La trazabilidad entre desarrollo y produccion se asegura etiquetando las imagenes con el hash del commit (`${{ github.sha }}`).

## 2. Instrucciones para Ejecución Local (EP2)

Para probar la nueva version contenerizada y orquestada localmente:

```bash
# Construir y levantar el contenedor orquestado en segundo plano
docker-compose up -d --build

# Verificar que los contenedores esten activos y saludables
docker ps

## 3. Declaracion de Uso de Inteligencia Artificial

Uso de herramientas de IA generativa durante el desarrollo del proyecto:

| Herramienta | En que se utilizo | Validacion realizada |
| :--- | :--- | :--- |
| **Gemini / ChatGPT** | Apoyo en la resolucion de sintaxis para el archivo .github/workflows/main.yml, la configuracion de limites de recursos en docker-compose.yml y sugerencias de formato Markdown. | Todos los archivos de configuracion, la estructura de archivos y las verificaciones en GitHub Actions se probaron y ejecutaron directamente en VS Code y en el repositorio. |

## 4. Reflexion Personal

> "Durante el desarrollo de esta evaluacion comprendi lo relevante que es incorporar la seguridad y la orquestacion dentro del mismo flujo de integracion continua. Configurar el bloqueo del pipeline ante fallas de seguridad con Trivy me me demostro como el enfoque DevSecOps evita que vulnerabilidades criticas lleguen a un entorno de produccion. Ademas, ver que el microservicio se compila, se evalua, se escanea y se despliega de forma totalmente automatizada en GitHub Actions me dio la tranquilidad de contar con un flujo profesional y trazable."