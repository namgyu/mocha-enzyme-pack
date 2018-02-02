# mocha-enzyme-pack
> mocha + chai + sinon + nyc + enzyme(for react) + jsdom(for react)

## Install
```
$ npm i mocha-enzyme-pack -g
```

## Usage

```
$ mocha-enzyme-pack
```

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
