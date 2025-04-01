import { type Page, type Locator, expect } from '@playwright/test';

type UserRoleOptions = 'Admin' | 'ESS' | 'SelectOption' | 'NoChange';
type UserStatusOptions = 'Enabled' | 'Disabled' | 'SelectOption' | 'NoChange';


export class AdminPage {
    readonly page: Page;
    readonly userRoleDropdown: Locator;
    readonly userRoleOptions = (role: string) => this.page.getByRole('option', { name: role });
    readonly employeeNameInput: Locator;
    readonly employeeUserNameSelect = (name: string) => this.page.getByRole('cell', { name: name }).first();
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
    readonly passwordLengthError: Locator;
    readonly passwordNumberError: Locator;
    readonly passwordDoNotMatchError: Locator;
    readonly userNameMinCharacters: Locator;
    readonly deleteTableBtn: Locator;
    readonly deleteConfirmBtn: Locator;
    readonly editTableBtn: Locator;
    readonly passwordCheckbox: Locator;
    readonly selectInvalidOptionInDropdown : Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.userRoleDropdown = page.locator('.oxd-select-text').first();
        this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints' });
        this.usernameInput = page.locator("(//label[normalize-space(text())='Username']/following::input)[1]")
        this.passwordInput = page.locator("(//input[@type='password'])[1]");
        this.confirmPasswordInput = page.locator("(//input[@type='password'])[2]");
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.addBtn = page.getByRole('button', { name: 'Add' });
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.chooseStatusDropdown = page.locator("(//div[@class='oxd-select-text-input'])[2]");
        this.adminModuleBtn = page.getByRole('link', { name: 'Admin' });
        this.logOutBtn = page.getByRole('button', { name: 'Logout' });
        this.userProfileBtn = page.locator('.oxd-userdropdown-tab');
        this.requiredError = this.page.getByText('Required', { exact: true });
        this.passwordNotMatch = this.page.getByText('Passwords do not match');
        this.userNameAlreadyExists = this.page.getByText('Already exists');
        this.passwordLengthError = this.page.getByText("Should have at least 7")
        this.passwordNumberError = this.page.getByText('Your password must contain minimum 1 number');
        this.passwordDoNotMatchError = this.page.getByText('Passwords do not match')
        this.deleteTableBtn = this.page.locator("//div[@class='oxd-table-cell-actions']//button[1]");
        this.deleteConfirmBtn = this.page.getByRole('button', { name: 'Yes, Delete' });
        this.editTableBtn = this.page.locator("//div[@class='oxd-table-cell-actions']//button[2]");
        this.userNameMinCharacters = this.page.getByText('Should be at least 5 characters');
        this.passwordCheckbox = this.page.locator('label').filter({ hasText: 'Yes' }).locator('i')
        this.selectInvalidOptionInDropdown = this.page.getByText('-- Select --');
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
        await this.page.waitForTimeout(3000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');

        await this.chooseStatusDropdown.click();
        await this.userStatusOptions(status).click();

        await this.usernameInput.fill(username);

        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmpassword);
    
        await this.saveBtn.click();
        
    }

    async searchUserClick() {
        await this.searchBtn.click();
    }

    async fillUserNameInput(username: string) {
        await this.usernameInput.fill(username);
    }

    async chooseUserRole(userRole: UserRoleOptions) {
        await this.userRoleDropdown.click();
        if (userRole === "SelectOption") {
            
            await this.selectInvalidOptionInDropdown.click();
        }
        else {
            await this.userRoleOptions(userRole).click();
        }
    }

    async chooseStatus(status: UserStatusOptions) {
        await this.chooseStatusDropdown.click();
        if (status === "NoChange") return;
        if (status === "SelectOption") {
        await this.selectInvalidOptionInDropdown.click();
        }
        else {
        await this.userStatusOptions(status).click(); 
        }
        
    }

    async fillSystemUserForm(username: string, employeeName: string, status: 'Enabled' | 'Disabled', userRole: 'Admin' | 'ESS') {
        await this.fillUserNameInput(username);
        await this.chooseUserRole(userRole);
        await this.employeeNameInput.fill(employeeName);
        await this.page.waitForTimeout(3000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.chooseStatus(status);
    }


    async verifyUserRole(username: string) {
        await this.goToAdminPage();
        await this.fillUserNameInput(username);
        await this.page.waitForTimeout(3000);
        const responsePromiseSearchUserRole = this.page.waitForResponse(response =>
                response.url().includes('/api/v2/admin/') &&
                response.status() === 200 &&
                response.request().method() === 'GET'
            );
        await this.searchUserClick();
        await responsePromiseSearchUserRole;
        const locator = this.employeeUserNameSelect(username);
        await expect(locator).toBeVisible({ timeout: 6000 });
    }

    async logOut() {
        await this.userProfileBtn.click();
        await this.logOutBtn.click();
        await expect(this.page).toHaveURL(/auth\/login/);
    }
    async deletePermissons() {
        const responsePromiseDeleteEmployee = this.page.waitForResponse(response =>
                response.url().includes('/api/v2/admin/') &&
                response.status() === 200 &&
                response.request().method() === 'DELETE'
            );
        await this.deleteTableBtn.click();
        await this.deleteConfirmBtn.waitFor({ state: 'visible' });
        await this.deleteConfirmBtn.click();
        await responsePromiseDeleteEmployee;
    }

    async checkPasswordChange() {
        await this.passwordCheckbox.check();
    }

    async clickEditPermissonsIcon() {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        await this.editTableBtn.click();
    }

    async editPermissonsSuccess(username: string, userRole: "Admin" | "ESS", status: 'Enabled' | 'Disabled', password?: string, confirmpassword?: string) {

        await this.chooseUserRole(userRole);
        await this.chooseStatus(status);
        await this.fillUserNameInput('');
        await this.fillUserNameInput(username);

        //Si se desea cambiar pw
        const isPasswordChecked = await this.passwordCheckbox.isChecked();
        if (isPasswordChecked && password && confirmpassword) {
            await this.passwordInput.fill(password);
            await this.confirmPasswordInput.fill(confirmpassword);
            
        }
        /*const responsePromiseEditPermisson = this.page.waitForResponse(response =>
            response.url().includes('/api/v2/admin/users') &&
            response.status() === 200 &&
            response.request().method() === 'PUT'
        );*/
    await this.saveBtn.click();
    
    // Esperar por el toast de éxito o la desaparición del formulario
    await this.page.waitForSelector('.oxd-toast-container', { 
        state: 'visible', 
        timeout: 10000 
    }).catch(() => {});

    await this.page.waitForLoadState('networkidle');
}
    async editPermissonsUnsuccess(username: string,
        userRole: UserRoleOptions,
        status: UserStatusOptions,
        password?: string,
        confirmpassword?: string) {
        
        await this.chooseUserRole(userRole);
        await this.chooseStatus(status);
    
        await this.fillUserNameInput('');
        await this.fillUserNameInput(username);

        //Si se desea cambiar pw
        const isPasswordChecked = await this.passwordCheckbox.isChecked();
        if (isPasswordChecked && password && confirmpassword) {
            await this.passwordInput.fill(password);
            await this.confirmPasswordInput.fill(confirmpassword);
            
        }
        await this.saveBtn.click();;
    }
}