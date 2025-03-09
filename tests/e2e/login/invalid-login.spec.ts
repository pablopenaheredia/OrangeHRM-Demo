import { expect, test } from '../../fixtures';


test.describe('[US01] Inicio de sesión | Iniciar sesión con credenciales erróneas', () => {
    
    test('Validar error al iniciar sesión con username incorrecto', async ({ loginPage }) =>
    {
        await loginPage.goToLoginPage();
        await loginPage.login('incorrecto', process.env.PASSWORD);
        await expect(loginPage.page.locator('div.oxd-alert-content.oxd-alert-content--error')).toHaveText('Invalid credentials');
    });

    test('Validar error al iniciar sesión con password incorrecto', async ({ loginPage }) =>
    {
        await loginPage.goToLoginPage();
        await loginPage.login(process.env.USER, "incorrecta");
        await expect(loginPage.page.locator('div.oxd-alert-content.oxd-alert-content--error')).toHaveText('Invalid credentials');
    });

    test('Validar inicio de sesión sin ingresar username', async ({ loginPage }) =>
    {
        await loginPage.goToLoginPage();
        await loginPage.login('', process.env.PASSWORD);
        await expect(loginPage.page.locator('span.oxd-text.oxd-text--span')).toHaveText('Required');
        });
    
    test('Validar inicio de sesión sin ingresar contraseña', async ({ loginPage }) =>
    {
        await loginPage.goToLoginPage();
        await loginPage.login(process.env.USER, '');
        await expect(loginPage.page.locator('span.oxd-text.oxd-text--span')).toHaveText('Required');
    });

});
