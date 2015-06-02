'use strict';

/**
* FUNCTION: mset4( mat, rows, cols, clbk, ctx )
*	Sets multiple matrix elements using a callback function.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} rows - row indices
* @param {Number[]} cols - column indices
* @param {Function} clbk - callback function
* @param {Object} ctx - `this` context when invoking the provided callback
*/
function mset4( mat, rows, cols, clbk, ctx ) {
	var nRows = rows.length,
		nCols = cols.length,
		idx,
		s0, s1,
		r,
		i, j;

	s0 = mat.strides[ 0 ];
	s1 = mat.strides[ 1 ];
	for ( i = 0; i < nRows; i++ ) {
		r = rows[ i ] * s0;
		for ( j = 0; j < nCols; j++ ) {
			idx = r + cols[j]*s1;
			mat.data[ idx ] = clbk.call( ctx, mat.data[ idx ], rows[ i ], cols[ j ], idx );
		}
	}
} // end FUNCTION mset4()


// EXPORTS //

module.exports = mset4;
