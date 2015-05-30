'use strict';

/**
* FUNCTION: get( i, j )
*	Returns a matrix element based on the provided subscripts.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @returns {Number} matrix element
*/
function get( i, j ) {
	/*jshint validthis:true */
	return this.data[ i*this.strides[0] + j*this.strides[1] ];
} // end FUNCTION get()


// EXPORTS //

module.exports = get;
