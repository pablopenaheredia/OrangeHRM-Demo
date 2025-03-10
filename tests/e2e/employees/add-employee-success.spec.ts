import { expect, test } from '../../fixtures';


test.describe('[US02] Gestión de empleados | Agregar nuevos empleados', () => {
    const randomID = Math.floor(Math.random() * (10000 - 1 + 1) + 1).toString();

    test('Validar agregar un empleado exitosamente', async ({ loginPage, employeePage }) => {
        await loginPage.goToLoginPage();
        await loginPage.login();
        await employeePage.goToAddEmployeePage();
        await employeePage.fillAddEmployee("John", 'Doe', randomID);
        await employeePage.saveClick();
        await employeePage.checkEmployeeIsAdded("Johns", 'Doe', randomID);
    });
});
