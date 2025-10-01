const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "gmsbvd",
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    trashAssetsBeforeRuns: false,
  }
})
