'use strict';

/**
 * Configuración de Jest con cobertura (Istanbul).
 *
 * Quality gate de la pipeline: si la cobertura baja de los umbrales, el job falla.
 *
 * Reportes:
 *  - text / text-summary: salida en consola del CI.
 *  - lcov: para Codecov, SonarQube y la mayoría de IDEs.
 *  - html: reporte navegable en coverage/lcov-report/index.html.
 *  - cobertura: XML estándar (Azure DevOps, GitLab, SonarQube).
 *  - json-summary: para badges y comentarios en PRs.
 */
module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/*.js',
    '!src/index.js',
    '!src/server.js', // solo arranca el servidor (listen); se valida en el despliegue con smoke test
    '!**/node_modules/**',
  ],

  coverageDirectory: 'coverage',

  coverageReporters: [
    'text',
    'text-summary',
    'lcov',
    'html',
    'cobertura',
    'json-summary',
  ],

  // Quality gate: si baja de estos umbrales, jest falla con exit code != 0
  // y por lo tanto el pipeline de CI también falla.
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './src/discountCalculator.js': {
      branches: 90,
      lines: 95,
    },
  },

  testMatch: ['<rootDir>/tests/*.test.js'],

  verbose: true,
  clearMocks: true,
};
