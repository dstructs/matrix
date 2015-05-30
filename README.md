Matrix
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Matrices.


## Installation

``` bash
$ npm install compute-matrix
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var matrix = require( 'compute-matrix' );
```

#### matrix( [data,] shape[, dtype] )

Creates a new `Matrix` having a specified `shape` (*dimensions*: `[rows,cols]`).

``` javascript
var mat = matrix( [3,2] );
/*
	[ 0 0
	  0 0
	  0 0 ]
*/
```

By default, the matrix elements are floating-point 64-bit numbers (`float64`). To specify a different data type, provide a `dtype`.

``` javascript
var mat = matrix( [2,2], 'int8' );
/*
	[ 0 0
	  0 0 ]
*/
```

The following `dtypes` are accepted:

*	`int8`
*	`uint8`
*	`uint8_clamped`
*	`int16`
*	`uint16`
*	`int32`
*	`uint32`
*	`float32`
*	`float64`


If a __linear__ `numeric array` is not provided, the function initializes a __zero-filled__ matrix. To initialize a matrix, provide an input `data` array, whose length matches the specified `shape`.

``` javascript
var data = new Int8Array( 4 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}

var mat = matrix( data, [2,2] );
/*
	[ 0 1
	  2 3 ]
*/
```

To cast an input `data` array to a different data type, provide a `dtype`.

``` javascript
var mat = matrix( data, [2,2], 'uint32' );
/*
	[ 0 1
	  2 3 ]
*/
```


===
### Properties

A `Matrix` has the following properties...


#### mat.dtype

A __read-only__ property returning the underlying storage data type.

``` javascript
var dtype = mat.dtype;
// returns <string>
```


#### mat.ndims

A __read-only__ property returning the number of dimensions.

``` javascript
var ndims = mat.ndims;
// returns 2
```


#### mat.shape

A __read-only__ property returning the matrix `shape`.

``` javascript
var shape = mat.shape;
// returns [...]
```


#### mat.strides

A __read-only__ property returning the `strides` used to index into the underlying data store.

``` javascript
var strides = mat.strides;
// returns [...]
```


#### mat.length

A __read-only__ property returning the matrix `length`; i.e., how many elements are in the `Matrix`, similar to `Array#length`.

``` javascript
var len = mat.length;
// returns <number>
```

__Note__: while a `Matrix` has a `length` property, a `Matrix` should __not__ be considered `array-like`, as `array` indexing with __not__ work as expected.

``` javascript
var data = new Float32Array( 10 );

var mat = matrix( data, [10,1] );

var value = mat.get( 3, 1 );
// returns 0

value = mat[ 3 ];
// returns undefined
```


#### mat.nbytes

A __read-only__ property returning the number of bytes consumed by the `Matrix` elements.

``` javascript
var nbytes = mat.nbytes;
// returns <number>
```


#### mat.data

A __read-only__ property pointing to the underlying storage array.

``` javascript
var data = mat.data;
// returns <TypedArray>
```

===
### Methods

A `Matrix` has the following methods...


#### mat.get( i, j )

Returns a `Matrix` element specified according to the provided subscripts.

``` javascript
var data = new Float32Array( 10 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}

var mat = matrix( data, [5,2] );
/*
	[ 0 1
	  2 3
	  4 5
	  6 7
	  8 9 ]
*/

var values = mat.get( 3, 1 );
// returns 7
```

__Note__: out-of-bounds subscripts will return a value of `undefined`.


#### mat.set( i, j, value )

Sets a `Matrix` element specified according to the provided subscripts.

``` javascript
mat.set( 3, 1, 20 );
/*
	[ 0 1
	  2 3
	  4 5
	  6 20
	  8 9 ]
*/
```

__Note__: out-of-bounds subscripts will silently fail.






===
## Examples

``` javascript
var matrix = require( 'compute-matrix' );

// Create a new 2x2 matrix:
var mat = matrix( [2,2] );
console.log( mat );

// Inspect the initialized matrix elements:
console.log( mat.get( 1, 1 ) );

// Set a matrix element:
console.log( mat.set( 1, 1, 5  ) );

// Confirm that the matrix element was set:
console.log( mat.get( 1, 1 ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The Compute.io Authors.


[npm-image]: http://img.shields.io/npm/v/compute-matrix.svg
[npm-url]: https://npmjs.org/package/compute-matrix

[travis-image]: http://img.shields.io/travis/compute-io/matrix/master.svg
[travis-url]: https://travis-ci.org/compute-io/matrix

[coveralls-image]: https://img.shields.io/coveralls/compute-io/matrix/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/matrix?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/matrix.svg
[dependencies-url]: https://david-dm.org/compute-io/matrix

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/matrix.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/matrix

[github-issues-image]: http://img.shields.io/github/issues/compute-io/matrix.svg
[github-issues-url]: https://github.com/compute-io/matrix/issues
