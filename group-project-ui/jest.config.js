/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */


// @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: [
    "js",
    "jsx",
    "json",
    "node",
    "ts",
    "tsx"
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: "jsdom",
  testMatch: [
    "**/__tests__/**/*.test.js",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};

module.exports = config;
