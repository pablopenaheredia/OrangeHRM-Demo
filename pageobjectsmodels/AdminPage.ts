import { type Page, type Locator, expect } from '@playwright/test';
import { EmployeePage, EmployeeData } from './EmployeePage';
import { stat } from 'fs';

export class LeavePage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly userRoleDropdown: Locator;
    readonly employeeNameInput: Locator;
    readonly statusDropdown: Locator;
    readonly searchBtn: Locator;
    readonly addBtn: Locator
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly saveBtn: Locator;
    readonly adminModuleBtn: Locator;
    readonly idColumnValues = (username: string) => this.page.getByRole('cell', { name: username }).first();

    
    constructor(page: Page) {
        this.page = page;
        this.addBtn = page.getByRole('button', { name: 'Add' });
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.employeeNameInput = page.getByRole('textbox', { name: 'Employee Name' });
        this.userRoleDropdown = page.getByRole('combobox', { name: 'User Role' });
        this.statusDropdown = page.getByRole('combobox', { name: 'Status' });
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' });
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.adminModuleBtn = page.getByRole('link', { name: 'Admin' });
    }

    async goToAdminPage() {
            await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
            await this.adminModuleBtn.click();
            await this.page.waitForLoadState('domcontentloaded');
            await expect(this.page).toHaveURL(/admin\/viewSystemUsers/);
        }

    async addNewUserRole(username: string, userRole: string, employeeName: string, status: string, password: string) {
        await this.addBtn.click();
        await this.userRoleDropdown.selectOption({ label: userRole });
        await this.usernameInput.fill(username);
        await this.employeeNameInput.fill(employeeName);
        await this.statusDropdown.selectOption({ label: status });
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.saveBtn.click();
    }

    async searchUser(username: string, userRole: string, employeeName: string, status: string) {
        await this.usernameInput.fill(username);
        await this.userRoleDropdown.selectOption({ label: userRole });
        await this.employeeNameInput.fill(employeeName);
        await this.statusDropdown.selectOption({ label: status });
        await this.searchBtn.click();
    }

    async fillUserNameInput(username: string) {
        await this.usernameInput.fill(username);
    }
    async chooseUserRole(userRole: 'Admin' | 'ESS') {
        await this.userRoleDropdown.selectOption({ label: userRole });
    }
    async fillSystemUserForm(username: string) {
        await this.fillUserNameInput(username);
        await this.userRoleDropdown.selectOption({ label: 'Admin' });
    }

    async chooseStatus(status: 'Enabled' | 'Disabled') {
        await this.statusDropdown.selectOption({ label: status });
    }

    async verifyUserRole(EmployeeData: string, userName: string, userRole: 'Admin' | 'ESS', status: 'Enabled' | 'Disabled') {
        await this.goToAdminPage();
        await this.usernameInput.fill(userName);
        await this.chooseUserRole(userRole);
        await this.employeeNameInput.fill(EmployeeData);
        await this.chooseStatus(status);
        await this.searchBtn.click();
        const locator = this.idColumnValues(this.employeeNameInput);
        await locator.waitFor({ timeout: 3000 });
    }
}