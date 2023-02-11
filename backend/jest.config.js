module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  // testMatch: ['**/tests/**/*.test.(ts|js)'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['node_modules', 'build'],
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src$1',
  },
};
