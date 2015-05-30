'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	ispace = require( 'compute-indexspace' );


// SUBSEQUENCE SET //

/**
* FUNCTION: sset( subsequence, matrix )
*	Sets matrix elements according to a specified subsequence.
*
* @param {String} subsequence - subsequence string
* @param {Matrix} matrix - matrix containing the values to set
* @returns {Matrix} Matrix instance
*/
function sset( seq, mat ) {
	/* jshint validthis: true */
	var nRows,
		nCols,
		rows,
		cols,
		seqs,
		s0, s1, s2, s3,
		i, j;

	if ( !isString( seq ) ) {
		throw new TypeError( 'sset()::invalid input argument. Must provide a string primitive. Value: `' + seq + '`.' );
	}
	seqs = seq.split( ',' );
	if ( seqs.length !== 2 ) {
		throw new Error( 'sset()::invalid input argument. Subsequence string must specify row and column subsequences. Value: `' + seq + '`.' );
	}

	// TODO: handle empty input matrix?

	rows = ispace( seqs[ 0 ], this.shape[ 0 ] );
	cols = ispace( seqs[ 1 ], this.shape[ 1 ] );

	nRows = rows.length;
	nCols = cols.length;

	if ( nRows !== mat.shape[ 0 ] ) {
		throw new Error( 'sset()::invalid input arguments. Row subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join( ',' ) + '] matrix.' );
	}
	if ( nCols !== mat.shape[ 1 ] ) {
		throw new Error( 'sset()::invalid input arguments. Column subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join( ',' ) + '] matrix.' );
	}

	s0 = this.strides[ 0 ];
	s1 = this.strides[ 1 ];
	s2 = mat.strides[ 0 ];
	s3 = mat.strides[ 1 ];

	for ( i = 0; i < nRows; i++ ) {
		for ( j = 0; j < nCols; j++ ) {
			this.data[ rows[i]*s0 + cols[j]*s1 ] = mat.data[ i*s2 + j*s3 ];
		}
	}
	return this;
} // end FUNCTION sset()


// EXPORTS //

module.exports = sset;
