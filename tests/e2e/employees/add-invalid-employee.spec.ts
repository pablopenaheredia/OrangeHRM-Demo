import { expect, test } from '../../fixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login();
});

test.describe('[US02] Gestión de empleados | Agregar empleados incorrectamente', () => {

    test('Validar agregar un empleado sin nombre', async ({ employeePage }) => {
        const uniqueID = await employeePage.generateUniqueID();
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Cuando el usuario navega a la página de empleados', async () => {
            await employeePage.clickOnPIMModule();
        });
        await test.step('Y se dirige hacia la sección de agregar empleados', async () => {
            await employeePage.goToAddEmployeePage();
        });
        await test.step('Y el usuario llena los campos requeridos sin nombre', async () => {
            await employeePage.fillAddEmployee("", 'Doe', uniqueID);
        });
        await test.step('Y el usuario guarda al empleado', async () => {
            await employeePage.saveClick();
        });
        await test.step('Entonces se muestra un mensaje de error', async () => {
            await employeePage.page.waitForSelector("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]");
            await expect(employeePage.page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]")).toHaveText('Required');
        });
        await test.step('Entonces el empleado no se encuentra en la lista de empleados', async () => {
            await expect.soft(employeePage.idColumnValues(uniqueID)).toBeHidden();
        });
    });

    test('Validar agregar un empleado sin apellido', async ({ employeePage }) => {
        const uniqueID = await employeePage.generateUniqueID();
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Cuando el usuario navega a la página de empleados', async () => {
            await employeePage.clickOnPIMModule();
        });
        await test.step('Y se dirige hacia la sección de agregar empleados', async () => {
            await employeePage.goToAddEmployeePage();
        });
        await test.step('Y el usuario llena los campos requeridos sin apellido', async () => {
            await employeePage.fillAddEmployee("John", '', uniqueID);
        });
        await test.step('Y el usuario guarda al empleado', async () => {
            await employeePage.saveClick();
        });
        await test.step('Entonces se muestra un mensaje de error', async () => {
            await employeePage.page.waitForSelector("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]");
            await expect(employeePage.page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]")).toHaveText('Required');
        });
        await test.step('Entonces el empleado no se encuentra en la lista de empleados', async () => {
            await expect.soft(employeePage.idColumnValues(uniqueID)).toBeHidden();
        });
    });

    test('Validar agregar un empleado sin ID', async ({ employeePage }) => {
        
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Cuando el usuario navega a la página de empleados', async () => {
            await employeePage.clickOnPIMModule();
        });
        await test.step('Y se dirige hacia la sección de agregar empleados', async () => {
            await employeePage.goToAddEmployeePage();
        });
        await test.step('Y el usuario llena los campos requeridos sin ID', async () => {
            await employeePage.fillAddEmployee("John", 'Doe', '');
        });
        await test.step('Y el usuario guarda al empleado', async () => {
            await employeePage.saveClick();
        });
        await test.step('Entonces se muestra un mensaje de error', async () => {
            await employeePage.page.waitForSelector("//span[text()='Required']");
            await expect(employeePage.page.locator("//span[text()='Required']")).toHaveText('Required');
        });
        await test.step('Entonces el empleado no se encuentra en la lista de empleados', async () => {
            await expect.soft(employeePage.lastNameValues('')).toBeVisible();
        });
    });

    test('Validar agregar un empleado con ID duplicado', async ({ employeePage }) => {
        const uniqueID = await employeePage.generateUniqueID();
        await test.step('Dado que el usuario se encuenrta en la pagina de inicio de sesión', async () => { });
        await test.step('Cuando el usuario navega a la página de empleados', async () => {
            await employeePage.clickOnPIMModule();
        });
           await test.step('Y se dirige hacia la sección de agregar empleados', async () => {
        await employeePage.goToAddEmployeePage();
        });
        await test.step('Y el usuario llena los campos requeridos', async () => {
            await employeePage.fillAddEmployee("Pa", "blo", uniqueID);
        });
        await test.step('Y el usuario guarda al empleado', async () => {
            await employeePage.saveClick();
        });

        await test.step('Y el usuario busca al empleado por su ID', async () => {
            await employeePage.clickOnPIMModule();
            await employeePage.fillEmployeeInfoIDInput(uniqueID);
            await employeePage.searchClick();
        });
        await test.step('Entonces el empleado se encuentra en la lista de empleados', async () => {
            await expect.soft(employeePage.idColumnValues(uniqueID)).toBeVisible();
        });
        await test.step('Entonces el usuario navega a la página de empleados nuevamente', async () => {
            await employeePage.clickOnPIMModule();
        });
        await test.step('Y el usuario se dirige hacia la sección de agregar empleados nuevamente', async () => {
            await employeePage.goToAddEmployeePage();
        });
        await test.step('Y el usuario llena los campos requeridos con el mismo ID', async () => {
            await employeePage.fillAddEmployee("Adam", 'Smith', uniqueID);
        });
        await test.step('Y el usuario intenta guardar al empleado', async () => {
            await employeePage.saveClick();
        });
        await test.step('Entonces se muestra un mensaje de error', async () => {
            await employeePage.page.waitForSelector("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]");
            await expect(employeePage.page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]")).toBeVisible();
        });
    await test.step('Entonces el empleado no se encuentra en la lista de empleados', async () => {
        await expect.soft(employeePage.idColumnValues(uniqueID)).toBeHidden();
    });
    });

    test('Validar error al ingresar un empleado con numeros o simbolos para el sector nombre y apellido, y letras para el sector ID.', async ({ employeePage }) => {
        const stringID = 'IDNumber';
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Cuando el usuario navega a la página de empleados', async () => {
            await employeePage.clickOnPIMModule();
        });
        await test.step('Y se dirige hacia la sección de agregar empleados', async () => {
            await employeePage.goToAddEmployeePage();
        });
        await test.step('Y el usuario no llena ningun campo requerido', async () => {
            await employeePage.fillAddEmployee('124%6/', '124%6/', stringID);
        });
        await test.step('Y el usuario guarda al empleado', async () => {
            await employeePage.saveClick();
        });
        await test.step('Entonces se muestra un mensaje de error encima del InputFirstName', async () => {
            await employeePage.page.waitForSelector("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]");
            await expect.soft(employeePage.page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]")).toHaveText('Only letters are allowed');
        });
        await test.step('Y se muestra un mensaje de error encima del InputLastName', async () => {
            await employeePage.page.waitForSelector("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[2]");
            await expect.soft(employeePage.page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[2]")).toHaveText('Only letters are allowed');
        });
        await test.step('Y se muestra un mensaje de error encima del InputID', async () => {
        await expect.soft(employeePage.page.getByText('Only numbers allowed')).toBeVisible({ timeout: 10000 });
        });
        await test.step('Entonces no se podra agregar el empleado', async () => {
            await expect.soft(employeePage.idColumnValues(stringID)).toBeHidden();
        });
    });
}); 
