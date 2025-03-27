import { test, expect } from '../../fixtures';

let uniqueID: string;
test.beforeEach(async ({ loginPage, employeePage, adminPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login();
    uniqueID = await employeePage.generateUniqueID();
    await employeePage.addNewEmployee({
        firstName: "Pablo",
        lastName: "Pena",
        employeeID: uniqueID
    });

    await employeePage.verifyEmployeeInList(uniqueID);
    await adminPage.goToAdminPage();
    await adminPage.addNewUserRole('AdminPablo', 'Admin', 'Pablo Pena', 'Enabled', 'admin1234', 'admin1234');
    await adminPage.verifyUserRole('AdminPablo');
});

test.describe('[US05] Asignación de permisos | Asignar permisos a los empleados', () => {
    test('[US-06 | TC-01] | Validar editar permisos de administrador exitosamente', async ({ adminPage }) => {
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({ }) => { });
        await test.step('Y se dirige a la sección Admin', async () => { });
        await test.step('Y se agrega un nuevo rol de usuario', async () => { });
        await test.step('Y se verifica que el usuario se encuentre en la lista de empleados con permisos', async () => { });
        await test.step('Y hace click en el icono para editar al usuario', async () => {
            await adminPage.clickEditPermissonsIcon();
        });
        await test.step('Y marca previamente el checkbox de cambiar contraseña', async () => {
        });
        await test.step('Y se edita el rol de usuario', async () => {
            await adminPage.editPermissons('PabloAdmin', 'ESS', 'Disabled', 'admin123', 'admin123');
        });
        await test.step('Y se verifica que el usuario se encuentre en la lista de empleados con permisos', async () => {
            await adminPage.verifyUserRole('PabloAdmin');
        });
    });
});