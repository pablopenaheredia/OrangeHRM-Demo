import type { Page, Locator } from '@playwright/test';

export class LeavePage {
    readonly page: Page;
    readonly assignLeaveBtn: Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.assignLeaveBtn = page.getByRole('link', { name: 'Assign Leave' });
        
    }
}