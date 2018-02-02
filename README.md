# mocha-enzyme-pack
> mocha + chai + nyc + enzyme(for react) + jsdom(for react)

## Install
```
$ npm i mocha-enzyme-pack -g
```

## Usage

```
//package.json
...
"scripts": {
    "test:unit": "nyc --reporter=text --reporter=html mocha || exit 0"
},
...
```

```
$ npm run test:unit
```
