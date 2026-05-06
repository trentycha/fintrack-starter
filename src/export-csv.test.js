import { exportCSV } from './export-csv.js';

test("retourne l'en-tête CSV", () => {

  expect(exportCSV([])).toBe('date,libellé,montant,catégorie');

});

test('chaque transaction devient une ligne CSV', () => {

  const transactions = [
    { date: '2024-01-01', label: 'Salaire', amount: 2400, category: 'revenu' }
  ];
  expect(exportCSV(transactions)).toBe(
    'date,libellé,montant,catégorie\n2024-01-01,Salaire,2400,revenu'
  );

});

test('les transactions hors du mois en cours sont filtrées', () => {

  const transactions = [
    { date: new Date().toISOString(), label: 'Salaire', amount: 2400, category: 'revenu' },
    { date: '2020-01-01', label: 'Vieux loyer', amount: 800, category: 'logement' }
  ];
  expect(exportCSV(transactions)).toBe(
    `date,libellé,montant,catégorie\n${new Date().toISOString()},Salaire,2400,revenu`
  );
  
});