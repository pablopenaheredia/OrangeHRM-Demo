import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('1234€#~');
  await page.getByRole('textbox', { name: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('5678%/_<');
  await page.locator('form').getByRole('textbox').nth(4).click();
  await page.locator('form').getByRole('textbox').nth(4).fill('0424uniqueID');
  await page.locator('form').getByRole('textbox').nth(4).press('ControlOrMeta+Shift+ArrowLeft');
  await page.locator('form').getByRole('textbox').nth(4).press('ControlOrMeta+Shift+ArrowLeft');
  await page.locator('form').getByRole('textbox').nth(4).fill('uniqueID');
  await page.getByText('Add EmployeeAccepts jpg, .png').click();
  await page.getByText('Employee Id already exists').click();
  await page.getByRole('button', { name: 'Save' }).click();
});