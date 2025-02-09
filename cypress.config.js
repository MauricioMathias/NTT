const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    backUrl: 'https://serverest.dev',
    frontUrl: 'https://front.serverest.dev'
  },
  watchForFileChanges: false,
  screenshotOnRunFailure: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
