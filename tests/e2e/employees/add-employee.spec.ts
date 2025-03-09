import { expect, test } from '../../fixtures';


test.describe('[US02] Gestión de empleados | Agregar nuevos empleados', () => {

    test('Validar agregar un empleado exitosamente', async ({ loginPage, employeePage }) => {
        await loginPage.goToLoginPage();
        await loginPage.login();
        await employeePage.goToAddEmployeePage();
        await employeePage.fillAddEmployee("Juan", 'Perez', Math.floor(Math.random()*(100000-1+1)+1).toString());
        await employeePage.saveClick();
        await employeePage.checkEmployeeIsAdded('Juan', 'Perez', '12345');
    });
});
