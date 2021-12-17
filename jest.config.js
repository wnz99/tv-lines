module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['dist', 'node_modules*'],
  testMatch: [
    '<rootDir>/src/**/?(*.)+(spec|test).ts?(x)',
    '<rootDir>/test/**/?(*.)+(spec|test).ts?(x)',
  ],
  modulePaths: ['<rootDir>/src', '<rootDir>/test'],
  setupFiles: ['<rootDir>/setupTests.js'],
  setupFilesAfterEnv: ['jest-extended/all'],
};
