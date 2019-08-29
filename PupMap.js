const puppeteer = require('puppeteer');

class PupMap {
  set emulateOptions(value) {
    this._emulateOptions = value;
  }
  set options(value) {
    this._options = value;
  }
  set setBeforeInitFunction(func) {
    this._beforeInitFunction = func;
  }
  set setAfterInitFunction(func) {
    this._afterInitFunction = func;
  }
  set setBeforeGotoFunction(func) {
    this._beforeGotoFunction = func;
  }
  set setAfterGotoFunction(func) {
    this._afterGotoFunction = func;
  }
  set setBeforeCloseFunction(func) {
    this._beforeCloseFunction = func;
  }
  set setAfterCloseFunction(func) {
    this._afterCloseFunction = func;
  }
  constructor() {
    this.browser = false;
    this.page = false;
    this._options = {};
    this._emulateOptions = {};
    this._beforeInitFunction = function() {};
    this._afterInitFunction = function() {};
    this._beforeGotoFunction = function() {};
    this._afterGotoFunction = function() {};
    this._beforeCloseFunction = function() {};
    this._afterCloseFunction = function() {};
  }

  async init() {
    this._beforeInitFunction();
    this.browser = await puppeteer.launch(this._options);
    this.page = await this.browser.newPage();
    await this.page.emulate(this._emulateOptions);
    this._afterInitFunction();
  }

  async goto(url) {
    this._beforeGotoFunction();
    const data = await this.page.goto(url);
    this._afterGotoFunction();
    return data;
  }

  async close() {
    this._beforeCloseFunction();
    this.browser.close();
    this._afterCloseFunction();
  }


}
module.exports = PupMap;
