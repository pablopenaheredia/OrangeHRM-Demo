import { test, expect } from '../../fixtures';

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

    await employeePage.verifyEmployeeInList(uniqueID);
});

test.describe('[US05] Asignación de permisos | Asignar permisos a los empleados', () => {
    test('Validar no poder agregar un permiso con un requisito vacio', async ({ adminPage }) => {
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({ }) => { });
        await test.step('Y se dirige a la sección Admin', async () => {
            await adminPage.goToAdminPage();
        });
        await test.step('Y se agrega un nuevo rol de usuario', async () => {
            await adminPage.addNewUserRole('', 'Admin', 'Xristoph Pereh', 'Enabled', 'admin1234', 'admin1234');
        });
        
        await test.step('Y se verifica que aparezca un span "Required"', async () => {
            await adminPage.requiredError.waitFor({ state: 'visible' });
        });
    });

    test('Validar que no se permite la creación de un nuevo permiso si las contraseñas no coinciden.', async ({ adminPage }) => {
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({ }) => { });
        await test.step('Y se dirige a la sección Admin', async () => {
            await adminPage.goToAdminPage();
        });
        await test.step('Y se agrega un nuevo rol de usuario', async () => {
            await adminPage.addNewUserRole('XristophAdmin', 'Admin', 'Xristoph Pereh', 'Enabled', 'admin1234', 'admin12345');
        });
        
        await test.step('Y se verifica que aparezca un span "con "Passwords do not match"', async () => {
            await adminPage.passwordNotMatch.waitFor({ state: 'visible' });
        });
    });

    test('Validar que no se puede crear un nuevo permiso con un nombre de usuario ya existente', async ({ employeePage, adminPage }) => {
        const secondUniqueID = await employeePage.generateUniqueID();
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({ }) => { });
        await test.step('Y se dirige a la sección Admin', async () => {
            await adminPage.goToAdminPage();
        });
        await test.step('Y se agrega un nuevo rol de usuario', async () => {
            await adminPage.addNewUserRole('XristophADM', 'Admin', 'Xristoph Pereh', 'Enabled', 'admin1234', 'admin1234');
        });
        await test.step('Y se crea un segundo empleado', async ({}) => {
            
            await employeePage.addNewEmployee({
                firstName: "Raul",
                lastName: "Diaz",
                employeeID: secondUniqueID
            });
        });
        await test.step('Y se verifica que el 2do empleado se encuentre en la lista de empleados', async ({ }) => {
            await employeePage.verifyEmployeeInList(secondUniqueID);
        });

        await test.step('Y se intenta agregar permisos al segundo empleado', async () => {
            await adminPage.goToAdminPage();
            await adminPage.addBtn.click();
            await adminPage.addNewUserRole('XristophADM', 'Admin', 'Raul Diaz', 'Enabled', 'admin1234', 'admin1234');
        });
        await test.step('Deberia aparecer un mensaje de error', async () => {
            await adminPage.userNameAlreadyExists.waitFor({ state: 'visible' });
        });
            
    });

    test('Validar error para longitud mínima de contraseña', async ({ adminPage }) => {
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({ }) => { });
        await test.step('Y se dirige a la sección Admin', async () => {
            await adminPage.goToAdminPage();
        });
        await test.step('Y se agrega un nuevo rol de usuario', async () => {
            await adminPage.addNewUserRole('XristophAdmin', 'Admin', 'Xristoph Pereh', 'Enabled', 'adm1', 'adm1');
        });
        await test.step('Y se verifica que aparezca un span con el texto "Necesita al menos 7 caracteres"', async () => {
            await adminPage.passwordLengthError.waitFor({ state: 'visible' });
        });
    });

    test('Validar error para caracter numerico necesario en contraseña', async ({ adminPage }) => {
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({ }) => { });
        await test.step('Y se dirige a la sección Admin', async () => {
            await adminPage.goToAdminPage();
        });
        await test.step('Y se agrega un nuevo rol de usuario', async () => {
            await adminPage.addNewUserRole('XristophAdmin', 'Admin', 'Xristoph Pereh', 'Enabled', 'password', 'password');
        });
        await test.step('Y se verifica que aparezca un span con el texto "Necesita al menos un caracter numerico"', async () => {
            await adminPage.passwordNumberError.waitFor({ state: 'visible' });
        });
    });

    test('Validar error para contraseñas sin coincidir', async ({ adminPage }) => {
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({ }) => { });
        await test.step('Y se dirige a la sección Admin', async () => {
            await adminPage.goToAdminPage();
        });
        await test.step('Y se agrega un nuevo rol de usuario', async () => {
            await adminPage.addNewUserRole('XristophAdmin', 'Admin', 'Xristoph Pereh', 'Enabled', 'password1', 'password2');
        });
        await test.step('Y se verifica que aparezca un span con el texto "Necesita al menos un caracter numerico"', async () => {
            await adminPage.passwordDoNotMatchError.waitFor({ state: 'visible' });
        });
    });

    test('Validar error para 4 caracteres minimos en username', async ({ adminPage }) => {
        await test.step('Dado que el usuario se encuentra en la página de inicio de sesión', async () => { });
        await test.step('Y ya hay un empleado agregado', async () => { });
        await test.step('Y se verifica que el empleado se encuentre en la lista de empleados', async ({ }) => { });
        await test.step('Y se dirige a la sección Admin', async () => {
            await adminPage.goToAdminPage();
        });
        await test.step('Y se agrega un nuevo rol de usuario', async () => {
            await adminPage.addNewUserRole('Xris', 'Admin', 'Xristoph Pereh', 'Enabled', 'password1', 'password2');
        });
        await test.step('Y se verifica que aparezca un span con el texto "Necesita al menos un caracter numerico"', async () => {
            await adminPage.userNameMinCharacters.waitFor({ state: 'visible' });
        });
    });

});