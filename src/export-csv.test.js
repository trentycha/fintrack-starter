import { exportCSV } from './export-csv.js';

test('given an empty list, when exporting, then returns only the header', () => {
  expect(exportCSV([])).toBe('date;libellé;montant;catégorie');
});

test('given a list of transactions, when exporting, then each transaction becomes a CSV row', () => {
  const date = new Date().toISOString();
  const transactions = [{ date, label: 'Salaire', amount: 2400, category: 'revenu' }];
  expect(exportCSV(transactions)).toBe(
    `date;libellé;montant;catégorie\n${date};Salaire;2400;revenu`,
  );
});

test('given a list of transactions, when exporting, then only transactions from the current month are included', () => {
  const date = new Date().toISOString();
  const transactions = [
    { date, label: 'Salaire', amount: 2400, category: 'revenu' },
    { date: '2020-01-01', label: 'Vieux loyer', amount: 800, category: 'logement' },
  ];
  expect(exportCSV(transactions)).toBe(
    `date;libellé;montant;catégorie\n${date};Salaire;2400;revenu`,
  );
});

test('given a list of transactions, when exporting, then fields containing commas are escaped', () => {
  const date = new Date().toISOString();
  const transactions = [
    { date, label: 'Courses, Carrefour', amount: 78.4, category: 'alimentation' },
  ];
  expect(exportCSV(transactions)).toBe(
    `date;libellé;montant;catégorie\n${date};"Courses, Carrefour";78.4;alimentation`,
  );
});

test('given an empty list, when exporting, then returns only the header', () => {
  expect(exportCSV([])).toBe('date;libellé;montant;catégorie');
});
