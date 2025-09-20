import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly categoriaAmor: Locator;
    readonly categoriaCumpleanos: Locator; // <-- nueva categoría

    constructor(page: Page) {
        this.page = page;
        // Limitamos el scope para evitar duplicados
        this.categoriaAmor = page.locator('#primary-menu').getByRole('link', { name: 'Amor' });
        this.categoriaCumpleanos = page.locator('#primary-menu').getByRole('link', { name: 'Cumpleaños' }); // <-- selector Cumpleaños
    }

    async irACategoriaAmor() {
        await expect(this.categoriaAmor).toBeVisible();
        await this.categoriaAmor.click();
    }

    async irACategoriaCumpleanos() {
        await expect(this.categoriaCumpleanos).toBeVisible();
        await this.categoriaCumpleanos.click();
    }
}



