import { expect, test } from '../../fixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login();
});

test.describe('[US02] Gestión de empleados | Agregar nuevos empleados', () => {

    test('Escenario 1 | Validar agregar un empleado exitosamente', async ({ employeePage }) => {
        
        const uniqueID = await employeePage.generateUniqueID();
        await test.step('Dado que el usuario se encuenrta en la pagina de inicio de sesión', async () => { });
        await test.step('Cuando el usuario navega a la página de empleados', async () => {
            await employeePage.clickOnPIMModule();
        });
           await test.step('Y se dirige hacia la sección de agregar empleados', async () => {
        await employeePage.goToAddEmployeePage();
        });
        await test.step('Y el usuario llena los campos requeridos', async () => {
            await employeePage.fillAddEmployee("messi", "dios", uniqueID);
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
    });
});
