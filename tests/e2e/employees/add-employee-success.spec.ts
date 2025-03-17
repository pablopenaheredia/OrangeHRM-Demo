import { test } from '../../fixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login();
});

test.describe('[US02] Gestión de empleados | Agregar nuevos empleados', () => {

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
});