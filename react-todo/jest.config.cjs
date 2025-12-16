
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx)$': ['@swc/jest'],
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
};
