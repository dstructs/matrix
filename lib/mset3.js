'use strict';

/**
* FUNCTION: mset3( mat, idx, m )
*	Sets multiple matrix elements using elements from another matrix.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} idx - linear indices
* @param {Matrix} m - Matrix instance
* @returns {Void}
*/
function mset3( mat, idx, m ) {
	var s0 = mat.strides[ 0 ],
		s1 = mat.strides[ 1 ],
		s2 = m.strides[ 0 ],
		s3 = m.strides[ 1 ],
		len = idx.length,
		o0 = mat.offset,
		o1 = m.offset,
		sgn0, sgn1,
		r0, r1,
		j0, j1,
		n;

	if ( m.length !== len ) {
		throw new Error( 'invalid input argument. Number of indices does not match the number of elements in the value matrix.' );
	}
	sgn0 = ( s0 < 0 ) ? -1 : 1;
	sgn1 = ( s2 < 0 ) ? -1 : 1;
	for ( n = 0; n < len; n++ ) {
		// Get the column number and row offset for the first matrix:
		j0 = idx[ n ] % s0;
		r0 = sgn0 * ( idx[n] - j0 );

		// Get the column number and row offset for the value matrix:
		j1 = n % s2;
		r1 = sgn1 * ( n - j1 );

		mat.data[ o0 + r0 + j0*s1 ] = m.data[ o1 + r1 + j1*s3  ];
	}
} // end FUNCTION mset3()


// EXPORTS //

module.exports = mset3;
