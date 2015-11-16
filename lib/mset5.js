'use strict';

/**
* FUNCTION: mset5( mat, rows, cols, v )
*	Sets multiple matrix elements to a numeric value `v`.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} rows - row indices
* @param {Number[]} cols - column indices
* @param {Number} v - numeric value
* @returns {Void}
*/
function mset5( mat, rows, cols, v ) {
	var s0 = mat.strides[ 0 ],
		s1 = mat.strides[ 1 ],
		nRows = rows.length,
		nCols = cols.length,
		o = mat.offset,
		r,
		i, j;

	for ( i = 0; i < nRows; i++ ) {
		r = o + rows[i]*s0;
		for ( j = 0; j < nCols; j++ ) {
			mat.data[ r + cols[j]*s1 ] = v;
		}
	}
} // end FUNCTION mset5()


// EXPORTS //

module.exports = mset5;
