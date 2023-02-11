import { registerDecorator, ValidationOptions } from 'class-validator';

export const validatePassword = (value: unknown): boolean => {
  const MIN_LENGTH_PASSWORD = 6;

  const minimumCharactersRule = (value: string) => {
    if (value.length >= MIN_LENGTH_PASSWORD) {
      return true;
    }

    return false;
  };

  const specialCharactersRule = (value: string) => {
    const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialCharacters.test(value)) {
      return true;
    }

    return false;
  };

  const lowerAndUpperCaseRule = (value: string) => {
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;

    if (upperCase.test(value) && lowerCase.test(value)) {
      return true;
    }

    return false;
  };

  if (typeof value !== 'string') {
    return false;
  }

  const minCharRuleOk = minimumCharactersRule(value);
  const specialCharactersRuleOk = specialCharactersRule(value);
  const lowerAndUpperCaseRuleOk = lowerAndUpperCaseRule(value);

  if (minCharRuleOk && specialCharactersRuleOk && lowerAndUpperCaseRuleOk) {
    return true;
  }

  return false;
};

export const IsPassword = (validationOptions?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate: validatePassword,
      },
    });
  };
};
