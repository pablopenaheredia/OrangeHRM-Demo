import { expect, test } from '../../fixtures';

test.describe('[US01] Inicio de sesión | Boton Deshabilitado sin credenciales', () => {
    
    test('Validar boton login deshabilitado sin credenciales', async ({ loginPage }) => {
        await loginPage.goToLoginPage();
        await expect(loginPage.page.locator("button[type='submit']")).toBeDisabled();
    });

});