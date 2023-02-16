module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['node_modules', 'build'],
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src$1',
  },
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  //   collectCoverage: true,
  //   coverageDirectory: 'coverage',
  //   coverageReporters: ['text', 'lcov'],
};
