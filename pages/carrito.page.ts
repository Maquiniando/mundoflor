import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class CarritoPage {
    readonly page: Page;
    readonly items: Locator;
    readonly subtotal: Locator;

    constructor(page: Page) {
        this.page = page;
        // Locator más específico para evitar ambigüedad
        this.items = page.locator('table.shop_table.cart tbody tr.cart_item');
        this.subtotal = page.locator('td.product-subtotal span.woocommerce-Price-amount');
    }

    // Espera a que los items estén visibles antes de validar la cantidad
    async validarCantidadItems(cantidad: number) {
        await this.items.first().waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.items).toHaveCount(cantidad, { timeout: 10000 });
    }

    async obtenerNombreItem(indice: number) {
        return await this.items.nth(indice).locator('td.product-name a').textContent();
    }

    async obtenerPrecioItem(indice: number) {
        const text = await this.items.nth(indice).locator('td.product-price span.woocommerce-Price-amount').textContent();
        return parseFloat(text?.replace(/[^0-9,.]/g, '').replace(',', '.') || '0');
    }

    async obtenerSubtotalTotal() {
        const totales = await this.subtotal.allTextContents();
        return totales
            .map(t => parseFloat(t.replace(/[^0-9,.]/g, '').replace(',', '.') || '0'))
            .reduce((acc, val) => acc + val, 0);
    }

}



