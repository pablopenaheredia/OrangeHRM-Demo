import { expect, test } from '../../fixtures';


test.describe('[US02] Gestión de empleados | Agregar nuevos empleados', () => {
const randomID = Math.floor(Math.random()*(100000-1+1)+1).toString();
    test('Validar agregar un empleado exitosamente', async ({ loginPage, employeePage }) => {
        await loginPage.goToLoginPage();
        await loginPage.login();
        await employeePage.goToAddEmployeePage();
        await employeePage.fillAddEmployee("Juan", 'Perez', randomID);
        await employeePage.saveClick();
        await employeePage.checkEmployeeIsAdded('Juan', 'Perez', randomID);
    });
});
