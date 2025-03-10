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

    /*async checkEmployeeIsAdded(firstName: string, lastName: string, id: string): Promise<boolean> {
        // Navegar a la lista de empleados
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.locator('div.oxd-table-body').waitFor({ state: 'visible', timeout: 15000 });

        // Buscar la fila del empleado usando el ID
        const employeeRow = this.page.locator(`div.oxd-table-row:has-text("${id}")`);

        const isRowVisible = await employeeRow.isVisible();
        if (!isRowVisible) {
            return false; // Retorna false si la fila no está visible
        }

        // obtener fila del empleado
        const employeeRowText = await employeeRow.textContent();
        
        // Verificar si el texto de la fila contiene el nombre, apellido e ID
        const isNameVisible = employeeRowText?.includes(firstName) || false;
        const isLastNameVisible = employeeRowText?.includes(lastName) || false;
        const isIDVisible = employeeRowText?.includes(id) || false;

        // Verificar todas las condiciones juntas sean true
        return isNameVisible && isLastNameVisible && isIDVisible;
    }*/

async checkEmployeeIsAdded(firstName: string, lastName: string, employeeID: string): Promise<boolean> {
  // Navegar a la lista de empleados
  await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
  await this.page.waitForLoadState('domcontentloaded');

  // Esperar a que el contenedor de la tabla esté visible
  await this.page.waitForSelector('div.oxd-table-body', { timeout: 15000 });
  
  // Esperar unos segundos adicionales para que la tabla se actualice (si es necesario)
  await this.page.waitForTimeout(3000);

  // Obtener todas las filas de la tabla
  const rows = this.page.locator('div.oxd-table-body div.oxd-table-row');
  const count = await rows.count();
  console.log(`Se encontraron ${count} filas en la tabla`);

  // Recorrer cada fila y mostrar su contenido para depuración
  for (let i = 0; i < count; i++) {
    const row = rows.nth(i);
    const text = await row.textContent();
    console.log(`Fila ${i}: ${text}`);
    if (text) {
      // Normalizamos el texto de la fila y los valores esperados
      const normalizedText = text.toLowerCase().trim();
      const normFirstName = firstName.toLowerCase().trim();
      const normLastName = lastName.toLowerCase().trim();
      const normEmployeeID = employeeID.toLowerCase().trim();

      // Si la fila contiene los tres valores, retornamos true
      if (normalizedText.includes(normEmployeeID) &&
          normalizedText.includes(normFirstName) &&
          normalizedText.includes(normLastName)) {
        return true;
      }
    }
  }
  // Si ninguna fila cumple con la condición, retornamos false
  return false;
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
            uniqueID = Math.floor(Math.random() * (1000 - 1 + 1) + 1).toString();
            isUnique = await this.isUniqueID(uniqueID);
        }
        return uniqueID;
    }
}