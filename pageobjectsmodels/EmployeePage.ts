import { type Page, type Locator, expect } from '@playwright/test';

export class EmployeePage {
    readonly page: Page;
    readonly addEmployeeBtn: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIDInput: Locator;
    readonly saveBtn: Locator;
    readonly searchBtn: Locator;
    readonly pimModuleBtn: Locator;
    readonly employeeInfoIDInput: Locator;
    readonly idColumnValues = (id: string) => this.page.locator(`div.oxd-table-cell:has-text("${id}")`).first()
    readonly lastNameValues = (lastname: string) => this.page.locator(`div.oxd-table-cell:has-text("${lastname}")`).first()
    
    constructor(page: Page) {
        this.page = page;
        this.addEmployeeBtn = this.page.locator("//button[contains(.,'Add')]");
        this.firstNameInput = this.page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = this.page.getByRole('textbox', { name: 'Last Name' });
        this.employeeIDInput = this.page.locator("(//input[@class='oxd-input oxd-input--active'])[2]");
        this.saveBtn = this.page.getByRole('button', { name: 'Save' });
        this.searchBtn = this.page.getByRole('button', { name: 'Search' });
        this.pimModuleBtn = this.page.getByRole('link', { name: 'PIM' });
        this.employeeInfoIDInput = this.page.getByRole('textbox').nth(2);
    }

    async goToAddEmployeePage() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
        await this.addEmployeeBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(/pim\/addEmployee/);
    }

    async fillAddEmployee(firstName: string, lastName: string, employeeID: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.employeeIDInput.fill(employeeID);
    }

    async searchClick() {
        await this.searchBtn.click();
    }

    async fillEmployeeInfoIDInput(id: string) {
        await this.employeeInfoIDInput.fill(id);
    }
    async saveClick() {
        await this.saveBtn.click();
    }
    async clickOnPIMModule() {
        await this.pimModuleBtn.click();
    }

    /*async checkEmployeeIsAdded(firstName: string, lastName: string, employeeID: string): Promise<boolean> {
        // Navegar a la lista de empleados
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
        // Esperar a que la tabla se muestre (usamos waitForSelector para el contenedor)
        await this.page.waitForSelector('div.oxd-table-body', { timeout: 15000 });

        // Obtenemos el locator de todas las filas de la tabla
        const rows = this.page.locator('div.oxd-table-body div.oxd-table-row');
        const count = await rows.count();

        // Recorremos cada fila y verificamos si contiene los valores esperados
        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const rowText = await row.textContent();
            if (rowText) {
                // Convertimos el texto y los parámetros a minúsculas para comparar sin importar mayúsculas/minúsculas
                const normalizedRow = rowText.toLowerCase();
                const normFirstName = firstName.toLowerCase();
                const normLastName = lastName.toLowerCase();
                const normEmployeeID = employeeID.toLowerCase();

                // Si la fila contiene los tres valores, retornamos true
                if (normalizedRow.includes(normEmployeeID) &&
                    normalizedRow.includes(normFirstName) &&
                    normalizedRow.includes(normLastName)) {
                    return true;
                }
            }
        }
        // Si ninguna fila cumple la condición, retornamos false
        return false;
    }*/

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
            uniqueID = Math.floor(Math.random() * (1000 - 1 + 1) + 1).toString();
            isUnique = await this.isUniqueID(uniqueID);
        }
        return uniqueID;
    }
}
