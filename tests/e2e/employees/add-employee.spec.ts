import { expect, test } from '../../fixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login();
});

test.describe('[US02] Gestión de empleados | Agregar y validar empleados', () => {

    test('Escenario 1 | Validar agregar un empleado exitosamente', async ({ employeePage }) => {
        const uniqueID = await employeePage.generateUniqueID();
        await test.step('Dado que el usuario navega a la seccion de agregar empleados', async () => {
            await employeePage.clickOnPIMModule();
            await employeePage.goToAddEmployeePage();
        });

        await test.step('Y el usuario llena los campos y agrega al empleado', async () => {
            await employeePage.fillAddEmployee({
                firstName: "Sam",
                lastName: "Tarly",
                employeeID: uniqueID
            });
            const responsePromiseAddEmployee = employeePage.page.waitForResponse(response =>
                response.url().includes('/api/v2/pim/employees')
                && response.status() === 200
                && response.request().method() === 'POST'
            );
            await employeePage.saveNewEmployeeClick();
            await responsePromiseAddEmployee;
        });

        await test.step('Cuando el usuario busca al empleado por su ID', async () => {
            await employeePage.clickOnPIMModule();
            await employeePage.fillEmployeeInfoIDInput(uniqueID);
            await employeePage.searchClick();
        });

        await test.step('Entonces el empleado se encuentra en la lista de empleados', async () => {
            const locator = employeePage.idColumnValues(uniqueID);
            await locator.waitFor({ state: 'visible', timeout: 10000 });
        });
    });

    test('Escenario 2 | Validar agregar un empleado sin nombre', async ({ employeePage }) => {
        const uniqueID = await employeePage.generateUniqueID();
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });

        await test.step('Cuando el usuario navega a la página de empleados', async () => {
            await employeePage.clickOnPIMModule();
        });

        await test.step('Y se dirige hacia la sección de agregar empleados', async () => {
            await employeePage.goToAddEmployeePage();
        });

        await test.step('Y el usuario llena los campos requeridos sin nombre', async () => {
            await employeePage.fillAddEmployee({
                firstName: "",
                lastName: "Tarly",
                employeeID: uniqueID
            });
            await employeePage.saveNewEmployeeClick();

        });

        await test.step('Entonces se muestra un mensaje de error', async () => {
            await employeePage.requiredError.waitFor({ state: 'visible' });
        });

        await test.step('Entonces el empleado no se encuentra en la lista de empleados', async () => {
            await expect.soft(employeePage.idColumnValues(uniqueID)).toBeHidden();
        });
    });

    test('Escenario 3 | Validar agregar un empleado sin apellido', async ({ employeePage }) => {
        const uniqueID = await employeePage.generateUniqueID();
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });

        await test.step('Cuando el usuario navega a la página de empleados', async () => {
            await employeePage.clickOnPIMModule();
        });

        await test.step('Y se dirige hacia la sección de agregar empleados', async () => {
            await employeePage.goToAddEmployeePage();
        });

        await test.step('Y el usuario llena los campos requeridos sin apellido', async () => {
            await employeePage.fillAddEmployee({
                firstName: "Sam",
                lastName: "",
                employeeID: uniqueID
            });
            await employeePage.saveNewEmployeeClick();
        });

        await test.step('Entonces se muestra un mensaje de error', async () => {
            await employeePage.requiredError.waitFor({ state: 'visible' });
        });

        await test.step('Entonces el empleado no se encuentra en la lista de empleados', async () => {
            await expect.soft(employeePage.idColumnValues(uniqueID)).toBeHidden();
        });
    });

    test('Escenario 4 | Validar agregar un empleado sin ID', async ({ employeePage }) => {
        const uniqueID = ""
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });

        await test.step('Cuando el usuario navega a la página de empleados', async () => {
            await employeePage.clickOnPIMModule();
        });

        await test.step('Y se dirige hacia la sección de agregar empleados', async () => {
            await employeePage.goToAddEmployeePage();
        });

        await test.step('Y el usuario llena los campos requeridos sin ID', async () => {
            await employeePage.fillAddEmployee({
                firstName: "Sam",
                lastName: "Tarly",
                employeeID: uniqueID
            });
            await employeePage.saveNewEmployeeClick();
        });

        await test.step('Entonces se muestra un mensaje de error', async () => {
            await employeePage.requiredError.waitFor({ state: 'visible' });
        });

        await test.step('Entonces el empleado no se encuentra en la lista de empleados', async () => {
            await expect.soft(employeePage.idColumnValues(uniqueID)).toBeHidden();
        });
    });

    test('Escenario 5 | Validar agregar un empleado con ID duplicado', async ({ employeePage }) => {
        const uniqueID = await employeePage.generateUniqueID();
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Cuando el usuario navega a la página de empleados', async () => {
            await employeePage.clickOnPIMModule();
        });

        await test.step('Y se dirige hacia la sección de agregar empleados', async () => {
            await employeePage.goToAddEmployeePage();
        });

        await test.step('Y el usuario llena los campos requeridos y guarda al empleado', async () => {
            await employeePage.fillAddEmployee({
                firstName: "Sam",
                lastName: "Tarly",
                employeeID: uniqueID
            });
            const responsePromiseAddEmployee = employeePage.page.waitForResponse(response =>
                response.url().includes('/api/v2/pim/employees')
                && response.status() === 200
                && response.request().method() === 'POST'
            );
            await employeePage.saveNewEmployeeClick();
            await responsePromiseAddEmployee;
        });
        await test.step('Entonces el usuario busca al empleado por su ID', async () => {
            await employeePage.clickOnPIMModule();
            await employeePage.fillEmployeeInfoIDInput(uniqueID);
            await employeePage.searchClick();
        });

        await test.step('Entonces el empleado se encuentra en la lista de empleados', async () => {
            const locator = employeePage.idColumnValues(uniqueID);
            await locator.waitFor({ state: 'visible', timeout: 10000 });
        });

        await test.step('Cuando el usuario intenta agregar un empleado con el mismo ID', async () => {
            await employeePage.goToAddEmployeePage();
            await employeePage.fillAddEmployee({
                firstName: "Robert",
                lastName: "Tarly",
                employeeID: uniqueID
            });
            await employeePage.saveNewEmployeeClick();
        });
        await test.step('Entonces se muestra un mensaje de error', async () => {
            await employeePage.employeeAlreadyExists.waitFor({ state: 'visible' });

        });
    });
    test('Escenario 6 | Validar agregar un empleado con numeros y signos para NameInput y LastNameInput, y letras para IDIunput', async ({ employeePage }) => {
        const uniqueID = "uniqueID";
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });

        await test.step('Cuando el usuario navega a la página de empleados', async () => {
            await employeePage.clickOnPIMModule();
        });

        await test.step('Y se dirige hacia la sección de agregar empleados', async () => {
            await employeePage.goToAddEmployeePage();
        });

        await test.step('Y el usuario llena los campos requeridos sin nombre', async () => {
            await employeePage.fillAddEmployee({
                firstName: "1234€#~",
                lastName: "5678%/_<",
                employeeID: uniqueID
            });
            await employeePage.saveNewEmployeeClick();
        });

        await test.step('Entonces se muestra un mensaje de error', async () => {
            await employeePage.page.waitForSelector("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]");
            await expect(employeePage.page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[1]")).toHaveText('Invalid characters');
            await employeePage.page.waitForSelector("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[2]");
            await expect(employeePage.page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[2]")).toHaveText('Invalid characters');
        });
        await employeePage.page.waitForSelector("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[3]");
        await expect(employeePage.page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//span[3]")).toHaveText('Invalid characters');

        await test.step('Entonces el empleado no se encuentra en la lista de empleados', async () => {
                await expect.soft(employeePage.idColumnValues(uniqueID)).toBeHidden();
        });
    });
              
});
