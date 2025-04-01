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
        await test.step('Y se edita el rol de usuario', async () => {
            await adminPage.editPermissonsSuccess('PabloAdmin', 'ESS', 'Disabled', 'admin123', 'admin123');
        });
        await test.step('Y se verifica que el usuario se encuentre en la lista de empleados con permisos', async () => {
            await adminPage.verifyUserRole('PabloAdmin');
        });
    });


    test('Validar no poder editar un permiso con un campo requerido invalido', async ({ adminPage }) => {
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({ }) => { });
        await test.step('Y se dirige a la sección Admin', async () => { });
        await test.step('Y se agrega un nuevo rol de usuario', async () => { });
        await test.step('Y se verifica que el usuario se encuentre en la lista de empleados con permisos', async () => { });
        await test.step('Y hace click en el icono para editar al usuario', async () => {
            await adminPage.clickEditPermissonsIcon();
        });
        await test.step('Y se edita el rol de usuario incorrectamente', async () => {
            await adminPage.editPermissonsUnsuccess('', 'ESS', 'Disabled', 'admin123', 'admin123');
        });
        await test.step('Y se verifica que el error "Required" figure sobre el input', async () => {
            await adminPage.requiredError.waitFor({ state: 'visible' });
        });
    });
    test('Validar error para longitud mínima de contraseña al editar un permiso', async ({ adminPage }) => {
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({ }) => { });
        await test.step('Y se dirige a la sección Admin', async () => { });
        await test.step('Y se agrega un nuevo rol de usuario', async () => { });
        await test.step('Y se verifica que el usuario se encuentre en la lista de empleados con permisos', async () => { });
        await test.step('Y hace click en el icono para editar al usuario', async () => {
            await adminPage.clickEditPermissonsIcon();
        });
        await test.step('Y hace click en el checkbox para cambiar la contraseña', async () => {
            await adminPage.passwordCheckbox.click();
        });
        await test.step('Y se edita el rol de usuario incorrectamente', async () => {
            await adminPage.editPermissonsUnsuccess('AdminPablo', 'Admin', 'Enabled', 'ad3', 'ad3');
        });
        await test.step('Y se verifica que el error "Should have at least 7 characters" figure sobre el input', async () => {
            await adminPage.passwordLengthError.waitFor({ state: 'visible' });
        });
    });

    test('Validar error para contraseñas sin caracteres numéricos al editar un permiso', async ({ adminPage }) => {
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({ }) => { });
        await test.step('Y se dirige a la sección Admin', async () => { });
        await test.step('Y se agrega un nuevo rol de usuario', async () => { });
        await test.step('Y se verifica que el usuario se encuentre en la lista de empleados con permisos', async () => { });
        await test.step('Y hace click en el icono para editar al usuario', async () => {
            await adminPage.clickEditPermissonsIcon();
        });
        await test.step('Y hace click en el checkbox para cambiar la contraseña', async () => {
            await adminPage.passwordCheckbox.click();
        });
        await test.step('Y se edita el rol de usuario incorrectamente', async () => {
            await adminPage.editPermissonsUnsuccess('AdminPablo', 'Admin', 'Enabled', 'administrador', 'administrador');
        });
        await test.step('Y se verifica que el error "Should have at least 7 characters" figure sobre el input', async () => {
            await adminPage.passwordNumberError.waitFor({ state: 'visible' });
        });
        });
    test('Validar error para contraseñas que no coinciden al editar un permiso', async ({ adminPage }) => {
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({ }) => { });
        await test.step('Y se dirige a la sección Admin', async () => { });
        await test.step('Y se agrega un nuevo rol de usuario', async () => { });
        await test.step('Y se verifica que el usuario se encuentre en la lista de empleados con permisos', async () => { });
        await test.step('Y hace click en el icono para editar al usuario', async () => {
            await adminPage.clickEditPermissonsIcon();
        });
        await test.step('Y hace click en el checkbox para cambiar la contraseña', async () => {
            await adminPage.passwordCheckbox.click();
        });
        await test.step('Y se edita el rol de usuario incorrectamente', async () => {
            await adminPage.editPermissonsUnsuccess('AdminPablo', 'Admin', 'Enabled', 'administrador', 'adminitrador');
        });
        await test.step('Y se verifica que el error "Should have at least 7 characters" figure sobre el input', async () => {
            await adminPage.passwordDoNotMatchError.waitFor({ state: 'visible' });
        });
    });

});

    
