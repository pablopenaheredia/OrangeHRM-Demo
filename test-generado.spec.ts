import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('row', { name: ' Admins Admin A8DCo 010Z' }).getByRole('button').nth(1).click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('');
  await page.getByRole('textbox').nth(2).press('Tab');
  await page.locator('div').filter({ hasText: /^Enabled$/ }).nth(2).click();
  await page.getByRole('option', { name: 'Enabled' }).click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).press('Enter');
  await page.getByRole('button', { name: 'Save' }).click();
});