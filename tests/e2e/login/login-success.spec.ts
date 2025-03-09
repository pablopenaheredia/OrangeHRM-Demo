import { expect, test } from '../../fixtures';


test.describe('[US01] Inicio de sesión | Iniciar sesión con mis credenciales', () => {
    
    test('Validar inicio de sesión exitoso con credenciales válidas', async ({ loginPage }) => {
        await loginPage.goToLoginPage();
        await loginPage.login();
        await expect(loginPage.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    });

});

