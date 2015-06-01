'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isNonNegativeIntegerArray = require( 'validate.io-nonnegative-integer-array' );


// FUNCTIONS //

/**
* FUNCTION: mset1( mat, idx, v )
*	Sets multiple matrix elements to a numeric value `v`.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} idx - linear indices
* @param {Number} v - numeric value
*/
function mset1( mat, idx, v ) {
	var len = idx.length,
		i;

	for ( i = 0; i < len; i++ ) {
		mat.data[ idx[ i ] ] = v;
	}
} // end FUNCTION mset1()

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

/**
* FUNCTION: mset3( mat, idx, m )
*	Sets multiple matrix elements using elements from another matrix.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} idx - linear indices
* @param {Matrix} m - Matrix instance
*/
function mset3( mat, idx, m ) {
	var len = idx.length,
		i;

	if ( m.length !== len ) {
		throw new Error( 'mset()::invalid input argument. Number of indices does not match the number of elements in the value matrix.' );
	}
	for ( i = 0; i < len; i++ ) {
		mat.data[ idx[ i ] ] = m.data[ i ];
	}
} // end FUNCTION mset3()

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

/**
* FUNCTION: mset5( mat, rows, cols, v )
*	Sets multiple matrix elements to a numeric value `v`.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} rows - row indices
* @param {Number[]} cols - column indices
* @param {Number} v - numeric value
*/
function mset5( mat, rows, cols, v ) {
	var nRows = rows.length,
		nCols = cols.length,
		s0, s1,
		r,
		i, j;

	s0 = mat.strides[ 0 ];
	s1 = mat.strides[ 1 ];
	for ( i = 0; i < nRows; i++ ) {
		r = rows[ i ] * s0;
		for ( j = 0; j < nCols; j++ ) {
			mat.data[ r + cols[j]*s1 ] = v;
		}
	}
} // end FUNCTION mset5()

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


// MSET //

/**
* FUNCTION: mset( i[, j], value[, thisArg] )
*	Sets multiple matrix elements. If provided a single array, `i` is treated as an array of linear indices.
*
* @param {Number[]|Null} i - linear/row indices
* @param {Number[]|Null} [j] - column indices
* @param {Number|Matrix|Function} value - either a single numeric value, a matrix containing the values to set, or a function which returns a numeric value
* @returns {Matrix} Matrix instance
*/
function mset() {
	/*jshint validthis:true */
	var nargs = arguments.length,
		args,
		i;

	args = new Array( nargs );
	for ( i = 0; i < nargs; i++ ) {
		args[ i ] = arguments[ i ];
	}

	if ( !isNonNegativeIntegerArray( args[ 0 ] ) ) {
		throw new TypeError( 'mset()::invalid input argument. First argument must be an array of nonnegative integers. Value: `' + i + '`.' );
	}

	// 2 input arguments...
	if ( nargs < 3 ) {
		// indices, clbk
		if ( isFunction( args[ 1 ] ) ) {
			mset2( this, args[ 0 ], args[ 1 ] );
		}
		// indices, number
		else if ( isNumber( args[ 1 ] ) ) {
			mset1( this, args[ 0 ], args[ 1 ] );
		}
		// indices, matrix
		else {
			// NOTE: no validation for Matrix instance.
			mset3( this, args[ 0 ], args[ 1 ] );
		}
	}
	// 3 input arguments...
	else if ( nargs === 3 ) {
		// indices, clbk, context
		if ( isFunction( args[ 1 ] ) ) {
			mset2( this, args[ 0 ], args[ 1 ], args[ 2 ] );
		}
		// rows, cols, function
		else if ( isFunction( args[ 2 ] ) ) {
			if ( !isNonNegativeIntegerArray( args[ 1 ] ) ) {
				throw new TypeError( 'mset()::invalid input argument. Column indices must be specified as a nonnegative integer array. Value: `' + args[ 1 ] + '`.' );
			}
			mset4( this, args[ 0 ], args[ 1 ], args[ 2 ], this );
		}
		// rows, cols, number
		else if ( isNumber( args[ 2 ] ) ) {
			if ( !isNonNegativeIntegerArray( args[ 1 ] ) ) {
				throw new TypeError( 'mset()::invalid input argument. Column indices must be specified as a nonnegative integer array. Value: `' + args[ 1 ] + '`.' );
			}
			mset5( this, args[ 0 ], args[ 1 ], args[ 2 ] );
		}
		// rows, cols, matrix
		else {
			if ( !isNonNegativeIntegerArray( args[ 1 ] ) ) {
				throw new TypeError( 'mset()::invalid input argument. Column indices must be specified as a nonnegative integer array. Value: `' + args[ 1 ] + '`.' );
			}
			// NOTE: no validation for Matrix instance.
			mset6( this, args[ 0 ], args[ 1 ], args[ 2 ] );
		}
	}
	// 4 input arguments...
	else {
		if ( !isNonNegativeIntegerArray( args[ 1 ] ) ) {
			throw new TypeError( 'mset()::invalid input argument. Column indices must be specified as a nonnegative integer array. Value: `' + args[ 1 ] + '`.' );
		}
		if ( !isFunction( args[ 2 ] ) ) {
			throw new TypeError( 'mset()::invalid input argument. Callback argument must be a function. Value: `' + args[ 2 ] + '`.' );
		}
		mset4( this, args[ 0 ], args[ 1 ], args[ 2 ], args[ 3 ] );
	}
	return this;
} // end FUNCTION mset()


// EXPORTS //

module.exports = mset;