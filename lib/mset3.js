'use strict';

/**
* FUNCTION: mset3( mat, idx, m )
*	Sets multiple matrix elements using elements from another matrix.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} idx - linear indices
* @param {Matrix} m - Matrix instance
*/
function mset3( mat, idx, m ) {
	var len = idx.length,
		i;

	if ( m.length !== len ) {
		throw new Error( 'mset()::invalid input argument. Number of indices does not match the number of elements in the value matrix.' );
	}
	for ( i = 0; i < len; i++ ) {
		mat.data[ idx[ i ] ] = m.data[ i ];
	}
} // end FUNCTION mset3()


// EXPORTS //

module.exports = mset3;
