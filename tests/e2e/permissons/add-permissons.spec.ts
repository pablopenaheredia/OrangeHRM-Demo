import { test } from '../../fixtures';
import { addAndVerifyEmployee } from '../utils/employeeUtils';

let uniqueID: string;

test.beforeEach(async ({ loginPage, employeePage }) => {
    await loginPage.goToLoginPage();
    await loginPage.login();
    uniqueID = await addAndVerifyEmployee(employeePage, {
        firstName: "Mathias",
        lastName: "Hawtin",
        employeeID: ""
    });
});

test.describe('[US03] Gestión de permisos | Agregar y validar permisos', () => {
    test('Escenario 1 | Validar agregar un permiso exitosamente', async ({ employeePage }) => {
        // Aquí puedes continuar con las pruebas de permisos usando uniqueID
        console.log(`Empleado agregado con ID único: ${uniqueID}`);
    });
});