export function exportCSV(transactions) {
  const header = 'date,libellé,montant,catégorie';
  const now = new Date();
  const lines = transactions
    .filter((tx) => {
      const d = new Date(tx.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .map((tx) => `${tx.date},${tx.label},${tx.amount},${tx.category}`);
  return [header, ...lines].join('\n');
}
