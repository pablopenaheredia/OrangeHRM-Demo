import { test, expect } from '../../fixtures';

const user = process.env.USER;
const password = process.env.PASSWORD;
let uniqueID: string;
test.beforeEach(async ({ loginPage, employeePage, adminPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login(user, password);
    uniqueID = await employeePage.generateUniqueID();
    await employeePage.addNewEmployee({
        firstName: "Sarah",
        lastName: "Connor",
        employeeID: uniqueID
    });

    await employeePage.verifyEmployeeInList(uniqueID);
    await adminPage.goToAdminPage();
    await adminPage.addNewUserRole('Sarah_123', 'Admin', 'Sarah Connor', 'Enabled', 'admin1234', 'admin1234');
    await adminPage.verifyUserRole('Sarah_123');
});

test.describe('[US01] Inicio de sesión | Iniciar sesión con mis credenciales', () => {

    test('TC-07 - Validar inicio de sesión con nuevos permisos', async ({ loginPage }) => {
        await test.step('Dado que el usuario navega a la página de inicio de sesión', async () => { });
        await test.step('Y ingresa las credenciales para iniciar la sesion', async () => { });
        await test.step('Y se añada un nuevo empleado con permisos exclusivos', async () => { });
        await test.step('Y se realize el LogOut', async () => {
            await loginPage.logOut();
            await expect(loginPage.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        });
        await test.step('Y se inicie sesión con el nuevo empleado', async () => {
            await loginPage.login('Sarah_123', 'admin1234');
        });
        await test.step('Entonces el usuario debería ser redirigido al dashboard y ver el menú principal', async () => {
            await expect(loginPage.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
            await expect(loginPage.sideMenu).toBeVisible();
        });
    });
});