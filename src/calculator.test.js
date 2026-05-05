import { add, subtract, multiply, divide, modulo, simpleInterest } from './calculator.js';

describe('add', () => {
  it('retourne 5 quand on additionne 2 et 3', () => {
    expect(add(2, 3)).toBe(5);
  });

  it("retourne 'a2' quand on additionne une chaîne et un nombre", () => {
    expect(add('a', 2)).toBe('a2');
  });

  it('gère les très grands nombres', () => {
    expect(add(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
  });
});

describe('subtract', () => {
  it('retourne 4 quand on soustrait 3 de 7', () => {
    expect(subtract(7, 3)).toBe(4);
  });

  it('retourne NaN quand on soustrait une chaîne', () => {
    expect(subtract('a', 2)).toBeNaN();
  });

  it('retourne un nombre négatif quand b est plus grand que a', () => {
    expect(subtract(3, 7)).toBe(-4);
  });
});

describe('multiply', () => {
  it('retourne 6 quand on multiplie 2 et 3', () => {
    expect(multiply(2, 3)).toBe(6);
  });

  it('retourne 0 quand on multiplie par 0', () => {
    expect(multiply(5, 0)).toBe(0);
  });

  it('retourne NaN quand on multiplie par une chaîne', () => {
    expect(multiply('a', 2)).toBeNaN();
  });
});

describe('divide', () => {
  it('retourne 2 quand on divise 6 par 3', () => {
    expect(divide(6, 3)).toBe(2);
  });

  it('retourne Infinity quand on divise par 0', () => {
    expect(divide(10, 0)).toBe(Infinity);
  });

  it('retourne NaN quand on divise une chaîne', () => {
    expect(divide('a', 2)).toBeNaN();
  });
});

describe('modulo', () => {
  it('retourne 2 quand on calcule le modulo de 7 par 5', () => {
    expect(modulo(7, 5)).toBe(2);
  });

  it('retourne NaN quand on calcule le modulo avec une chaîne', () => {
    expect(modulo('a', 2)).toBeNaN();
  });

  it('retourne NaN quand on calcule le modulo par 0', () => {
    expect(modulo(7, 0)).toBeNaN();
  });
});

describe('simpleInterest', () => {
  it("retourne 10 quand on calcule l'intérêt de 100 à 5% sur 2 ans", () => {
    expect(simpleInterest(100, 0.05, 2)).toBe(10);
  });

  it('retourne 0 quand le principal est 0', () => {
    expect(simpleInterest(0, 5, 2)).toBe(0);
  });

  it('retourne NaN quand le taux est une chaîne', () => {
    expect(simpleInterest(100, 'a', 2)).toBeNaN();
  });
});

describe('simpleInterest avec date mockée', () => {
  const realDateNow = Date.now;

  beforeAll(() => {
    Date.now = jest.fn(() => 1700000000000);
  });

  afterAll(() => {
    Date.now = realDateNow;
  });

  it('calcule correctement avec une date fixée', () => {
    const years = (Date.now() - 1700000000000) / (1000 * 60 * 60 * 24 * 365);
    expect(simpleInterest(1000, 5, years)).toBe(0);
  });
});
