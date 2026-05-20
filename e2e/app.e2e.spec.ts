import { expect, test } from '@playwright/test';

test('loads dashboard and navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Angular Ignite Starter')).toBeVisible();
  await page.getByRole('button', { name: 'Login (demo JWT)' }).click();
  await page.getByRole('link', { name: 'Products CRUD' }).click();
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
});
