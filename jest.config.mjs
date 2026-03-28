/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|mjs|ts)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@shoelace-style|lit|@lit|lit-html|lit-element|@open-wc|@esm-bundle|@web|chai|chai-a11y-axe|axe-core)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

export default config;
