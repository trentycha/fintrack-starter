import { exportCSV } from './export-csv.js';

test("retourne l'en-tête CSV", () => {

  expect(exportCSV([])).toBe('date,libellé,montant,catégorie');

});