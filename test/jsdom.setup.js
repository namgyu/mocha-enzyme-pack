/**
 * Error: It looks like you called `mount()` without a global document being loaded.
 * https://github.com/airbnb/enzyme#full-dom-rendering
 */
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;
