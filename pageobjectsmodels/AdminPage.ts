import { type Page, type Locator, expect } from '@playwright/test';

export class AdminPage {
    readonly page: Page;
    readonly userRoleDropdown: Locator;
    readonly userRoleOptions = (role: string) => this.page.getByRole('option', { name: role });
    readonly employeeNameInput: Locator;
    readonly employeeNameSelect = (name: string) => this.page.getByRole('cell', { name: name }).first();
    readonly statusDropdown: Locator;
    readonly userStatusOptions = (status: string) => this.page.getByRole('option', { name: status });
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly searchBtn: Locator;
    readonly addBtn: Locator
    readonly chooseStatusDropdown: Locator
    readonly saveBtn: Locator;
    readonly adminModuleBtn: Locator;
    readonly logOutBtn: Locator
    readonly userProfileBtn: Locator;
    readonly requiredError: Locator;
    readonly passwordNotMatch: Locator;
    readonly userNameAlreadyExists: Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.userRoleDropdown = page.locator("(//div[@class='oxd-select-text-input'])[1]");
        this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints' });
        this.statusDropdown = page.getByRole('combobox', { name: 'Status' });
        this.usernameInput = page.locator("(//input[@class='oxd-input oxd-input--active'])[2]")
        this.passwordInput = page.locator("(//input[@type='password'])[1]");
        this.confirmPasswordInput = page.locator("(//input[@type='password'])[2]");
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.addBtn = page.getByRole('button', { name: 'Add' });
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.chooseStatusDropdown = page.locator("(//div[@class='oxd-select-text-input'])[2]");
        this.adminModuleBtn = page.getByRole('link', { name: 'Admin' });
        this.logOutBtn = page.getByRole('button', { name: 'Logout' });
        this.userProfileBtn = page.locator('oxd-userdropdown-tab');
        this.requiredError = this.page.locator("//span[text()='Required']");
        this.passwordNotMatch = this.page.locator("//span[text()='Passwords do not match']");
        this.userNameAlreadyExists = this.page.locator("//span[text()='Already exists']");
    }

    async goToAdminPage() {
            await this.adminModuleBtn.click();
            await this.page.waitForLoadState('domcontentloaded');
            await expect(this.page).toHaveURL(/admin\/viewSystemUsers/);
        }

    async addNewUserRole(username: string, userRole: string, employeeName: string, status: string, password: string, confirmpassword: string) {
        await this.goToAdminPage();
        await this.addBtn.click();

        await this.userRoleDropdown.click();
        await this.userRoleOptions(userRole).click();

        await this.employeeNameInput.fill(employeeName);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');

        await this.chooseStatusDropdown.click();
        await this.userStatusOptions(status).click();

        await this.usernameInput.fill(username);

        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmpassword);

        await this.saveBtn.click();
    }

    async searchUser(username: string, userRole: string, employeeName: string, status: string) {
        await this.usernameInput.fill(username);
        await this.userRoleDropdown.selectOption({ label: userRole });
        await this.employeeNameInput.fill(employeeName);
        await this.statusDropdown.selectOption({ label: status });
        await this.searchBtn.click();
    }

    async fillEmployeeNameInput(username: string) {
        await this.usernameInput.fill(username);
        const responsePromiseSearchUserName = this.page.waitForResponse(response =>
                response.url().includes('/api/v2/pim/employees') &&
                response.url().includes('/personal-details') &&
                response.status() === 200 &&
                response.request().method() === 'GET'
        );
        await this.usernameInput.selectOption({ label: username });
        await responsePromiseSearchUserName;
    }

    async chooseUserRole(userRole: 'Admin' | 'ESS') {
        await this.userRoleDropdown.click();
        await this.userRoleOptions(userRole).click();
    }

    async fillSystemUserForm(username: string, employeeName: string) {
        await this.fillEmployeeNameInput(username);
        await this.userRoleDropdown.selectOption({ label: 'Admin' });
        await this.employeeNameInput.fill(employeeName);
        await this.chooseStatus('Enabled');
    }

    async chooseStatus(status: string) {
        await this.statusDropdown.selectOption({ label: status });
    }

    async verifyUserRole(employeeName: string, userName: string, userRole: 'Admin' | 'ESS', status: 'Enabled' | 'Disabled') {
        await this.goToAdminPage();
        await this.usernameInput.fill(userName);
        await this.userRoleDropdown.click();
        await this.userRoleOptions(userRole).click();
        await this.employeeNameInput.fill(employeeName);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.chooseStatusDropdown.click();
        await this.userStatusOptions(status).click();
        const responsePromiseSearchUserRole = this.page.waitForResponse(response =>
                response.url().includes('/api/v2/admin/') &&
                response.status() === 200 &&
                response.request().method() === 'GET'
            );
        await this.searchBtn.click();
        await responsePromiseSearchUserRole;  
        const locator = this.employeeNameSelect(employeeName);
        await locator.waitFor({ state: 'visible', timeout: 6000 });
    }

    async logOut() {
        await this.userProfileBtn.click();
        await this.logOutBtn.click();
        await expect(this.page).toHaveURL(/auth\/login/);
    }
}