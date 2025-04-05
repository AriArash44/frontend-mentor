/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ["<rootDir>/src"],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^../routes/userPreferences.js$': '<rootDir>/src/routes/userPreferences.ts',
    '^../routes/userAuthentication.js$': '<rootDir>/src/routes/userAuthentication.ts',
    '^../db.js$': '<rootDir>/src/db.ts',
    '^../websocket.js$': '<rootDir>/src/websocket.ts',
    '^./jwtTokenHandler.js$': '<rootDir>/src/utils/jwtTokenHandler.ts',
    '^./authTokenHandler.js$': '<rootDir>/src/utils/authTokenHandler.ts',
    '^../utils/authTokenHandler.js$': '<rootDir>/src/utils/authTokenHandler.ts',
    '^../utils/dbQueryHandler.js': '<rootDir>/src/utils/dbQueryHandler.ts',
    '^../utils/jwtTokenHandler.js': '<rootDir>/src/utils/jwtTokenHandler.ts',
    '^../consts/errorMessages.js': '<rootDir>/src/consts/errorMessages.ts',
  }
};
