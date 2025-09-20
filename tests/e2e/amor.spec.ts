import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { CategoriaPage } from '../../pages/categoria.page';
import { ProductoPage } from '../../pages/producto.page';
import { CarritoPage } from '../../pages/carrito.page';

test('Escenario 1: agregar 2 productos Amor al carrito', async ({ page }) => {
    const home = new HomePage(page);
    const categoria = new CategoriaPage(page);
    const producto = new ProductoPage(page);
    const carrito = new CarritoPage(page);

    // Ir al home
    await page.goto('https://www.floristeriamundoflor.com');

    // Ir a categoría Amor
    await home.irACategoriaAmor();

    // Esperar que los productos estén visibles
    await categoria.productos.first().waitFor({ state: 'visible' });

    // --- Primer producto ---
    const nombre1 = await categoria.obtenerNombreProducto(0);
    const precio1 = await categoria.obtenerPrecioProducto(0);
    await categoria.seleccionarProductoPorIndice(0);
    // Esperar que al hacer clic en “Agregar al carrito” la página del carrito cargue
    await Promise.all([
        producto.agregarAlCarrito(),
        page.waitForURL('https://www.floristeriamundoflor.com/carrito/'), // espera que cargue la URL del carrito
    ]);

// Validar que la página cargó correctamente y tiene al menos 1 item
    await expect(page).toHaveURL(/\/carrito\/$/);
    await carrito.items.first().waitFor({ state: 'visible' });

    // Volver a categoría Amor
    await page.goto('https://www.floristeriamundoflor.com/product-category/amor/');
    await categoria.productos.first().waitFor({ state: 'visible' });

    // --- Segundo producto ---
    const nombre2 = await categoria.obtenerNombreProducto(1);
    const precio2 = await categoria.obtenerPrecioProducto(1);
    await categoria.seleccionarProductoPorIndice(1);
    await producto.agregarAlCarrito();

    // --- Validaciones ---
    await carrito.validarCantidadItems(2);

    const nombreItem1 = await carrito.obtenerNombreItem(0);
    const precioItem1 = await carrito.obtenerPrecioItem(0);
    const nombreItem2 = await carrito.obtenerNombreItem(1);
    const precioItem2 = await carrito.obtenerPrecioItem(1);

    expect(nombreItem1?.trim()).toBe(nombre1?.trim());
    expect(precioItem1).toBeCloseTo(precio1 || 0, 0);
    expect(nombreItem2?.trim()).toBe(nombre2?.trim());
    expect(precioItem2).toBeCloseTo(precio2 || 0, 0);

    const subtotalTotal = await carrito.obtenerSubtotalTotal();
    expect(subtotalTotal).toBeCloseTo((precio1 || 0) + (precio2 || 0), 0);

    await carrito.items.first().waitFor({ state: 'visible' });
    await page.waitForLoadState('networkidle');

    await test.info().attach('Carrito validado', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });
});

