import { test as base } from '@playwright/test';
import { LoginPage } from '../pageobjectsmodels/LoginPage';
//import { DashboardPage } from '../pageobjectsmodels/DashboardPage';
//import { EmployeePage } from '../pageobjectsmodels/EmployeePage';


type MyFixtures = {
    loginPage: LoginPage;
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use (loginPage);
    }  
});

export {expect} from '@playwright/test';