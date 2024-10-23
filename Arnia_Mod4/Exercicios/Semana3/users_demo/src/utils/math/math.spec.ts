import { multiply, sum } from './math';

describe('Math', () => {
  it('should correctly sum two numbers', () => {
    expect(sum(2, 3)).toEqual(5);
  });

  it('should correctly multiply two numbers', () => {
    expect(multiply(2, 2)).toEqual(4)
  })
});
