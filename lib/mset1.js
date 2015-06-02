'use strict';

/**
* FUNCTION: mset1( mat, idx, v )
*	Sets multiple matrix elements to a numeric value `v`.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} idx - linear indices
* @param {Number} v - numeric value
*/
function mset1( mat, idx, v ) {
	var len = idx.length,
		i;

	for ( i = 0; i < len; i++ ) {
		mat.data[ idx[ i ] ] = v;
	}
} // end FUNCTION mset1()


// EXPORTS //

module.exports = mset1;
