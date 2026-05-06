function escapeField(value) {
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportCSV(transactions) {
  const header = 'date;libellé;montant;catégorie';
  const now = new Date();
  const lines = transactions
    .filter((tx) => {
      const d = new Date(tx.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .map(
      (tx) =>
        `${escapeField(tx.date)};${escapeField(tx.label)};${escapeField(tx.amount)};${escapeField(tx.category)}`,
    );
  return [header, ...lines].join('\n');
}
