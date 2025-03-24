import { test as base } from '@playwright/test';
import { LoginPage } from '../pageobjectsmodels/LoginPage';
import { EmployeePage } from '../pageobjectsmodels/EmployeePage';
import { AdminPage } from '../pageobjectsmodels/AdminPage';


type MyFixtures = {
    loginPage: LoginPage;
    employeePage: EmployeePage;
    adminPage: AdminPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use (loginPage);
    },

    employeePage: async ({ page }, use) => {
        const employeePage = new EmployeePage(page);
        await use(employeePage);
    },

    adminPage: async ({ page }, use) => {
        const adminPage = new AdminPage(page);
        await use(adminPage);
    }
});


export {expect} from '@playwright/test';