const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  screenshotOnRunFailure: false,
  e2e: {
    env:{
      backUrl: 'https://serverest.dev'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
