govivant.js
============

Govivant Javascript SDK for Angular.js

### Installation
`bower install govivant-js`

#### Dependencies
The SDK relies on Angular.js and ngResource
```
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.x/angular.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.x/angular-resource.min.js"></script>
```

#### Download
Production (minified):
```
<script src="//assets.govivant.com/js/govivant/VERSION/govivant.min.js"></script>
<script>govivant('production')</script>
```

Development:
```
<script src="//assets.govivant.com/js/govivant/VERSION/govivant.js"></script>
<script>govivant('development')</script>
```

Development
===========

Start by installing gulp globally if you have not already:
```
npm install -g gulp
```

Install gulp dependencies
```
npm install
```

To watch files as you make changes run:
```
make js
```
This will allow you to develop and run unit tests without rebuilding from the terminal.


#### Build SDK

Simply call:
```
make
```
This will build `govivant.js` and `govivant-dev.js` in the `./build` directory.

or

```
gulp release
```

for building govivant.js, and govivant.min.js in the `./release` directory.

#### Testing

To run the unit tests call:
```
make tests
```


You can also open `./test/index.html` manually.
