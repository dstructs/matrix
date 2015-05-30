'use strict';

/**
* FUNCTION: iget( idx )
*	Returns a matrix element based on the provided index.
*
* @param {Number} idx - linear index
* @returns {Number} matrix element
*/
function iget( idx ) {
	/*jshint validthis:true */
	return this.data[ idx ];
} // end FUNCTION iget()


// EXPORTS //

module.exports = iget;
