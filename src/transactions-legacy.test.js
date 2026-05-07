import { processTransactions, legacyHelper } from './transactions-legacy.js';

const makeTx = (overrides) => ({
  id: 1,
  date: new Date().toISOString(),
  label: 'Test',
  amount: 100,
  type: 'credit',
  currency: 'EUR',
  ...overrides,
});

describe('processTransactions', () => {

  it('retourne un objet avec transactions, total, errors et warnings', () => {
    const result = processTransactions([makeTx()]);
    expect(result).toHaveProperty('transactions');
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('errors');
    expect(result).toHaveProperty('warnings');
  });

  it('filtre les transactions hors du mois en cours', () => {
    const oldTx = makeTx({ date: '2020-01-01T00:00:00.000Z' });
    const result = processTransactions([oldTx]);
    expect(result.transactions).toHaveLength(0);
  });

  it('ajoute une erreur si le type est invalide', () => {
    const result = processTransactions([makeTx({ type: 'invalid' })]);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('convertit un montant USD en EUR', () => {
    const result = processTransactions([makeTx({ currency: 'USD', amount: 100 })], { currency: 'EUR' });
    expect(result.transactions[0].amount).toBeCloseTo(92);
  });

  it('flag une transaction débit qui dépasse le seuil', () => {
    const result = processTransactions([makeTx({ type: 'debit', amount: 1500 })], { threshold: 1000 });
    expect(result.transactions[0].flagged).toBe(true);
  });
});

describe('legacyHelper', () => {
  it('retourne null si x est null', () => {
    expect(legacyHelper(null)).toBeNull();
  });

  it('trimme une chaîne', () => {
    expect(legacyHelper('  hello  ')).toBe('hello');
  });

});