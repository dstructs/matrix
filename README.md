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

<a name="matrix"></a>
#### matrix( [data,] shape[, dtype] )

Creates a new `Matrix` having a specified `shape` (dimensions => `[rows,cols]`).

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
var data = new Int8Array( 6 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}

var mat = matrix( data, [2,3] ); // 2*3 = 6
/*
	[ 0 1 2
	  3 4 5 ]
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


<a name="matrix-dtype" class="read-only-property"></a>
#### mat.dtype

A __read-only__ property returning the underlying storage data type.

``` javascript
var dtype = mat.dtype;
// returns <string>
```

<a name="matrix-ndims" class="read-only-property"></a>
#### mat.ndims

A __read-only__ property returning the number of dimensions.

``` javascript
var ndims = mat.ndims;
// returns 2
```

<a name="matrix-shape" class="read-only-property"></a>
#### mat.shape

A __read-only__ property returning the matrix `shape`.

``` javascript
var shape = mat.shape;
// returns [...]
```

<a name="matrix-strides" class="read-only-property"></a>
#### mat.strides

A __read-only__ property returning the `strides` used to index into the underlying data store.

``` javascript
var strides = mat.strides;
// returns [...]
```

<a name="matrix-length" class="read-only-property"></a>
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
// [ 0 0 0 0 0 0 0 0 0 0 ]

var value = mat.get( 3, 1 );
// returns 0

value = mat[ 3 ];
// returns undefined
```

<a name="matrix-nbytes" class="read-only-property"></a>
#### mat.nbytes

A __read-only__ property returning the number of bytes consumed by the `Matrix` elements.

``` javascript
var nbytes = mat.nbytes;
// returns <number>
```

<a name="matrix-data" class="read-only-property"></a>
#### mat.data

A __read-only__ property pointing to the underlying storage array.

``` javascript
var data = mat.data;
// returns <TypedArray>
```

===
### Methods

A `Matrix` has the following methods...


<a name="matrix-set"></a>
#### mat.set( i, j, value )

Sets a `Matrix` element located at a row and column index.

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

Set methods return the `Matrix` instance and are thus chainable.

``` javascript
mat
	.set( 3, 1, 21 )
	.set( 3, 1, 22 )
	.set( 3, 1, 23 )
	.set( 3, 1, 24 )
	.get( 3, 1 );
// returns 24
```

__Note__: out-of-bounds row and column indices will silently fail.


<a name="matrix-iset"></a>
#### mat.iset( index, value )

Sets a `Matrix` element located at a specified [`index`](#linear-indexing). If `index < 0`, the index refers to a position relative to the `Matrix` length, where `index = -1` corresponds to the last element. 

``` javascript
mat.iset( 7, 25 );
/*
	[ 0 1
	  2 3
	  4 5
	  6 25
	  8 9 ]
*/

mat.iset( -3, 20 );
/*
	[ 0 1
	  2 3
	  4 5
	  6 20
	  8 9 ]
*/
```

__Note__: out-of-bounds indices will silently fail.


<a name="matrix-sset"></a>
#### mat.sset( subsequence, value[, thisArg] )

Sets `Matrix` elements according to a specified [`subsequence`](https://github.com/compute-io/indexspace). The `subsequence` must specify __both__ row and column subsequences; e.g., `'3:7,5:9'`, where `3:7` corresponds to row indices `3,4,5,6` and `5:9` corresponds to column indices `5,6,7,8`. The second argument may be either a `number` primitive, a `Matrix` containing values to set, or a callback `function`.

``` javascript
var data = new Float32Array( 10*10 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
// Create a 10x10 matrix:
var mat = matrix( data, [10,10] );

var submat = mat.sget( '3:7,5:9' );
/*
	[ 35 36 37 38
	  45 46 47 48
	  55 56 57 58
	  65 66 67 68 ]
*/

var zeros = matrix( [2,2], 'float32' );
/*
	[ 0 0
	  0 0 ]
*/

mat.sset( '4:6,6:8', zeros );

submat = mat.sget( '3:7,5:9' );
/*
	[ 35 36 37 38
	  45  0  0 48
	  55  0  0 58
	  65 66 67 68 ]
*/
```

A callback is provided four arguments:
*	__d__: value at a subsequence index
*	__i__: row index
*	__j__: column index
*	__idx__: linear index

and is __expected__ to return a `number` primitive or a value which can be cast to a `number` primitive. 

``` javascript
function set( d, i, j, idx ) {
	return '' + j + i;
}

mat.sset( '4:6,6:8', set );

submat = mat.sget( '3:7,5:9' );
/*
	[ 35 36 37 38
	  45 64 74 48
	  55 65 75 58
	  65 66 67 68 ]
*/
```

By default, the callback `this` context is set to the `Matrix` instance. To specify a different `this` context, provide a `thisArg`.

``` javascript
function set( d, i, j, idx ) {
	console.log( this );
	// returns null
	return '' + j + i;
}

mat.sset( '4:6,6:8', set, null );
```


__Notes__:
*	Values which are set are cast to the target `Matrix` data type.
*	A provided `Matrix` must have dimensions which match the submatrix defined by row and column subsequences.
*	For further subsequence documentation, see [compute-indexspace](https://github.com/compute-io/indexspace).


<a name="matrix-get"></a>
#### mat.get( i, j )

Returns a `Matrix` element located at a row and column index.

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

__Note__: out-of-bounds row and column indices will return a value of `undefined`.


<a name="matrix-iget"></a>
#### mat.iget( index )

Returns a `Matrix` element located at a specified [`index`](#linear-indexing). If `index < 0`, the index refers to a position relative to the `Matrix` length, where `index = -1` corresponds to the last element. 

``` javascript
var value = mat.iget( 7 );
// returns 7

value = mat.iget( -3 );
// returns 7
```

__Note__: out-of-bounds indices will return a value of `undefined`.


<a name="matrix-sget"></a>
#### mat.sget( subsequence )

Returns `Matrix` elements in a new `Matrix` according to a specified [`subsequence`](https://github.com/compute-io/indexspace). The `subsequence` must specify __both__ row and column subsequences; e.g., `'3:7,5:9'`, where `3:7` corresponds to row indices `3,4,5,6` and `5:9` corresponds to column indices `5,6,7,8`. If a `subsequence` does not correspond to any `Matrix` elements, the method returns an empty `Matrix`.

``` javascript
var submatrix;

submatrix = mat.sget( ':,:' ); // Copy a matrix
/*
	[ 0 1
	  2 3
	  4 5 
	  6 7
	  8 9 ]
*/

submatrix = mat.sget( '1:4,:' );
/*
	[ 2 3
	  4 5
	  6 7 ]
*/

submatrix = mat.sget( '::-1,:' ); // flip top-to-bottom
/*
	[ 8 9
	  6 7
	  4 5
	  2 3
	  0 1 ]
*/

submatrix = mat.sget( ':,::-1' ); // flip left-to-right
/*
	[ 1 0
	  3 2
	  5 4
	  7 6
	  9 8 ]
*/

submatrix = mat.sget( '50:100,:' );
/*
	[]
*/
```

For further subsequence documentation, see [compute-indexspace](https://github.com/compute-io/indexspace).



<a name="matrix-tostring"></a>
#### mat.toString()

Returns a `string` representation of a `Matrix`. This method is similar to [`Array#toString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString), except that rows are delineated by __semicolons__ and column values are delineated by __commas__.

``` javascript
var data = new Int8Array( 10 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}

var mat = matrix( data, [5,2] );

var str = mat.toString();
// 0,1;2,3;4,5;6,7;8,9
```

To construct an `array` of `arrays` from the `string` representation,

``` javascript
var rows,
	cols,
	i, j;

rows = str.split( ';' );
for ( i = 0; i < rows.length; i++ ) {
	cols = rows[ i ].split( ',' );
	rows[ i ] = new Array( cols.length );
	for ( j = 0; j < cols.length; j++ ) {
		rows[ i ][ j ] = parseFloat( cols[ j ] );
	}	
}
```


===
<a name="matrix-constructor"></a>
### Constructor

A `Matrix` has a constructor having the following interface...


#### mat.constructor( data, shape, dtype )

Creates a new `Matrix` having a specified `shape`, `dtype`, and underlying typed `data` store.

``` javascript
var data = new Float32Array( 10 );

var mat1 = matrix( data, [5,2] );
/*
	[ 0 0
	  0 0
	  0 0
	  0 0
	  0 0 ]
*/

var mat2 = new mat1.constructor( data, [2,5], 'float32' );
/*
	[ 0 0 0 0 0
	  0 0 0 0 0 ]
*/
```

__Note__: while more performant, constructing a `Matrix` in this manner should be carefully considered. Arguments are not validated or sanity checked.


===
### Raw

For performance, a lower-level interface is provided which forgoes some of the guarantees of the above API, such as input argument validation and measures to prevent `Matrices` from becoming corrupted. While use of the above API is encouraged in REPL environments, use of the lower-level interface may be warranted when arguments are of a known type or when many `Matrices` must be created.



<a name="matrix-raw"></a>
#### matrix.raw( [data,] shape[, dtype] )

Creates a new `Matrix` having a specified `shape`.

``` javascript
var data = new Float32Array( 10 );

var mat = matrix.raw( data, [5,2] );
/*
	[ 0 0
	  0 0
	  0 0
	  0 0
	  0 0 ]
*/
```

If the input `data` type is known, `Matrix` creation is significantly faster.

``` javascript
var mat = matrix.raw( data, [5,2], 'float32' );
/*
	[ 0 0
	  0 0
	  0 0
	  0 0
	  0 0 ]
*/
```

### Notes

* 	The `shape` and `dtype` parameters are the same as for the higher-level `Matrix` interface.
*	Specifying a `dtype` does __not__ cast the data to a different storage type. Instead, providing the argument circumvents the need to determine the input `data` type, resulting in increased performance.
*	`Matrix` properties and methods are the same as for the higher-level API, with the exception that `Matrix` properties are __no__ longer read-only.
* 	Setting properties is __not__ recommended as the `Matrix` can become corrupted; e.g., incompatible dimensions, out-of-bounds indexing, etc. In contrast to the strict API above, setting `Matrix` properties will __not__ result in an `error` being thrown. Accordingly, property modification may introduce silent bugs. 
*	The lower-level `Matrix` constructor has the same interface as the higher-level `Matrix` constructor.



---
### Notes

#### Linear Indexing

A linear `index` corresponds to an element position in a flattened `Matrix` arranged in __row-major__ order. For example, consider a __zero-filled__ 5x2 matrix, its subscripts, and its corresponding linear indices.

``` javascript
/*
	Matrix      Subscripts      Indices

	[ 0 0       [ a00 a01       [ 0 1
	  0 0         a10 a11         2 3
A =	  0 0   =>    a20 a21   =>    4 5
	  0 0         a30 a31         6 7
	  0 0 ]       a40 a41 ]       8 9 ]
*/
```


---
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


---
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
