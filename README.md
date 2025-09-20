Proyecto Automatización E2E - Floristería Mundo Flor

Este proyecto contiene pruebas end-to-end (E2E) para la tienda Mundo Flor, implementadas con Playwright siguiendo el patrón Page Object Model (POM).

* Tecnologías utilizadas

Node.js y Playwright para pruebas E2E.

TypeScript para tipado seguro.

Page Object Model (POM) para organizar las páginas:

HomePage

CategoriaPage

ProductoPage

CarritoPage

Expect de Playwright para validaciones y esperas explícitas.

Capturas de pantalla adjuntadas a los reportes de cada test.

* Estructura del proyecto
/tests
/e2e
amor.spec.ts
/pages
HomePage.ts
CategoriaPage.ts
ProductoPage.ts
CarritoPage.ts
playwright.config.ts
package.json
tsconfig.json
README.md

* Flujo del test principal

Ir a la página principal (HomePage).

Navegar a la categoría “Amor”.

Seleccionar los primeros 2 productos.

Agregar al carrito.

Validar cantidad de items, nombres, precios y subtotal.

Captura de pantalla del carrito validado.

Retos extra implementados

Reporte avanzado

Habilitación de traces y videos on-failure.

Uso de test.info().attach para adjuntar capturas de pantalla clave durante el test.

Cómo ejecutar los tests

Instalar dependencias:

npm install


Ejecutar todos los tests:

npx playwright test


Ejecutar un test específico:

npx playwright test tests/e2e/amor.spec.ts


Abrir el reporte de Playwright:

npx playwright show-report

Buenas prácticas implementadas

POM claro y mantenible.

Selectores resilientes usando getByRole, getByText o atributos title.

Esperas explícitas usando expect(...).toBeVisible() y expect(...).toHaveCount().

Capturas de pantalla

Reintentos controlados para tests sensibles a carga lenta.
