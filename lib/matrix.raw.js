'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	getType = require( './getType.js' ),
	Matrix = require( './ctor.raw.js' );


// VARIABLES //

var BTYPES = require( './btypes.js' );


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
		len,
		i;

	nargs = arguments.length;
	if ( nargs > 2 ) {
		data = arguments[ 0 ];
		shape = arguments[ 1 ];
		dtype = arguments[ 2 ];
	}
	else if ( nargs === 2 ) {
		if ( isString( arguments[ 1 ] ) ) {
			shape = arguments[ 0 ];
			dtype = arguments[ 1 ];
		} else {
			data = arguments[ 0 ];
			shape = arguments[ 1 ];
		}
	}
	else if ( nargs === 1 ) {
		shape = arguments[ 0 ];
	}
	ndims = shape.length;
	if ( ndims !== 2 ) {
		throw new Error( 'matrix()::invalid input argument. Shape must be a 2-element array. Value: `' + shape + '`.' );
	}
	if ( !dtype ) {
		dtype = getType( data );
		if ( dtype === null ) {
			throw new TypeError( 'matrix()::invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.' );
		}
	}
	len = 1;
	for ( i = 0; i < ndims; i++ ) {
		len *= shape[ i ];
	}
	if ( data && len !== data.length ) {
		throw new Error( 'matrix()::invalid input argument. Matrix shape does not match the number of input data elements.' );
	}
	else if ( !data ) {
		// Initialize a zero-filled typed array:
		data = new BTYPES[ dtype ]( len );
	}

	// Return a new Matrix instance:
	return new Matrix( data, shape, dtype );
} // end FUNCTION matrix()


// EXPORTS //

module.exports = matrix;
