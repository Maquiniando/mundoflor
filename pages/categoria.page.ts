import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class CategoriaPage {
    readonly page: Page;
    readonly productos: Locator;

    constructor(page: Page) {
        this.page = page;
        // Cada producto está en un div.infor
        this.productos = page.locator('div.infor');
    }

    // Seleccionar producto por índice en la lista de productos
    async seleccionarProductoPorIndice(indice: number) {
        const producto = this.productos.nth(indice);
        await expect(producto).toBeVisible(); // espera explícita
        await producto.locator('h3.name a').click(); // clic en el nombre que abre el detalle
    }

    // Obtener nombre del producto por índice
    async obtenerNombreProducto(indice: number) {
        const producto = this.productos.nth(indice);
        return await producto.locator('h3.name a').textContent();
    }

    // Obtener precio del producto por índice
    async obtenerPrecioProducto(indice: number) {
        const producto = this.productos.nth(indice);
        const text = await producto.locator('span.woocommerce-Price-amount').textContent();
        return parseFloat(text?.replace(/[^0-9,.]/g, '').replace(',', '.') || '0');
    }
}




