import { test as base } from '@playwright/test';
import { LoginPage } from '../pageobjectsmodels/LoginPage';
import { EmployeePage } from '../pageobjectsmodels/EmployeePage';
//import { DashboardPage } from '../pageobjectsmodels/DashboardPage';


type MyFixtures = {
    loginPage: LoginPage;
    employeePage: EmployeePage;
    //dashboardPage: DashboardPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use (loginPage);
    },

    employeePage: async ({ page }, use) => {
        const employeePage = new EmployeePage(page);
        await use(employeePage);
    }
});


export {expect} from '@playwright/test';