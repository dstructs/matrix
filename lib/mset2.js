'use strict';

/**
* FUNCTION: mset2( mat, idx, clbk, ctx )
*	Sets multiple matrix elements using a callback function.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} idx - linear indices
* @param {Function} clbk - callback function
* @param {Object} ctx - `this` context when invoking the provided callback
*/
function mset2( mat, idx, clbk, ctx ) {
	var nRows = mat.shape[ 0 ],
		len = idx.length,
		r, c,
		i, j;

	for ( i = 0; i < len; i++ ) {
		j = idx[ i ];

		// Determine the row and column indices...
		c = j % nRows; // remainder
		r = ( j - c ) / nRows;

		mat.data[ j ] = clbk.call( ctx, mat.data[ j ], r, c, j );
	}
} // end FUNCTION mset2()


// EXPORTS //

module.exports = mset2;
