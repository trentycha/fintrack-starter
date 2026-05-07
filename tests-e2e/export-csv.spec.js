import { test, expect } from '@playwright/test';

test("l'export CSV déclenche un téléchargement", async ({ page }) => {
  await page.goto('/');

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exporter en CSV' }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe('transactions.csv');
});
