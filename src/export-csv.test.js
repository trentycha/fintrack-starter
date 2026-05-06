import { exportCSV } from './export-csv.js';

test("retourne l'en-tête CSV", () => {
  expect(exportCSV([])).toBe('date,libellé,montant,catégorie');
});

test('chaque transaction devient une ligne CSV', () => {
  const date = new Date().toISOString();
  const transactions = [{ date, label: 'Salaire', amount: 2400, category: 'revenu' }];
  expect(exportCSV(transactions)).toBe(
    `date,libellé,montant,catégorie\n${date},Salaire,2400,revenu`,
  );
});

test('les transactions hors du mois en cours sont filtrées', () => {
  const date = new Date().toISOString();
  const transactions = [
    { date, label: 'Salaire', amount: 2400, category: 'revenu' },
    { date: '2020-01-01', label: 'Vieux loyer', amount: 800, category: 'logement' },
  ];
  expect(exportCSV(transactions)).toBe(
    `date,libellé,montant,catégorie\n${date},Salaire,2400,revenu`,
  );
});

test('les virgules dans les libellés sont échappées', () => {
  
  const date = new Date().toISOString();
  const transactions = [
    { date, label: 'Courses, Carrefour', amount: 78.4, category: 'alimentation' }
  ];
  expect(exportCSV(transactions)).toBe(
    `date,libellé,montant,catégorie\n${date},"Courses, Carrefour",78.4,alimentation`
  );
  
});