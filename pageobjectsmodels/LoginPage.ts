import type { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;
    readonly sideMenu: Locator;
    readonly invalidCredentialsError: Locator;
    readonly requiredError: Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'LOGIN' });
        this.sideMenu = page.getByRole('link', { name: 'banner' });
        this.invalidCredentialsError = page.getByRole('alert', { name: 'Invalid credentials' });
        this.requiredError = page.getByRole('alert', { name: 'Required' });
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
