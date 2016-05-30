mysdk.js
============

mysdk Javascript SDK for Angular.js

### Installation
`bower install mysdk-js`

#### Dependencies
The SDK relies on Angular.js and ngResource
```
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.x/angular.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.x/angular-resource.min.js"></script>
```

#### Download
Production (minified):
```
<script src="//assets.mysdk.com/js/mysdk/VERSION/mysdk.min.js"></script>
<script>mysdk('production')</script>
```

Development:
```
<script src="//assets.mysdk.com/js/mysdk/VERSION/mysdk.js"></script>
<script>mysdk('development')</script>
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
This will build `mysdk.js` and `mysdk-dev.js` in the `./build` directory.

or

```
gulp release
```

for building mysdk.js, and mysdk.min.js in the `./release` directory.

#### Testing

To run the unit tests call:
```
make tests
```


You can also open `./test/index.html` manually.
