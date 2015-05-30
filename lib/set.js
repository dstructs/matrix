'use strict';

/**
* FUNCTION: set( i, j, value )
*	Sets a matrix element based on the provided subscripts.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @param {Number} value - value to set
* @returns {Number} matrix element
*/
function set( i, j, v ) {
	/* jshint validthis: true */
	return this.data[ i*this.strides[0] + j*this.strides[1] ] = v;
} // end FUNCTION set()


// EXPORTS //

module.exports = set;
