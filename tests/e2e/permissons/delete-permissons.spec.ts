import { test } from '../../fixtures';

let uniqueID: string;
test.beforeEach(async ({ loginPage, employeePage }) => {
await loginPage.goToLoginPage();
await loginPage.login();
uniqueID = await employeePage.generateUniqueID();
await employeePage.addNewEmployee({
       firstName: "Xristoph",
       lastName: "Pereh",
       employeeID: uniqueID
       });
});

test.describe('[US05] Asignación de permisos | Asignar eliminar permisos a los empleados', () => {
    test('[US-05 | TC-0] | Validar eliminar permisos a un empleado exitosamente', async ({ adminPage }) => {
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({ }) => { });
        await test.step('Y se dirige a la sección Admin', async () => {
            await adminPage.goToAdminPage();
        });
        await test.step('Y se agrega un nuevo rol de usuario', async () => {
            await adminPage.addNewUserRole('XristopherAdmin', 'Admin', 'Xristoph Pereh', 'Enabled', 'admin1234', 'admin1234');
        });
        
        await test.step('Y se verifica que el usuario se encuentre en la lista de empleados con permisos', async () => {
            await adminPage.verifyUserRole('XristopherAdmin');
        });
        await test.step('Y se elimina el permiso del usuario', async () => {
            await adminPage.deletePermissons();
        });
    });
});