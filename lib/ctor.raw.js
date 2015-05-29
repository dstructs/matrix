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

/**
* METHOD: get( i, j )
*	Returns a matrix element based on the provided subscripts.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @returns {Number} matrix element
*/
Matrix.prototype.get = function( i, j ) {
	return this.data[ i*this.strides[0] + j*this.strides[1] ];
}; // end METHOD get()

/**
* METHOD: set( i, j, value )
*	Sets a matrix element based on the provided subscripts.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @param {Number} value - value to set
* @returns {Number} matrix element
*/
Matrix.prototype.set = function( i, j, v ) {
	return this.data[ i*this.strides[0] + j*this.strides[1] ] = v;
}; // end METHOD get()


// EXPORTS //

module.exports = Matrix;
