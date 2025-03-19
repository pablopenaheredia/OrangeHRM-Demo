import { test } from '../../fixtures';

let uniqueID: string;
test.beforeEach(async ({ loginPage, employeePage }) => {
await loginPage.goToLoginPage();
await loginPage.login();
uniqueID = await employeePage.generateUniqueID();
await employeePage.addNewEmployee({
       firstName: "Mathias",
       lastName: "Hawtin",
       employeeID: uniqueID
       });
});

test.describe('[US04] Gestión de empleados | Eliminar empleados', () => {
    test('[US-04 | TC-01] | Validar eliminar un empleado exitosamente', async ({ employeePage }) => {
        await test.step('Dado que el usuario se encuenrta en la pagina de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({ }) => {
            await employeePage.verifyEmployeeInList(uniqueID);
        });
        await test.step('Entonces se procederá a borrar al empleado', async () => {
            await employeePage.deleteEmployee();
        })
    });
});