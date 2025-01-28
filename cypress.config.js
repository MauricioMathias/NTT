const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env:{
      backUrl: 'https://serverest.dev'
    },
  specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
  baseUrl: 'https://front.serverest.dev',
  supportFile: false,
  video: false,
  reporter: 'mochawesome',
  reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: true,
  json: true
  }
  }
  });