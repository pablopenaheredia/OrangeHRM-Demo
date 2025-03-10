import { expect, test } from '../../fixtures';


test.describe('[US02] Gestión de empleados | Agregar nuevos empleados', () => {

    test('Validar agregar un empleado exitosamente', async ({ loginPage, employeePage }) => {
        
        const uniqueID = await employeePage.generateUniqueID();
        await loginPage.goToLoginPage();
        await loginPage.login();
        await employeePage.goToAddEmployeePage();
        await employeePage.fillAddEmployee("messi", "dios", uniqueID);
        await employeePage.saveClick();
        const isEmployeeAdded = await employeePage.checkEmployeeIsAdded("messi", 'dios', uniqueID);
        expect(isEmployeeAdded).toBe(false);
    });
});
