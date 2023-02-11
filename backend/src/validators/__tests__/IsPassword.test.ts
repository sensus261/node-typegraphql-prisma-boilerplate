import { validatePassword } from '../IsPassword';

describe('Test IsPassword validator', () => {
  test('IsPassword validates as expected', () => {
    expect(validatePassword('123')).toEqual(false);
    expect(validatePassword('abcdef')).toEqual(false);
    expect(validatePassword('123abcde')).toEqual(false);
    expect(validatePassword('123abcdeF')).toEqual(false);
    expect(validatePassword('123abcdeF!@')).toEqual(true);
  });
});
