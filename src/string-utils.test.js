import {
  reverse
} from './string-utils';

test('reverse "abc" returns "cba"', () => { 
    expect(reverse('abc')).toBe('cba');
});

test('reverse "" retourne ""', () => {
  expect(reverse('')).toBe('');
});

test('reverse(null) retourne une erreur avec le message "argument invalide"', () => {
  expect(() => reverse(null)).toThrow('argument invalide');
});