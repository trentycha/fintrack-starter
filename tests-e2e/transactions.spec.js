import { test, expect } from '@playwright/test';

test("l'utilisateur ajoute une transaction et la voit dans la liste", async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Ajouter une transaction' }).click();

  await page.getByLabel('Libellé').fill('Café');
  await page.getByLabel('Montant').fill('3.50');
  await page.getByLabel('Catégorie').selectOption('autre');

  await page.getByRole('button', { name: 'Valider' }).click();

  await expect(page.getByText('Café')).toBeVisible();
});
