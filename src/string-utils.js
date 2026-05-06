export function reverse(str) {
  if (str === null || str === undefined) {
    throw new Error('argument invalide');
  }
  return str.split('').reverse().join('');
}
