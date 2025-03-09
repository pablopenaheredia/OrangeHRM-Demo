import type { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("input[name='username']");
        this.passwordInput = page.locator("input[type='password']");
        this.loginBtn = page.locator("button[type='submit']");
    }
    
    async goToLoginPage() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    getCredentials() {
        const username = process.env.USER;
        const password = process.env.PASSWORD;
        if (!username || !password) {
            throw new Error('Missing credentials in environment variables');
        }
        return { username, password };
    }
    /** 
    *@param {string} [username=process.env.USER]
    *@param {string} [password=process.env.PASSWORD] 
**/
    async login(username: string = process.env.USER || '', password = process.env.PASSWORD || '') {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
    async loginBtnDisabled(): Promise<boolean> {
        return this.loginBtn.isDisabled();
    }
}
