export class TransactionForm {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.getByRole('button', { name: 'Ajouter une transaction' }).click();
  }

  async fill({ label, amount, category }) {
    await this.page.getByLabel('Libellé').fill(label);
    await this.page.getByLabel('Montant').fill(String(amount));
    if (category) {
      await this.page.getByLabel('Catégorie').selectOption(category);
    }
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Valider' }).click();
  }
}
