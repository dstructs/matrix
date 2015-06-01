'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isNonNegativeIntegerArray = require( 'validate.io-nonnegative-integer-array' ),
	contains = require( 'validate.io-contains' ),
	getType = require( './getType.js' ),
	Matrix = require( './ctor.js' );


// VARIABLES //

var BTYPES = require( './btypes.js' ),
	DTYPES = require( './dtypes.js' );


// CREATE MATRIX //

/**
* FUNCTION: matrix( [data,] shape[, dtype] )
*	Returns a Matrix instance.
*
* @constructor
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} [data] - input typed array
* @param {Number[]} shape - matrix dimensions/shape
* @param {String} [dtype="float64"] - matrix data type
* @returns {Matrix} Matrix instance
*/
function matrix() {
	var nargs,
		dtype,
		ndims,
		shape,
		data,
		vFLG,
		len,
		i;

	nargs = arguments.length;
	if ( nargs === 1 ) {
		shape = arguments[ 0 ];
		vFLG = 2; // arg #s
	}
	else if ( nargs === 2 ) {
		if ( isString( arguments[ 1 ] ) ) {
			shape = arguments[ 0 ];
			dtype = arguments[ 1 ];
			vFLG = 23; // arg #s
		} else {
			data = arguments[ 0 ];
			shape = arguments[ 1 ];
			vFLG = 12; // arg #s
		}
	}
	else {
		data = arguments[ 0 ];
		shape = arguments[ 1 ];
		dtype = arguments[ 2 ];
		vFLG = 123; // arg #s
	}

	// Input argument validation...
	if ( !isNonNegativeIntegerArray( shape ) ) {
		throw new TypeError( 'matrix()::invalid input argument. A matrix shape must be an array of nonnegative integers. Value: `' + shape + '`.' );
	}
	ndims = shape.length;
	if ( ndims !== 2 ) {
		throw new Error( 'matrix()::invalid input argument. Shape must be a 2-element array. Value: `' + shape + '`.' );
	}
	if ( vFLG === 123 || vFLG === 23 ) {
		if ( !contains( DTYPES, dtype ) ) {
			throw new TypeError( 'matrix()::invalid input argument. Unrecognized/unsupported data type. Value: `' + dtype + '`.' );
		}
	} else {
		dtype = 'float64';
	}
	len = 1;
	for ( i = 0; i < ndims; i++ ) {
		len *= shape[ i ];
	}
	if ( vFLG === 123 || vFLG === 12 ) {
		dtype = getType( data );
		if ( dtype === null ) {
			throw new TypeError( 'matrix()::invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.' );
		}
		if ( len !== data.length ) {
			throw new Error( 'matrix()::invalid input argument. Matrix shape does not match the input data length.' );
		}
		// TODO: casting!!!
	} else {
		// Initialize a zero-filled typed array:
		data = new BTYPES[ dtype ]( len );
	}

	// Return a new Matrix instance:
	return new Matrix( data, shape, dtype );
} // end FUNCTION matrix()


// EXPORTS //

module.exports = matrix;
