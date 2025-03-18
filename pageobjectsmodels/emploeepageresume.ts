/*async addNewEmployee(employee: EmployeeData) {
        await this.clickOnPIMModule();
        await this.goToAddEmployeePage();
        await this.fillAddEmployee(employee);
        const responsePromiseAddEmployee = this.page.waitForResponse(response =>
            response.url().includes('/api/v2/pim/employees')
            && response.status() === 200
            && response.request().method() === 'POST');
        await this.saveNewEmployeeClick();
        await responsePromiseAddEmployee;
    }

    async verifyEmployeeInList(employee: EmployeeData) {
        const uniqueID = employee.employeeID;
        await this.clickOnPIMModule();
        await this.fillEmployeeInfoIDInput(uniqueID);
        await this.searchClick();
        const locator = this.idColumnValues(uniqueID);
        await locator.waitFor({ state: 'visible', timeout: 10000 });
    }

    async editEmployeeInfo(employee: EmployeeData) {
        const responsePromiseEditEmployee = this.page.waitForResponse(response =>
                response.url().includes('/api/v2/pim/employees') &&
                response.url().includes('/personal-details') &&
                response.status() === 200 &&
                response.request().method() === 'GET'
            );
        await this.editEmployeeInfoIconClick();
        await responsePromiseEditEmployee;
        await this.fillAddEmployee(employee);
        const responsePromiseSaveEditedEmployee = this.page.waitForResponse(response =>
                response.url().includes('/api/v2/pim/employees') &&
                response.url().includes('/personal-details') &&
                response.status() === 200 &&
                response.request().method() === 'PUT'
            );
            await this.saveEditEmployeeClick();
            await responsePromiseSaveEditedEmployee;
    }

    async verifyEmployeeEdited(employee: EmployeeData) {
        const newUniqueID = employee.employeeID;
        await this.clickOnPIMModule();
        await this.fillEmployeeInfoIDInput(newUniqueID);
        await this.searchClick();
        const locator = this.idColumnValues(newUniqueID);
        await locator.waitFor({ timeout:
        3000 });
    }
   */ 