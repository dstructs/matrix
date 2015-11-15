'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	contains = require( 'validate.io-contains' ),
	getType = require( 'compute-dtype' ),
	Matrix = require( './ctor.raw.js' );


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
	var dtype,
		ndims,
		shape,
		data,
		len,
		i;

	if ( arguments.length === 1 ) {
		shape = arguments[ 0 ];
	}
	else if ( arguments.length === 2 ) {
		if ( isString( arguments[ 1 ] ) ) {
			shape = arguments[ 0 ];
			dtype = arguments[ 1 ];
		} else {
			data = arguments[ 0 ];
			shape = arguments[ 1 ];
		}
	}
	else {
		data = arguments[ 0 ];
		shape = arguments[ 1 ];
		dtype = arguments[ 2 ];
	}
	ndims = shape.length;
	if ( ndims !== 2 ) {
		throw new Error( 'invalid input argument. Shape must be a 2-element array. Value: `' + shape + '`.' );
	}
	len = 1;
	for ( i = 0; i < ndims; i++ ) {
		len *= shape[ i ];
	}
	if ( data ) {
		if ( !dtype ) {
			dtype = getType( data );
			if ( !contains( DTYPES, dtype ) ) {
				throw new TypeError( 'invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.' );
			}
		}
		if ( len !== data.length ) {
			throw new Error( 'invalid input argument. Matrix shape does not match the input data length.' );
		}
	} else {
		// Initialize a zero-filled typed array...
		if ( !dtype ) {
			dtype = 'float64';
		}
		data = new BTYPES[ dtype ]( len );
	}
	// Return a new Matrix instance:
	return new Matrix( data, dtype, shape, 0, [shape[1],1] );
} // end FUNCTION matrix()


// EXPORTS //

module.exports = matrix;
