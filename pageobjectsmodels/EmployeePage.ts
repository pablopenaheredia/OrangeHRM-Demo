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
        await expect(this.page).toHaveURL(/pim\/addEmployee/);
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

    async checkEmployeeIsAdded(firstName: string, lastName: string, employeeID: string): Promise<boolean> {
        // Navegar a la lista de empleados
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
        await this.page.waitForLoadState('domcontentloaded');

        // Buscar la fila del empleado usando el ID
        const employeeRow = this.page.locator(`div.oxd-table-row:has-text("${employeeID}")`);

        const isRowVisible = await employeeRow.isVisible();
        if (!isRowVisible) {
            return false; // Retorna false si la fila no está visible
        }
        const rowText = await employeeRow.textContent();
        // Verificar si el texto de la fila contiene el nombre, apellido e ID
        const containsFirstName = rowText?.includes(firstName) || false;
        const containsLastName = rowText?.includes(lastName) || false;
        const containsEmployeeID = rowText?.includes(employeeID) || false;

        // Verificar todas las condiciones juntas
        const isEmployeeAdded = isRowVisible && containsFirstName && containsLastName && containsEmployeeID;
        return isEmployeeAdded;
    }
}