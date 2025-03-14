import {expect, test } from '../../fixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login();
});

test.describe('[US03] Gestión de empleados | Editar empleados correctamente', () => {

    test('Validar editar un empleado exitosamente', async ({ employeePage }) => {
        const uniqueID = await employeePage.generateUniqueID();
        const newUniqueID = await employeePage.generateUniqueID();
        await test.step('Dado que el usuario se encuenrta en la pagina de inicio de sesión', async () => { });
        await test.step('Cuando el usuario navega a la página de empleados', async () => {
            await employeePage.clickOnPIMModule();
        });
        await test.step('Y se dirige hacia la sección de agregar empleados', async () => {
            await employeePage.goToAddEmployeePage();
        });
        await test.step('Y el usuario llena los campos requeridos', async () => {
            await employeePage.fillAddEmployee("Roberto", "Heredia", uniqueID);
        });
        await test.step('Y el usuario guarda al empleado', async () => {
            await employeePage.saveNewEmployeeClick();
        });

        await test.step('Y el usuario busca al empleado por su ID', async () => {
            await employeePage.clickOnPIMModule();
            await employeePage.fillEmployeeInfoIDInput(uniqueID);
            await employeePage.searchClick();
        });
        /*await test.step('Entonces el empleado se encuentra en la lista de empleados', async () => {
            await employeePage.page.waitForLoadState('domcontentloaded');
            const locator = employeePage.idColumnValues(uniqueID);
            await expect.soft(locator).toBeVisible();
        });*/
        await test.step('Y hace click en el boton para editar su información', async () => {
            await employeePage.page.waitForLoadState('domcontentloaded');
            await employeePage.page.waitForTimeout(2000);
            await employeePage.editEmployeeInfoIconClick();
        });
        await test.step('Y el usuario edita la información del empleado', async () => {
            await employeePage.fillAddEmployee("Roberto", "Sanchez", newUniqueID);
            await employeePage.saveEditEmployeeClick();
        });
        /*await test.step('Y se edita correctamente', async () => {
            await expect(employeePage.successPopUp).toBeVisible();
        });*/
        await test.step("Entonces el usuario vuelve a la lista de empleados para buscarlo por ID", async () => {
            await employeePage.clickOnPIMModule();
            await employeePage.fillEmployeeInfoIDInput(newUniqueID);
            await employeePage.searchClick();
        });
        await test.step('Entonces el empleado se encuentra en la lista de empleados', async () => {
            await employeePage.page.waitForLoadState('domcontentloaded');
            const locator = employeePage.idColumnValues(newUniqueID);
            await expect.soft(locator).toBeVisible();
        });
    })
});
        