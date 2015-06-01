'use strict';

// MODULES //

var ispace = require( 'compute-indexspace' );


// VARIABLES //

var BTYPES = require( './btypes.js' );


// SUBSEQUENCE GET //

/**
* FUNCTION: sget( subsequence )
*	Returns matrix elements according to a specified subsequence.
*
* @param {String} subsequence - subsequence string
* @returns {Matrix} Matrix instance
*/
function sget( seq ) {
	/*jshint validthis:true */
	var nRows,
		nCols,
		rows,
		cols,
		seqs,
		mat,
		len,
		s0, s1, s2, s3,
		d,
		r, dr,
		i, j;

	seqs = seq.split( ',' );
	rows = ispace( seqs[ 0 ], this.shape[ 0 ] );
	cols = ispace( seqs[ 1 ], this.shape[ 1 ] );

	nRows = rows.length;
	nCols = cols.length;
	len = nRows * nCols;

	d = new BTYPES[ this.dtype ]( len );
	mat = new this.constructor( d, [nRows,nCols], this.dtype );

	if ( len ) {
		s0 = this.strides[ 0 ];
		s1 = this.strides[ 1 ];
		s2 = mat.strides[ 0 ];
		s3 = mat.strides[ 1 ];
		for ( i = 0; i < nRows; i++ ) {
			r = rows[ i ] * s0;
			dr = i * s2;
			for ( j = 0; j < nCols; j++ ) {
				d[ dr + j*s3 ] = this.data[ r + cols[j]*s1 ];
			}
		}
	}
	return mat;
} // end FUNCTION sget()


// EXPORTS //

module.exports = sget;
