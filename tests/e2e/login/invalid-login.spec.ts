import { expect, test } from '../../fixtures';

const user = process.env.USER;
const password = process.env.PASSWORD;

test.describe('[US01] Inicio de sesión | Iniciar sesión con credenciales erróneas', () => {
    
    test('Validar error al iniciar sesión con username incorrecto', async ({ loginPage }) =>
    {
        await loginPage.goToLoginPage();
        await loginPage.login('incorrecto', password);
        await expect(loginPage.page.locator('div.oxd-alert-content.oxd-alert-content--error')).toHaveText('Invalid credentials');
    });

    test('Validar error al iniciar sesión con password incorrecto', async ({ loginPage }) =>
    {
        await loginPage.goToLoginPage();
        await loginPage.login(user, "incorrecta");
        await expect(loginPage.page.locator('div.oxd-alert-content.oxd-alert-content--error')).toHaveText('Invalid credentials');
    });

    test('Validar inicio de sesión sin ingresar username', async ({ loginPage }) =>
    {
        await loginPage.goToLoginPage();
        await loginPage.login('', password);
        await expect(loginPage.page.locator('span.oxd-text.oxd-text--span')).toHaveText('Required');
        });
    
    test('Validar inicio de sesión sin ingresar contraseña', async ({ loginPage }) =>
    {
        await loginPage.goToLoginPage();
        await loginPage.login(user, '');
        await expect(loginPage.page.locator('span.oxd-text.oxd-text--span')).toHaveText('Required');
    });

});
