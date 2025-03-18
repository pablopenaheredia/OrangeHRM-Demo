import { type Page, type Locator, expect } from '@playwright/test';

export type EmployeeData = {
    firstName: string;
    lastName: string;
    employeeID: string;
};

export class EmployeePage {
    readonly page: Page;
    readonly addEmployeeBtn: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIDInput: Locator;
    readonly saveNewEmployeeBtn: Locator;
    readonly saveEditBtn: Locator;
    readonly searchBtn: Locator;
    readonly pimModuleBtn: Locator;
    readonly employeeInfoIDInput: Locator;

    readonly idColumnValues = (id: string) => this.page.getByRole('cell', { name: id }).first();
    //readonly idColumnValues = (id: string) => this.page.locator(`div.oxd-table-cell:has-text("${id}")`).first()
    readonly lastNameValues = (lastname: string) => this.page.locator(`div.oxd-table-cell:has-text("${lastname}")`).first()
    readonly editEmployeeInfoIconBtn: Locator
    readonly successPopUp: Locator
    
    constructor(page: Page) {
        this.page = page;
        this.addEmployeeBtn = this.page.locator("//button[contains(.,'Add')]");
        this.firstNameInput = this.page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = this.page.getByRole('textbox', { name: 'Last Name' });
        this.employeeIDInput = this.page.locator("(//input[@class='oxd-input oxd-input--active'])[2]");
        this.saveNewEmployeeBtn = this.page.getByRole('button', { name: 'Save' });
        this.saveEditBtn = this.page.locator("(//button[@type='submit'])[1]");
        this.searchBtn = this.page.getByRole('button', { name: 'Search' });
        this.pimModuleBtn = this.page.getByRole('link', { name: 'PIM' });
        this.employeeInfoIDInput = this.page.getByRole('textbox').nth(2);
        this.editEmployeeInfoIconBtn = this.page.locator("//div[@class='oxd-table-cell-actions']//button[1]");
        this.successPopUp = this.page.getByRole('alert', { name: 'Successfully Updated' });
    }

    async goToAddEmployeePage() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
        await this.addEmployeeBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(/pim\/addEmployee/);
    }

    async fillAddEmployee(employee: EmployeeData) {
        await this.firstNameInput.fill(employee.firstName);
        await this.lastNameInput.fill(employee.lastName);
        await this.employeeIDInput.fill(employee.employeeID);
    }

    async searchClick() {
        await this.searchBtn.click();
    }

    async fillEmployeeInfoIDInput(id: string) {
        await this.employeeInfoIDInput.fill(id);
    }
    async saveNewEmployeeClick() {
        await this.saveNewEmployeeBtn.click();
    }
    async saveEditEmployeeClick() {
        await this.saveEditBtn.click();
    }
    async clickOnPIMModule() {
        await this.pimModuleBtn.click();
    }

    async succeedPopUpVisible() {
        await this.successPopUp.isVisible();
    };

    async editEmployeeInfoIconClick() {
        await this.editEmployeeInfoIconBtn.click();
    }

    async isUniqueID(id: string): Promise<boolean> {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
        await this.page.waitForLoadState('domcontentloaded');

        const employeeRow = this.page.locator(`div.oxd-table-row:has-text("${id}")`);
        const isRowVisible = await employeeRow.isVisible();
        return !isRowVisible;
    }

    async generateUniqueID(): Promise<string> {
        let uniqueID: string = '';
        let isUnique: boolean = false;
        while (!isUnique) {
            uniqueID = Math.floor(Math.random() * (10000 - 1 + 1) + 1).toString();
            isUnique = await this.isUniqueID(uniqueID);
        }
        return uniqueID;
    }

    async addNewEmployee(employee: EmployeeData) {
        await this.clickOnPIMModule();
        await this.goToAddEmployeePage();
        await this.fillAddEmployee(employee);
        const responsePromiseAddEmployee = this.page.waitForResponse(response =>
            response.url().includes('/api/v2/pim/employees')
            && response.status() === 200
            && response.request().method() === 'POST');
        await this.saveNewEmployeeClick();
        await responsePromiseAddEmployee;
    }

    async verifyEmployeeInList(employeeID: string) {
        await this.clickOnPIMModule();
        await this.fillEmployeeInfoIDInput(employeeID);
        await this.searchClick();
        const locator = this.idColumnValues(employeeID);
        await locator.waitFor({ state: 'visible', timeout: 10000 });
    }

    /*async editEmployeeInfo(employee: EmployeeData) {
        const responsePromiseEditEmployee = this.page.waitForResponse(response =>
                response.url().includes('/api/v2/pim/employees') &&
                response.url().includes('/personal-details') &&
                response.status() === 200 &&
                response.request().method() === 'GET'
            );
        await this.editEmployeeInfoIconClick();
        await responsePromiseEditEmployee;
        await this.fillAddEmployee(employee);
        const responsePromiseSaveEditedEmployee = this.page.waitForResponse(response =>
                response.url().includes('/api/v2/pim/employees') &&
                response.url().includes('/personal-details') &&
                response.status() === 200 &&
                response.request().method() === 'PUT'
            );
            await this.saveEditEmployeeClick();
            await responsePromiseSaveEditedEmployee;
    }

    async verifyEmployeeEdited(employeeID: string) {
         await this.clickOnPIMModule();
        await this.fillEmployeeInfoIDInput(employeeID);
        await this.searchClick();
        const locator = this.idColumnValues(employeeID);
        await locator.waitFor({ timeout:
        3000 });
    }
*/
}