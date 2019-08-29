const puppeteer = require('puppeteer');

class PupMap {
  constructor() {
    this.browser = false;
    this.page = false;
    this.options = {};
    this.emulateOptions = {};
    this.beforeInitFunction = function() {};
    this.afterInitFunction = function() {};
    this.beforeCloseFunction = function() {};
    this.afterCloseFunction = function() {};
  }

  async init() {
    this.beforeInitFunction();
    this.browser = await puppeteer.launch(this.options);
    this.page = await this.browser.newPage();
    await this.page.emulate(this.emulateOptions);
    this.afterInitFunction();
  }

  async close() {
    this.beforeCloseFunction();
    this.browser.close();
    this.afterCloseFunction();
  }

  setBeforeInitFunction(func) {
    this.beforeInitFunction = func;
  }
  setAfterInitFunction(func) {
    this.afterInitFunction = func;
  }
  setBeforeCloseFunction(func) {
    this.beforeCloseFunction = func;
  }
  setAfterCloseFunction(func) {
    this.afterCloseFunction = func;
  }
}
module.exports = PupMap;
