'use strict';

// MODULES //

var isNonNegativeIntegerArray = require( 'validate.io-nonnegative-integer-array' );


// VARIABLES //

var BTYPES = require( './btypes.js' );


// MGET //

/**
* FUNCTION: mget( i[, j] )
*	Returns multiple matrix elements. If provided a single argument, `i` is treated as an array of linear indices.
*
* @param {Number[]|Null} i - linear/row indices
* @param {Number[]|Null} [j] - column indices
* @returns {Number[]|Matrix} matrix elements or a Matrix instance
*/
function mget( rows, cols ) {
	/*jshint validthis:true */
	var nRows,
		nCols,
		out,
		d,
		v,
		s0, s1, s2, s3,
		r, dr,
		i, j, m, n;

	if ( arguments.length < 2 ) {
		i = rows;
		if ( !isNonNegativeIntegerArray( i ) ) {
			throw new TypeError( 'mget()::invalid input argument. Linear indices must be specified as a nonnegative integer array. Value: `' + i + '`.' );
		}
		out = [];
		for ( n = 0; n < i.length; n++ ) {
			v = this.data[ i[n] ];
			if ( v !== void 0 ) {
				out.push( v );
			}
		}
	} else {
		if ( rows === null ) {
			nRows = this.shape[ 0 ];
			i = new Array( nRows );
			for ( n = 0; n < nRows; n++ ) {
				i[ n ] = n;
			}
		}
		else if ( !isNonNegativeIntegerArray( rows ) ) {
			throw new TypeError( 'mget()::invalid input argument. Row indices must be specified as a nonnegative integer array. Value: `' + rows + '`.' );
		}
		else {
			nRows = rows.length;
			i = rows;
		}

		if ( cols === null ) {
			nCols = this.shape[ 1 ];
			j = new Array( nCols );
			for ( n = 0; n < nCols; n++ ) {
				j[ n ] = n;
			}
		}
		else if ( !isNonNegativeIntegerArray( cols ) ) {
			throw new TypeError( 'mget()::invalid input argument. Column indices must be specified as a nonnegative integer array. Value: `' + cols + '`.' );
		}
		else {
			nCols = cols.length;
			j = cols;
		}

		d = new BTYPES[ this.dtype ]( nRows*nCols );
		out = new this.constructor( d, [nRows,nCols], this.dtype );

		if ( nRows && nCols ) {
			s0 = this.strides[ 0 ];
			s1 = this.strides[ 1 ];
			s2 = out.strides[ 0 ];
			s3 = out.strides[ 1 ];
			for ( m = 0; m < nRows; m++ ) {
				r = i[ m ] * s0;
				dr = m * s2;
				for ( n = 0; n < nCols; n++ ) {
					d[ dr + n*s3 ] = this.data[ r + j[n]*s1 ];
				}

			}
		}
	}
	return out;
} // end FUNCTION mget()


// EXPORTS //

module.exports = mget;
