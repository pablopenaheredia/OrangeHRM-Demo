![Playwright](https://img.shields.io/badge/Testing-Playwright-45ba4b)
![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen)

# OrangeHRM Automation Project

Este es un proyecto personal de testing automatizado para OrangeHRM creado con Playwright, Node.js y TypeScript. Su objetivo es aprender y aplicar estrategias de automatización de pruebas funcionales en la interfaz gráfica (UI), siguiendo buenas prácticas como el patrón Page Object Model y generando reportes de ejecución.

## Índice

- [Introducción](#introducción)
- [Alcance del Proyecto](#alcance-del-proyecto)
- [Funcionalidades a Testear](#funcionalidades-a-testear)
- [Estrategia de Pruebas](#estrategia-de-pruebas)
- [Criterios de Prueba](#criterios-de-prueba)
- [Instalación](#instalación)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Documentación y Recursos](#documentación-y-recursos)
- [Próximos Pasos](#próximos-pasos)
- [Contacto](#contacto)

## Introducción

Este proyecto de testing automatizado surge como parte de mi portfolio personal. La idea es validar las funcionalidades clave de OrangeHRM mediante pruebas automatizadas, utilizando Playwright y TypeScript, para garantizar la calidad y estabilidad del sistema. Se ejecutan pruebas en distintos navegadores, aplicando técnicas de Black Box Testing.

## Alcance del Proyecto

### Dentro del Alcance (In Scope)

- Automatización de pruebas funcionales en la interfaz gráfica
- Validación de inicio de sesión, gestión de empleados y asignación de permisos
- Ejecución de pruebas en múltiples navegadores con Playwright

### Fuera del Alcance (Out of Scope)

- Pruebas de API
- Pruebas de carga o rendimiento
- Validaciones con bases de datos

## Funcionalidades a Testear

### Inicio de sesión

- Validación de credenciales correctas e incorrectas
- Verificación de mensajes de error

### Gestión de empleados

- Creación, modificación y eliminación de registros de empleados
- Manejo de restricciones según permisos de usuario

### Asignación de permisos

- Validación de acceso a diferentes módulos según roles
- Control de accesos no autorizados

## Estrategia de Pruebas

Se aplican diversas técnicas de Black Box Testing:

- **Partición de Equivalencia y Valores Límite**: Para validar los rangos de entrada
- **Error Guessing**: Para detectar comportamientos inesperados
- **Pruebas de Regresión**: Asegurar que nuevas actualizaciones no afecten la funcionalidad existente
- **Pruebas Exploratorias Manuales**: Complementan las pruebas automatizadas en caso de detectar anomalías

Los resultados se documentan y, en caso de detectar defectos, se realiza un seguimiento manual a través de Notion, generando logs de ejecución con Playwright.

## Criterios de Prueba

Las pruebas se consideran exitosas cuando:

- Se ejecutan todos los casos de prueba planificados
- Se documentan y corrigen los defectos encontrados
- Los flujos críticos (inicio de sesión, gestión de empleados y asignación de permisos) funcionan correctamente sin errores bloqueantes

| Severidad | Descripción                                      | Acción Requerida            |
|-----------|--------------------------------------------------|----------------------------|
| Crítica   | Falla que impide el uso del sistema              | Corrección inmediata       |
| Alta      | Funcionalidad clave no opera correctamente       | Corrección prioritaria     |
| Media     | Error con solución alternativa                   | Próxima iteración          |
| Baja      | Inconsistencias menores o errores visuales       | Corrección opcional        |

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/pablopenaheredia/OrangeHRM-Demo.git
cd OrangeHRM-Demo
```

Instalar dependencias:
Con npm:

```bash
npm install
```

O con pnpm:

```bash
pnpm install
```

Configurar variables de entorno (opcional):

Si es necesario, crea un archivo .env en la raíz del proyecto para configurar parámetros como la URL del sitio, credenciales, etc.

## Ejecución de Pruebas

Para ejecutar todas las pruebas:

```bash
npx playwright test
```

Para ver la ejecución en modo visual (headful):

```bash
npx playwright test --headed
```

Los reportes de ejecución se generan en las carpetas:

- `allure-results` - Reportes con métricas y detalles de ejecución de pruebas
- `test-html-report` - Informes visuales en formato web para revisión manual
- `test-junit-report` - Reportes estándar compatibles con herramientas de integración continua

## Estructura del Proyecto

```text
Proyecto OrangeHRM
├── tests/                           # Casos de prueba automatizados
│   ├── admin.spec.ts                # Pruebas del módulo Admin
│   ├── employee.spec.ts             # Pruebas del módulo PIM (Empleados)
│   ├── login.spec.ts                # Pruebas de inicio de sesión
│   └── dashboard.spec.ts            # Pruebas del panel principal
│
├── pageobjectsmodels/               # Implementación del patrón Page Object
│   ├── AdminPage.ts                 # Página de administración
│   ├── EmployeePage.ts              # Página de empleados
│   ├── LoginPage.ts                 # Página de inicio de sesión
│   └── DashboardPage.ts             # Página del panel principal
│
├── .env                             # Variables de entorno (configurables)
├── playwright.config.ts             # Configuración de Playwright
├── package.json                     # Configuración del proyecto y scripts
├── tsconfig.json                    # Configuración de TypeScript
└── README.md                        # Documentación del proyecto
```

## Documentación y Recursos

### Plan de Pruebas

Consulta la documentación completa en Notion:

- [Introducción, Alcance y Estrategia](https://www.notion.so/Plan-de-Pruebas-1ac16a0f8f8c80a2ae85c4e2c39457e7)

### Recursos de Playwright y TypeScript

- [Documentación de Playwright](https://playwright.dev/docs/intro)
- [Guía de TypeScript](https://www.typescriptlang.org/docs/)

## Próximos Pasos

- Integración con CI/CD
 Ampliar cobertura de pruebas

## Contacto

- [![GitHub](https://img.shields.io/badge/GitHub-pablopenaheredia-181717?style=flat&logo=github)](https://github.com/pablopenaheredia)
- [![LinkedIn](https://img.shields.io/badge/LinkedIn-pablopenah-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/pablopenah/)
- [![Email](https://img.shields.io/badge/Email-pablopenaheredia@gmail.com-D14836?style=flat&logo=gmail)](mailto:pablopenaheredia@gmail.com)
