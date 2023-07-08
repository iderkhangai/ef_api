module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    './src/helpers/ErrorHandler.ts', // Exclude the specific file
  ],
};
