'use strict';

/**
* FUNCTION: set( i, j, value )
*	Sets a matrix element based on the provided row and column indices.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @param {Number} value - value to set
* @returns {Matrix} Matrix instance
*/
function set( i, j, v ) {
	/* jshint validthis: true */
	this.data[ i*this.strides[0] + j*this.strides[1] ] = v;
	return this;
} // end FUNCTION set()


// EXPORTS //

module.exports = set;
