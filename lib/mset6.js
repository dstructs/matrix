'use strict';

/**
* FUNCTION: mset6( mat, rows, cols, m )
*	Sets multiple matrix elements using elements from another matrix.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} rows - row indices
* @param {Number[]} cols - column indices
* @param {Matrix} m - Matrix instance
*/
function mset6( mat, rows, cols, m ) {
	var nRows = rows.length,
		nCols = cols.length,
		s0, s1, s2, s3,
		r, mr,
		i, j;

	if ( m.shape[ 0 ] !== nRows || m.shape[ 1 ] !== nCols ) {
		throw new Error( 'mset()::invalid input argument. The dimensions given by the row and column indices do not match the value matrix dimensions.' );
	}
	s0 = mat.strides[ 0 ];
	s1 = mat.strides[ 1 ];
	s2 = m.strides[ 0 ];
	s3 = m.strides[ 1 ];
	for ( i = 0; i < nRows; i++ ) {
		r = rows[ i ] * s0;
		mr = i * s2;
		for ( j = 0; j < nCols; j++ ) {
			mat.data[ r + cols[j]*s1 ] = m.data[ mr + j*s3 ];
		}
	}
} // end FUNCTION mset6()


// EXPORTS //

module.exports = mset6;
