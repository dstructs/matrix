'use strict';

/**
* FUNCTION: iget( idx )
*	Returns a matrix element located at a specified index.
*
* @param {Number} idx - linear index
* @returns {Number} matrix element
*/
function iget( idx ) {
	/*jshint validthis:true */
	if ( idx < 0 ) {
		idx += this.length;
	}
	return this.data[ idx ];
} // end FUNCTION iget()


// EXPORTS //

module.exports = iget;
