import { add, subtract, multiply, divide, modulo, simpleInterest } from './calculator.js';

describe('add', () => {
  it('retourne 5 quand on additionne 2 et 3', () => {
    expect(add(2, 3)).toBe(5);
  });
});

describe('subtract', () => {
  it('retourne 4 quand on soustrait 3 de 7', () => {
    expect(subtract(7, 3)).toBe(4);
  });
});

describe('multiply', () => {
  it('retourne 6 quand on multiplie 2 et 3', () => {
    expect(multiply(2, 3)).toBe(6);
  });
});

describe('divide', () => {
  it('retourne 2 quand on divise 6 par 3', () => {
    expect(divide(6, 3)).toBe(2);
  });
});

describe('modulo', () => {
  it('retourne 2 quand on calcule le modulo de 7 par 5', () => {
    expect(modulo(7, 5)).toBe(2);
  });
});

describe('simpleInterest', () => {
  it("retourne 10 quand on calcule l'intérêt de 100 à 5% sur 2 ans", () => {
    expect(simpleInterest(100, 0.05, 2)).toBe(10);
  });
});
