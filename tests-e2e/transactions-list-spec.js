import { test, expect } from '@playwright/test';
import { TransactionForm } from './pages/transaction-form.js';

test('les transactions apparaissent dans la liste', async ({ page }) => {
  await page.goto('/');

  const form = new TransactionForm(page);
  await form.open();
  await form.fill({ label: 'Café test', amount: 3.5, category: 'autre' });
  await form.submit();

  await expect(page.getByText('Café test')).toBeVisible();
  await expect(page.getByText('3.50')).toBeVisible();
});
