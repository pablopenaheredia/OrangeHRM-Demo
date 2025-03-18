
import { expect, test } from '../../fixtures';

test.beforeEach(async ({ loginPage, employeePage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login();
    const uniqueID = await employeePage.generateUniqueID();
    await employeePage.addNewEmployee({
        firstName: "Sam",
        lastName: "Tarly",
        employeeID: uniqueID
    });
});

test.describe('[US03] Gestión de empleados | Editar información de empleados existentes', () => {

    /*test('Validar editar un empleado exitosamente', async ({ employeePage }) => {
        const newUniqueID = await employeePage.generateUniqueID();
        const uniqueID = await employeePage.generateUniqueID();

        await test.step('Dado que el usuario se encuenrta en la pagina de inicio de sesión', async () => { });
        await test.step('Cuando el usuario navega a la página de empleados', async () => {
            await employeePage.clickOnPIMModule();
        });

        await test.step('Y se dirige hacia la sección de agregar empleados', async () => {
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

        await test.step('Y el usuario busca al empleado por su ID', async () => {
            await employeePage.clickOnPIMModule();
            await employeePage.fillEmployeeInfoIDInput(uniqueID);
            await employeePage.searchClick();
        });

        await test.step('Entonces el empleado se encuentra en la lista de empleados', async () => {
            const locator = employeePage.idColumnValues(uniqueID);
            await locator.waitFor({ timeout: 3000 });
        });

        await test.step('Y hace click en el botón para editar su información', async () => {
            const responsePromiseEditEmployee = employeePage.page.waitForResponse(response =>
                response.url().includes('/api/v2/pim/employees') &&
                response.url().includes('/personal-details') &&
                response.status() === 200 &&
                response.request().method() === 'GET'
            );
            await employeePage.editEmployeeInfoIconClick();
            await responsePromiseEditEmployee;
        });

        await test.step('Y el usuario edita y guarda la información del empleado', async () => {
            await employeePage.fillAddEmployee({
                firstName: "Robert",
                lastName: "Parker",
                employeeID: newUniqueID
            });

            const responsePromiseEditEmployee = employeePage.page.waitForResponse(response =>
                response.url().includes('/api/v2/pim/employees') &&
                response.url().includes('/personal-details') &&
                response.status() === 200 &&
                response.request().method() === 'PUT'
            );
            await employeePage.saveEditEmployeeClick();
            await responsePromiseEditEmployee;
        });

        await test.step("Entonces el usuario vuelve a la lista de empleados y lo busca por ID", async () => {
            await employeePage.clickOnPIMModule();
            await employeePage.fillEmployeeInfoIDInput(newUniqueID);
            await employeePage.searchClick();
        });

        await test.step('Entonces el empleado se encuentra en la lista de empleados', async () => {
            const locator = employeePage.idColumnValues(newUniqueID);
            await employeePage.page.screenshot({ path: 'search_result.png' });
            await locator.waitFor({ timeout: 3000 });
        });
    });
*/
    
    test('Validar editar un empleado exitosamente', async ({ employeePage }) => {
        await test.step('Dado que el usuario se encuenrta en la pagina de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({  }) => {
            await employeePage.verifyEmployeeInList(employeePage.employeeID);
        });

    });
});