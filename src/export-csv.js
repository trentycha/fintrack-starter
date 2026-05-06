export function exportCSV(transactions) {
  const header = 'date,libellé,montant,catégorie';
  const lines = transactions.map((tx) => `${tx.date},${tx.label},${tx.amount},${tx.category}`);

  return [header, ...lines].join('\n');
}
