'use strict';

// MATRIX //

/**
* FUNCTION: Matrix( data, dtype, shape, offset, strides )
*	Matrix constructor.
*
* @constructor
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} data - input typed array
* @param {String} dtype - matrix data type
* @param {Number[]} shape - matrix dimensions/shape
* @param {Number} offset - matrix offset
* @param {Number[]} strides - matrix strides
* @returns {Matrix} Matrix instance
*/
function Matrix( data, dtype, shape, offset, strides ) {
	if ( !( this instanceof Matrix ) ) {
		return new Matrix( data, dtype, shape, offset, strides );
	}
	// Underlying data type:
	Object.defineProperty( this, 'dtype', {
		'value': dtype,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix dimensions:
	Object.defineProperty( this, 'shape', {
		'value': shape,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix strides:
	Object.defineProperty( this, 'strides', {
		'value': strides,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix offset:
	Object.defineProperty( this, 'offset', {
		'value': offset,
		'configurable': false,
		'enumerable': true,
		'writable': true
	});

	// Number of matrix dimensions:
	Object.defineProperty( this, 'ndims', {
		'value': shape.length,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix length:
	Object.defineProperty( this, 'length', {
		'value': data.length,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Number of bytes used by the matrix elements:
	Object.defineProperty( this, 'nbytes', {
		'value': data.byteLength,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix data store:
	Object.defineProperty( this, 'data', {
		'value': data,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	return this;
} // end FUNCTION Matrix()


// METHODS //

Matrix.prototype.set = require( './set.js' );
Matrix.prototype.iset = require( './iset.js' );
Matrix.prototype.mset = require( './mset.js' );
Matrix.prototype.sset = require( './sset.js' );

Matrix.prototype.get = require( './get.js' );
Matrix.prototype.iget = require( './iget.js' );
Matrix.prototype.mget = require( './mget.js' );
Matrix.prototype.sget = require( './sget.js' );

Matrix.prototype.toString = require( './tostring.js' );
Matrix.prototype.toJSON = require( './tojson.js' );


// EXPORTS //

module.exports = Matrix;
