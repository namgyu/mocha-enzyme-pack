/**
 * Error: It looks like you called `mount()` without a global document being loaded.
 * https://github.com/airbnb/enzyme#full-dom-rendering
 */
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;
