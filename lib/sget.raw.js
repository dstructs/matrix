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
		s0, s1,
		o,
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
	mat = new this.constructor( d, this.dtype, [nRows,nCols], 0, [nCols,1] );

	if ( len ) {
		s0 = this.strides[ 0 ];
		s1 = this.strides[ 1 ];
		o = this.offset;
		for ( i = 0; i < nRows; i++ ) {
			r = o + rows[i]*s0;
			dr = i * nCols;
			for ( j = 0; j < nCols; j++ ) {
				d[ dr + j ] = this.data[ r + cols[j]*s1 ];
			}
		}
	}
	return mat;
} // end FUNCTION sget()


// EXPORTS //

module.exports = sget;
