'use strict';

// MODULES //

var ispace = require( 'compute-indexspace' );


// SUBSEQUENCE SET //

/**
* FUNCTION: sset( subsequence, value[, thisArg] )
*	Sets matrix elements according to a specified subsequence.
*
* @param {String} subsequence - subsequence string
* @param {Number|Matrix|Function} value - either a single numeric value, a matrix containing the values to set, or a function which returns a numeric value
* @param {Object} [thisArg] - `this` context when executing a callback
* @returns {Matrix} Matrix instance
*/
function sset( seq, val, thisArg ) {
	/* jshint validthis: true */
	var nRows,
		nCols,
		clbk,
		rows,
		cols,
		seqs,
		mat,
		ctx,
		s0, s1, s2, s3,
		o0, o1,
		r0, r1,
		i, j, k;

	seqs = seq.split( ',' );
	if ( typeof val === 'function' ) {
		clbk = val;
	}
	else if ( typeof val !== 'number' ) {
		mat = val;
	}
	rows = ispace( seqs[ 0 ], this.shape[ 0 ] );
	cols = ispace( seqs[ 1 ], this.shape[ 1 ] );

	nRows = rows.length;
	nCols = cols.length;

	if ( !( nRows && nCols ) ) {
		return this;
	}
	s0 = this.strides[ 0 ];
	s1 = this.strides[ 1 ];
	o0 = this.offset;

	// Callback...
	if ( clbk ) {
		if ( arguments.length > 2 ) {
			ctx = thisArg;
		} else {
			ctx = this;
		}
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			for ( j = 0; j < nCols; j++ ) {
				k = r0 + cols[j]*s1;
				this.data[ k ] = clbk.call( ctx, this.data[ k ], rows[i], cols[j], k );
			}
		}
	}
	// Input matrix...
	else if ( mat ) {
		if ( nRows !== mat.shape[ 0 ] ) {
			throw new Error( 'invalid input arguments. Row subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join( ',' ) + '] matrix.' );
		}
		if ( nCols !== mat.shape[ 1 ] ) {
			throw new Error( 'invalid input arguments. Column subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join( ',' ) + '] matrix.' );
		}
		s2 = mat.strides[ 0 ];
		s3 = mat.strides[ 1 ];
		o1 = mat.offset;
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			r1 = o1 + i*s2;
			for ( j = 0; j < nCols; j++ ) {
				this.data[ r0 + cols[j]*s1 ] = mat.data[ r1 + j*s3 ];
			}
		}
	}
	// Single numeric value...
	else {
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			for ( j = 0; j < nCols; j++ ) {
				this.data[ r0 + cols[j]*s1 ] = val;
			}
		}
	}
	return this;
} // end FUNCTION sset()


// EXPORTS //

module.exports = sset;
