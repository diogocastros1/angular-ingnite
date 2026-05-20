/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/app/core/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@features/(.*)$': '<rootDir>/src/app/features/$1',
    '^@models/(.*)$': '<rootDir>/src/app/models/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1'
  },
  testPathIgnorePatterns: ['/node_modules/', '/e2e/']
};
