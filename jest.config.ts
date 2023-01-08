import type {Config} from 'jest';

const config: Config = {
  'verbose': true,
  'transform': {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  'reporters': ['default', 'github-actions'],
  'collectCoverageFrom': [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  'coverageReporters': ['clover', 'json', 'lcov', ['text', {skipFull: true}]],
  'coverageThreshold': {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },
  'projects': [
    {
      displayName: {
        color: 'green',
        name: 'ts-test'
      },
      testMatch: ['<rootDir>/source/test/**/*.spec.ts']
    },
    {
      displayName: {
        color: 'blue',
        name: 'types'
      },
      runner: 'jest-runner-tsd',
      testMatch: ['<rootDir>/source/test/types/**/*.spec.ts']
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/source/lib/**/*.ts']
    }
  ]
};

export default config;
