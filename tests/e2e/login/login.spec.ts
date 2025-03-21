import { expect, test } from '../../fixtures';

const user = process.env.USER;
const password = process.env.PASSWORD;

test.describe('[US01] Inicio de sesión | Iniciar sesión con mis credenciales', () => {
    
    test('Validar inicio de sesión exitoso', async ({ loginPage }) => {
        await test.step('Dado que el usuario navega a la página de inicio de sesión', async () => {
            await loginPage.goToLoginPage();
        });

        await test.step('Cuando el usuario ingresa credenciales válidas y hace clic en "Login"', async () => {
            await loginPage.login();
        });

        await test.step('Entonces el usuario debería ser redirigido al dashboard y ver el menú principal', async () => {
            await expect(loginPage.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
            await expect(loginPage.sideMenu).toBeVisible();
        });
    });

    test('Validar error al iniciar sesión con username incorrecto', async ({ loginPage }) => {
        await test.step('Dado que el usuario navega a la página de inicio de sesión', async () => {
            await loginPage.goToLoginPage();
        });

        await test.step('Cuando el usuario ingresa un nombre de usuario incorrecto y la contraseña correcta', async () => {
            await loginPage.login('incorrecto', password);
        });

        await test.step('Entonces debería aparecer un mensaje de error indicando "Invalid credentials"', async () => {
            await expect(loginPage.invalidCredentialsError).toBeTruthy();
        });
    });

    test('Validar error al iniciar sesión con password incorrecto', async ({ loginPage }) => {
        await test.step('Dado que el usuario navega a la página de inicio de sesión', async () => {
            await loginPage.goToLoginPage();
        });

        await test.step('Cuando el usuario ingresa el nombre de usuario correcto y una contraseña incorrecta', async () => {
            await loginPage.login(user, 'incorrecta');
        });

        await test.step('Entonces debería aparecer un mensaje de error indicando "Invalid credentials"', async () => {
            await expect(loginPage.invalidCredentialsError).toBeTruthy();
        });
    });

    test('Validar inicio de sesión sin ingresar username', async ({ loginPage }) => {
        await test.step('Dado que el usuario navega a la página de inicio de sesión', async () => {
            await loginPage.goToLoginPage();
        });

        await test.step('Cuando el usuario deja el campo del nombre de usuario vacío y ingresa la contraseña correcta', async () => {
            await loginPage.login('', password);
        });

        await test.step('Entonces debería aparecer un mensaje de error indicando "Required"', async () => {
            await expect(loginPage.requiredError).toBeTruthy();
        });
    });

    test('Validar inicio de sesión sin ingresar contraseña', async ({ loginPage }) => {
        await test.step('Dado que el usuario navega a la página de inicio de sesión', async () => {
            await loginPage.goToLoginPage();
        });

        await test.step('Cuando el usuario ingresa el nombre de usuario correcto y deja el campo de la contraseña vacío', async () => {
            await loginPage.login(user, '');
        });

        await test.step('Entonces debería aparecer un mensaje de error indicando "Required"', async () => {
            await expect(loginPage.requiredError).toBeTruthy();
        });
    });

    test('Validar boton login deshabilitado sin credenciales', async ({ loginPage }) => {
        await test.step('Dado que el usuario navega a la página de inicio de sesión', async () => {
            await loginPage.goToLoginPage();
        });

        await test.step('Entonces el botón "Login" debería estar deshabilitado cuando los campos están vacíos', async () => {
            await expect(loginPage.loginBtn).toBeDisabled();
        });
    });

});