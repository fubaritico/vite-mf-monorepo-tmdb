module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    require: ['src/support/**/*.ts', 'src/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:src/reports/report.html',
      'json:src/reports/report.json',
    ],
    formatOptions: { snippetInterface: 'async-await' },
    ...(process.env.CI === 'true' ? { retry: 1 } : {}),
  },
}