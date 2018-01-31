#!/usr/bin/env node

'use strict';

const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;
const useNpm = shouldUseNpm();
const useYarn = useNpm ? false : shouldUseYarn();

if (useNpm) {
    install('npm');
} else if (useYarn) {
    install('yarn');
} else {
    console.log('Please install package manager !');
    console.log('https://yarnpkg.com/lang/en/ or https://nodejs.org/en/');
}

function shouldUseNpm() {
    console.log('Checking npm...');

    try {
        execSync('npm --version');
        console.log('Ok !');
        return true;
    } catch (e) {
        console.log('Nope !');
        return false;
    }
}

function shouldUseYarn() {
    console.log('Checking yarnpkg...');

    try {
        execSync('yarnpkg --version');
        console.log('Ok !');
        return true;
    } catch (e) {
        console.log('Nope !');
        return false;
    }
}

function copy() {
    console.log('Copying setup.js files to your project...');

    fs.copy(
        path.join(__dirname, '/test/'),
        path.join(process.cwd(), '/test/'),
        function(err) {
            if (err) return console.error(err);
            console.log('Copied successfully!');
    });
}

function install(manager) {
    console.log('Installing dependencies...');

    try {
        execSync(`${manager} ${manager === 'npm' ? 'i' : 'add'} -D mocha chai nyc enzyme enzyme-adapter-react-16 jsdom react-addons-test-utils`);
        console.log('Installed successfully!');
        copy();
    } catch (e) {
        console.log('Failed! please retry!');
    }
}
