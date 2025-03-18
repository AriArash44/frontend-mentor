/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^../routes/userPreferences.js$': '<rootDir>/src/routes/userPreferences.ts',
    '^../db.js$': '<rootDir>/src/db.ts',
    '^../websocket.js$': '<rootDir>/src/websocket.ts',
    '^../utils/tokenChecker.js$': '<rootDir>/src/utils/tokenChecker.ts',
    '^./envValidator.js': '<rootDir>/src/utils/envValidator.ts',
  }
};
