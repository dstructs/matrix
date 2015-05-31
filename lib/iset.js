'use strict';

/**
* FUNCTION: iset( idx, value )
*	Sets a matrix element located at a specified index.
*
* @param {Number} idx - linear index
* @param {Number} value - value to set
* @returns {Number} matrix element
*/
function iset( idx, v ) {
	/* jshint validthis: true */
	this.data[ idx ] = v;
	return this;
} // end FUNCTION iset()


// EXPORTS //

module.exports = iset;
