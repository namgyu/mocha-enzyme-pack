#!/usr/bin/env node

'use strict';

const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const execSync = require('child_process').execSync;
const packagePath = path.join(process.cwd(), 'package.json');
const packageJson = require(packagePath);
const useNpm = shouldUseNpm();
const useYarn = useNpm ? false : shouldUseYarn();

setMochaEnzymePack()
.then(async manager => {
    await writePackageJson();
    await copySetupFiles();
    await install(manager);
    await console.log(':::: Type the command "npm run test:unit" for test!');
})
.catch(e => {
    console.log(e.msg);
});

function shouldUseNpm() {
    console.log(':::: Checking npm...');

    try {
        execSync('npm --version');
        console.log(':::: Ok !');
        return true;
    } catch (e) {
        console.log(':::: Nope !');
        return false;
    }
}

function shouldUseYarn() {
    console.log(':::: Checking yarnpkg...');

    try {
        execSync('yarnpkg --version');
        console.log(':::: Ok !');
        return true;
    } catch (e) {
        console.log(':::: Nope !');
        return false;
    }
}

function addCommand() {
    console.log(':::: Adding "test:unit" command...');

    if (typeof packageJson.scripts['test:unit'] === 'undefined') {
        packageJson.scripts['test:unit'] = "nyc --reporter=text --reporter=html mocha || exit 0";
        console.log(':::: Added "test:unit" successfully!');
    } else {
        packageJson.scripts['test:unit@@@'] = "nyc --reporter=text --reporter=html mocha || exit 0";
        console.log(':::: Already added "test:unit", so added "test:unit@@@" temporarily!');
    }
    
}

function addDependencies() {
    console.log(':::: Adding dependencies...');

    const dependencies = {
        "babel-preset-env": "1.0.2",
        "babel-preset-react": "6.16.0",
        "babel-preset-stage-0": "6.16.0",
        "babel-register": "6.26.0",
        "chai": "4.1.2",
        "enzyme": "3.3.0",
        "enzyme-adapter-react-16": "1.1.1",
        "jsdom": "11.6.2",
        "mocha": "5.0.0",
        "nyc": "11.4.1",
        "sinon": "4.2.2"
    };

    if (typeof packageJson.devDependencies === 'undefined') {
        packageJson.devDependencies = {};
    }

    Object.keys(dependencies).map(dependency => {
        if (!(dependency in packageJson.devDependencies)) {
            packageJson.devDependencies[dependency] = `^${dependencies[dependency]}`;
        }
    });

    console.log(':::: Added dependencies successfully!');
}

function copySetupFiles() {
    console.log(':::: Copying setup.js files to your project...');

    fs.copySync(
        path.join(__dirname, '/test/'),
        path.join(process.cwd(), '/test/')
    );

    console.log(':::: Copied successfully!');
}

function writePackageJson() {
    console.log(':::: Writing on package.json...');

    addCommand();
    addDependencies();
    fs.writeFileSync(
        packagePath,
        JSON.stringify(packageJson, null, 2) + os.EOL
    );

    console.log(':::: Wrote on package.json successfully!');
}

function install(manager) {
    console.log(':::: Installing dependencies...');

    execSync(`${manager} install`);

    console.log(':::: Installed successfully!');
}


function setMochaEnzymePack() {
    return new Promise((resolve, reject) => {
        if (useNpm) {
            resolve('npm');
        } else if (useYarn) {
            resolve('yarn');
        } else {
            reject({
                msg: "Please install package manager(https://yarnpkg.com/lang/en/ or https://nodejs.org/en/) !!! "
            })
        }
    });
}
