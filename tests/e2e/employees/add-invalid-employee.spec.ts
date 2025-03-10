import { expect, test } from '../../fixtures';

test.describe('[US02] Gestión de empleados | Agregar empleados incorrectamente', () => {

    test('Validar agregar un empleado sin nombre', async ({ loginPage, employeePage }) => {

        await loginPage.goToLoginPage();
        await loginPage.login();
        await employeePage.goToAddEmployeePage();
        await employeePage.fillAddEmployee("", 'Doe', '12345');
        await employeePage.saveClick();
        await employeePage.page.waitForSelector("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]");
        await expect(employeePage.page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]")).toHaveText('Required');
        await employeePage.goToAddEmployeePage();
        await employeePage.checkEmployeeIsAdded("", 'Doe', '12345') === false;
    });

    test('Validar agregar un empleado sin apellido', async ({ loginPage, employeePage }) => {

        await loginPage.goToLoginPage();
        await loginPage.login();
        await employeePage.goToAddEmployeePage();
        await employeePage.fillAddEmployee("John", '', '12345');
        await employeePage.saveClick();
        await employeePage.page.waitForSelector("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]");
        await expect(employeePage.page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]")).toHaveText('Required');
        await employeePage.goToAddEmployeePage();
        await employeePage.checkEmployeeIsAdded("John", '', '12345') === false;
    });

    test('Validar agregar un empleado sin ID', async ({ loginPage, employeePage }) => {

        await loginPage.goToLoginPage();
        await loginPage.login();
        await employeePage.goToAddEmployeePage();
        await employeePage.fillAddEmployee("John", 'Doe', '');
        await employeePage.saveClick();
        await employeePage.page.waitForSelector("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]");
        await expect(employeePage.page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]")).toHaveText('Required');
        await employeePage.goToAddEmployeePage();
        await employeePage.checkEmployeeIsAdded("John", 'Doe', '') === false;
    });

    test('Validar agregar un empleado sin nombre, apellido e ID', async ({ loginPage, employeePage }) => {

        await loginPage.goToLoginPage();
        await loginPage.login();
        await employeePage.goToAddEmployeePage();
        await employeePage.fillAddEmployee("", '', '');
        await employeePage.saveClick();
        await employeePage.page.waitForSelector("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]");
        await expect(employeePage.page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]")).toHaveText('Required');
        await employeePage.goToAddEmployeePage();
        await employeePage.checkEmployeeIsAdded("", '', '') === false;
    });

    test('Validar agregar un empleado con un ID existente', async ({ loginPage, employeePage }) => {

        await loginPage.goToLoginPage();
        await loginPage.login();
        await employeePage.goToAddEmployeePage();
        await employeePage.fillAddEmployee("John", 'Doe', '12345');
        await employeePage.saveClick();
        await employeePage.page.waitForSelector("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]");
        await expect(employeePage.page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]")).toHaveText('Already exists');
        await employeePage.goToAddEmployeePage();
        await employeePage.checkEmployeeIsAdded("John", 'Doe', '12345') === false;
    });
});