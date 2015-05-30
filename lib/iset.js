'use strict';

/**
* FUNCTION: iset( idx, value )
*	Sets a matrix element at a specified index.
*
* @param {Number} idx - linear index
* @param {Number} value - value to set
* @returns {Number} matrix element
*/
function iset( idx, v ) {
	/* jshint validthis: true */
	return this.data[ idx ] = v;
} // end FUNCTION iset()


// EXPORTS //

module.exports = iset;
