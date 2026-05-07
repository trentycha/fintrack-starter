import { test, expect } from '@playwright/test';
import { TransactionForm } from './pages/transaction-form.js';

test("l'ajout d'un crédit met à jour le solde", async ({ page }) => {
  await page.goto('/');

  const form = new TransactionForm(page);
  await form.open();
  await form.fill({ label: 'Salaire test', amount: 1000, category: 'revenu' });
  await page.getByLabel('Type').selectOption('credit');
  await form.submit();

  await expect(page.getByText('Salaire test')).toBeVisible();
});
