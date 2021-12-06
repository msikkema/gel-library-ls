/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import { defaults } from "jest-config";

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testMatch: ['<rootDir>/**/__tests__/*.test.ts?(x)'],
};