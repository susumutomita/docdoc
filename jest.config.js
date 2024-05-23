module.exports = {
  maxWorkers: 1,
  preset: 'ts-jest',
  coverageReporters: ['lcov'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/node_modules/jest-css-modules',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  projects: [
    {
      displayName: 'backend',
      testEnvironment: 'node',
      testMatch: [
        '**/__tests__/backend/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
      ],
    },
    // {
    //   displayName: 'frontend',
    //   testEnvironment: 'jsdom',
    //   testMatch: [
    //     '**/__tests__/frontend/**/*.[jt]s?(x)',
    //     '**/?(*.)+(spec|test).[jt]s?(x)',
    //   ],
    // },
  ],
};
