import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class ProductoPage {
    readonly page: Page;
    readonly nombreProducto: Locator;
    readonly precioProducto: Locator;
    readonly botonAgregarCarrito: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nombreProducto = page.locator('h1.product_title');
        this.precioProducto = page.locator('span.woocommerce-Price-amount');
        this.botonAgregarCarrito = page.locator('button.single_add_to_cart_button');
    }

    async obtenerNombre() {
        return await this.nombreProducto.textContent();
    }

    async obtenerPrecio() {
        const text = await this.precioProducto.textContent();
        return parseFloat(text?.replace(/[^0-9,.]/g, '').replace(',', '.') || '0');
    }

    async agregarAlCarrito() {
        const productId = await this.botonAgregarCarrito.getAttribute('value');
        expect(productId).toBeDefined();

        await Promise.all([
            this.page.waitForResponse(resp =>
                resp.url().includes('add-to-cart') &&
                resp.status() >= 200 &&
                resp.status() < 300
            ),
            this.botonAgregarCarrito.click()
        ]);
    }
}
