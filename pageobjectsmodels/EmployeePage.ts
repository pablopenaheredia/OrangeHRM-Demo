import { type Page, type Locator, expect } from '@playwright/test';

export class EmployeePage {
    readonly page: Page;
    readonly addEmployeeBtn: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIDInput: Locator;
    readonly saveBtn: Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.addEmployeeBtn = this.page.locator("//button[contains(.,'Add')]");
        this.firstNameInput = this.page.locator("input[name='firstName']");
        this.lastNameInput = this.page.locator("input[name='lastName']");
        this.employeeIDInput = this.page.locator("(//label[normalize-space(text())='Employee Id']/following::input)[1]");
        this.saveBtn = this.page.locator("button[type='submit']");

    }
    
    async goToAddEmployeePage() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
        await this.addEmployeeBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page.url()).toContain('pim/addEmployee');
    }

    /*getCredentials() {
        const username = process.env.USER;
        const password = process.env.PASSWORD;
        if (!username || !password) {
            throw new Error('Missing credentials in environment variables');
        }
        return { username, password };
    }
    */

    async fillAddEmployee(firstName: string, lastName: string, employeeID: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.employeeIDInput.fill(employeeID);
    }

    async saveClick() {
    await this.saveBtn.click();
    }

    async checkEmployeeIsAdded(firstName: string, lastName: string, employeeID: string) {
        const firstNameRow = this.page.locator("(//div[contains(@class,'oxd-table-header-cell oxd-padding-cell')])[3]");
        const lastNameRow = this.page.locator("//div[text()='Last Name']");
        const employeeIDRow = this.page.locator("//div[text()='Id']");


        await expect(firstNameRow).toHaveText(firstName);
        await expect(lastNameRow).toHaveText(lastName);
        await expect(employeeIDRow).toHaveText(employeeID);
    
    }
}
