
import { test } from '../../fixtures';

let uniqueID: string;
test.beforeEach(async ({ loginPage, employeePage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login();
    uniqueID = await employeePage.generateUniqueID();
    await employeePage.addNewEmployee({
        firstName: "Sam",
        lastName: "Tarly",
        employeeID: uniqueID
    });
});

test.describe('[US03] Gestión de empleados | Editar información de empleados existentes', () => {
    
    test('[US-03 | TC-01] | Validar editar un empleado exitosamente', async ({ employeePage }) => {
        const newUniqueID = await employeePage.generateUniqueID();
        await test.step('Dado que el usuario se encuenrta en la pagina de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({  }) => {
            await employeePage.verifyEmployeeInList(uniqueID);
        });
        await test.step('Entonces el usuario edita la información del empleado', async () => {
            await employeePage.editEmployeeInfoSuccess({
                firstName: "Robert",
                lastName: "Parker",
                employeeID: newUniqueID
            });
        });
        await test.step('Entonces el usuario verifica que el empleado se haya editado correctamente', async () => {
            await employeePage.verifyEmployeeEdited(newUniqueID);
        });
    });

    test('Validar error al intentar editar un empleado sin nombre', async ({ employeePage }) => {
        const newUniqueID = await employeePage.generateUniqueID();
        await test.step('Dado que el usuario se encuenrta en la pagina de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({  }) => {
            await employeePage.verifyEmployeeInList(uniqueID);
        });
        await test.step('Entonces el usuario edita la información del empleado', async () => {
            await employeePage.editEmployeeInfoUnsuccess({
                firstName: "",
                lastName: "Parker",
                employeeID: newUniqueID
            });
        });
        await test.step('Entonces se muestra un mensaje de error', async () => {
            await employeePage.requiredError.waitFor({ state: 'visible' });
        });
    });

    test('Validar error al intentar editar un empleado sin apellido', async ({ employeePage }) => {
        const newUniqueID = await employeePage.generateUniqueID();
        await test.step('Dado que el usuario se encuenrta en la pagina de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({  }) => {
            await employeePage.verifyEmployeeInList(uniqueID);
        });
        await test.step('Entonces el usuario edita la información del empleado', async () => {
            await employeePage.editEmployeeInfoUnsuccess({
                firstName: "Robert",
                lastName: "",
                employeeID: newUniqueID
            });
        });
        await test.step('Entonces se muestra un mensaje de error', async () => {
            await employeePage.requiredError.waitFor({ state: 'visible' });
        });
    });

    test('Validar error al intentar editar un empleado sin ID', async ({ employeePage }) => {
        const newUniqueID = "";
        await test.step('Dado que el usuario se encuenrta en la pagina de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({  }) => {
            await employeePage.verifyEmployeeInList(uniqueID);
        });
        await test.step('Entonces el usuario edita la información del empleado', async () => {
            await employeePage.editEmployeeInfoUnsuccess({
                firstName: "Robert",
                lastName: "Parker",
                employeeID: newUniqueID
            });
        });
        await test.step('Entonces se muestra un mensaje de error', async () => {
            await employeePage.requiredError.waitFor({ state: 'visible' });
        });
    });
});