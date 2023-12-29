import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testTimeout: 20 * 1000, // 20 seconds
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './../..',
  testEnvironment: 'node',
  testRegex: '.e2e.test.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/features/**/*.{ts,jsx}'],
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/src/app/main.ts',
    '.module.ts',
  ],
  collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/test/e2e/setup-file-after-env.ts'],
  coverageDirectory: 'coverage.e2e',
  coverageReporters: ['html', ['text', { skipFull: false }], 'json'],
  verbose: true,
  clearMocks: true,
  restoreMocks: true,
};
export default config;
