'use strict';

/**
* FUNCTION: iget( idx )
*	Returns a matrix element located at a specified index.
*
* @param {Number} idx - linear index
* @returns {Number|Undefined} matrix element
*/
function iget( idx ) {
	/*jshint validthis:true */
	var r, j;
	if ( idx < 0 ) {
		idx += this.length;
		if ( idx < 0 ) {
			return;
		}
	}
	j = idx % this.strides[ 0 ];
	r = idx - j;
	if ( this.strides[ 0 ] < 0 ) {
		r = -r;
	}
	return this.data[ this.offset + r + j*this.strides[1] ];
} // end FUNCTION iget()


// EXPORTS //

module.exports = iget;
