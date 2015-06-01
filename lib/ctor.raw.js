'use strict';

// MATRIX //

/**
* FUNCTION: Matrix( data, shape, dtype )
*	Matrix constructor.
*
* @constructor
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} data - input typed array
* @param {Number[]} shape - matrix dimensions/shape
* @param {String} dtype - matrix data type
* @returns {Matrix} Matrix instance
*/
function Matrix( data, shape, dtype ) {
	var strides,
		ndims,
		s, i;

	if ( !( this instanceof Matrix ) ) {
		return new Matrix( data, shape, dtype );
	}
	ndims = shape.length;

	// Determine the matrix strides...
	strides = new Array( ndims );
	s = 1;
	for ( i = ndims-1; i >= 0; i-- ) {
		strides[ i ] = s;
		s *= shape[ i ];
	}

	this.dtype = dtype;
	this.shape = shape;
	this.strides = strides;
	this.ndims = ndims;
	this.length = data.length;
	this.nbytes = data.byteLength;
	this.data = data;

	return this;
} // end FUNCTION Matrix()


// METHODS //

Matrix.prototype.set = require( './set.raw.js' );
Matrix.prototype.iset = require( './iset.raw.js' );
Matrix.prototype.sset = require( './sset.raw.js' );

Matrix.prototype.get = require( './get.raw.js' );
Matrix.prototype.iget = require( './iget.raw.js' );
Matrix.prototype.mget = require( './mget.raw.js' );
Matrix.prototype.sget = require( './sget.raw.js' );

Matrix.prototype.toString = require( './toString.js' );


// EXPORTS //

module.exports = Matrix;
