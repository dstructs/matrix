'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' ),
	isnan = require( 'validate.io-nan' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isNonNegativeIntegerArray = require( 'validate.io-nonnegative-integer-array' );


// FUNCTIONS //

var mset1 = require( './mset1.js' ),
	mset2 = require( './mset2.js' ),
	mset3 = require( './mset3.js' ),
	mset4 = require( './mset4.js' ),
	mset5 = require( './mset5.js' ),
	mset6 = require( './mset6.js' );

/**
* FUNCTION: getIndices( idx, len )
*	Validates and returns an array of indices.
*
* @private
* @param {Number[]|Null} idx - indices
* @param {Number} len - max index
* @returns {Number[]} indices
*/
function getIndices( idx, len ) {
	var out,
		i;
	if ( idx === null ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = i;
		}
	}
	else if ( isNonNegativeIntegerArray( idx ) ) {
		out = [];
		for ( i = 0; i < idx.length; i++ ) {
			if ( idx[ i ] < len ) {
				out.push( idx[ i ] );
			}
		}
	}
	else {
		throw new TypeError( 'invalid input argument. Row and column indices must be arrays of nonnegative integers. Value: `' + idx + '`.' );
	}
	return out;
} // end FUNCTION getIndices()


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
		rows,
		cols,
		i;

	args = new Array( nargs );
	for ( i = 0; i < nargs; i++ ) {
		args[ i ] = arguments[ i ];
	}

	// 2 input arguments...
	if ( nargs < 3 ) {
		if ( !isNonNegativeIntegerArray( args[ 0 ] ) ) {
			throw new TypeError( 'invalid input argument. First argument must be an array of nonnegative integers. Value: `' + args[ 0 ] + '`.' );
		}
		// indices, clbk
		if ( isFunction( args[ 1 ] ) ) {
			mset2( this, args[ 0 ], args[ 1 ] );
		}
		// indices, number
		else if ( isNumber( args[ 1 ] ) || isnan( args[ 1 ] ) ) {
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
			if ( !isNonNegativeIntegerArray( args[ 0 ] ) ) {
				throw new TypeError( 'invalid input argument. First argument must be an array of nonnegative integers. Value: `' + args[ 0 ] + '`.' );
			}
			mset2( this, args[ 0 ], args[ 1 ], args[ 2 ] );
		}
		// rows, cols, function
		else if ( isFunction( args[ 2 ] ) ) {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );
			mset4( this, rows, cols, args[ 2 ], this );
		}
		// rows, cols, number
		else if ( isNumber( args[ 2 ] ) ) {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );
			mset5( this, rows, cols, args[ 2 ] );
		}
		// rows, cols, matrix
		else {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );

			// NOTE: no validation for Matrix instance.
			mset6( this, rows, cols, args[ 2 ] );
		}
	}
	// 4 input arguments...
	else {
		// rows, cols, function, context
		if ( !isFunction( args[ 2 ] ) ) {
			throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + args[ 2 ] + '`.' );
		}
		rows = getIndices( args[ 0 ], this.shape[ 0 ] );
		cols = getIndices( args[ 1 ], this.shape[ 1 ] );
		mset4( this, rows, cols, args[ 2 ], args[ 3 ] );
	}
	return this;
} // end FUNCTION mset()


// EXPORTS //

module.exports = mset;
