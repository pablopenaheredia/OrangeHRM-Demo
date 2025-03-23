import { EmployeePage, type EmployeeData } from '../pageobjectsmodels/EmployeePage';
import { test } from '../tests/fixtures';

export async function addAndVerifyEmployee(employeePage: EmployeePage, employee: EmployeeData) {
    const uniqueID = await employeePage.generateUniqueID();
    await test.step('Dado que el usuario navega a la seccion de agregar empleados', async () => {
        await employeePage.clickOnPIMModule();
        await employeePage.goToAddEmployeePage();
    });

    await test.step('Y el usuario llena los campos y agrega al empleado', async () => {
        await employeePage.fillAddEmployee({
            firstName: employee.firstName,
            lastName: employee.lastName,
            employeeID: uniqueID
        });
        const responsePromiseAddEmployee = employeePage.page.waitForResponse(response =>
            response.url().includes('/api/v2/pim/employees')
            && response.status() === 200
            && response.request().method() === 'POST'
        );
        await employeePage.saveNewEmployeeClick();
        await responsePromiseAddEmployee;
    });

    await test.step('Cuando el usuario busca al empleado por su ID', async () => {
        await employeePage.clickOnPIMModule();
        await employeePage.fillEmployeeInfoIDInput(uniqueID);
        await employeePage.searchClick();
    });

    await test.step('Entonces el empleado se encuentra en la lista de empleados', async () => {
        const locator = employeePage.idColumnValues(uniqueID);
        await locator.waitFor({ state: 'visible', timeout: 10000 });
    });

    return uniqueID;
}