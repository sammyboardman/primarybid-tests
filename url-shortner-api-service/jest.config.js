module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    collectCoverage: true,
    coverageDirectory: './coverage',
    collectCoverageFrom: ['src/**/*.ts'],
    coverageReporters: ['lcov', 'text'],
    setupFiles: ['./__tests__/setup-env.ts'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
  };
