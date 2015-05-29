'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	contains = require( 'validate.io-contains' ),
	getType = require( './getType.js' );


// VARIABLES //

var BTYPES = require( './btypes.js' ),
	DTYPES = require( './dtypes.js' );


// MATRIX //

/**
* FUNCTION: Matrix( [data,] shape[, dtype] )
*	Matrix constructor.
*
* @constructor
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} [data] - input typed array
* @param {Number[]} shape - matrix dimensions/shape
* @param {String} [dtype="float64"] - matrix data type
* @returns {Matrix} Matrix instance
*/
function Matrix() {
	var strides,
		nargs,
		dtype,
		ndims,
		shape,
		data,
		vFLG,
		len,
		s, i;
	if ( !( this instanceof Matrix ) ) {
		return new Matrix.apply( null, arguments );
	}
	nargs = arguments.length;
	if ( nargs > 2 ) {
		data = arguments[ 0 ];
		shape = arguments[ 1 ];
		dtype = arguments[ 2 ];
		vFLG = 123; // args
	}
	else if ( nargs === 2 ) {
		if ( isString( arguments[ 1 ] ) ) {
			shape = arguments[ 0 ];
			dtype = arguments[ 1 ];
			vFLG = 23; // args
		} else {
			data = arguments[ 0 ];
			shape = arguments[ 1 ];
			vFLG = 12; // args
		}
	}
	else if ( nargs === 1 ) {
		shape = arguments[ 0 ];
		vFLG = 2; // args
	}
	// Input argument validation...
	if ( !isPositiveIntegerArray( shape ) ) {
		throw new TypeError( 'Matrix()::invalid input argument. A matrix shape must be an array of positive integers. Value: `' + shape + '`.' );
	}
	ndims = shape.length;
	if ( vFLG === 123 || vFLG === 23 ) {
		if ( !contains( DTYPES, dtype ) ) {
			throw new TypeError( 'Matrix()::invalid input argument. Unrecognized/unsupported data type. Value: `' + dtype + '`.' );
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
			throw new TypeError( 'Matrix()::invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.' );
		}
		if ( len !== data.length ) {
			throw new Error( 'Matrix()::invalid input argument. Matrix shape does not match the number of input data elements.' );
		}
	} else {
		data = new BTYPES[ dtype ]( len );
	}
	// Determine the matrix strides...
	strides = new Array( ndims );
	s = 1;
	for ( i = ndims-1; i >= 0; i-- ) {
		strides[ i ] = s;
		s *= shape[ i ];
	}

	// Underlying data type:
	Object.defineProperty( this, 'dtype', {
		'value': dtype,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix dimensions:
	Object.defineProperty( this, 'shape', {
		'value': shape,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix strides (non-enumerable):
	Object.defineProperty( this, '_strides', {
		'value': strides,
		'configurable': false,
		'enumerable': false,
		'writable': false
	});

	// Number of matrix dimensions:
	Object.defineProperty( this, 'ndims', {
		'value': ndims,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix length:
	Object.defineProperty( this, 'length', {
		'value': len,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Number of bytes used by the matrix elements:
	Object.defineProperty( this, 'nbytes', {
		'value': data.byteLength,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix data store:
	Object.defineProperty( this, 'data', {
		'value': data,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	return this;
} // end FUNCTION Matrix()

/**
* METHOD: get( i, j )
*	Returns a matrix element based on the provided subscripts.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @returns {Number} matrix element
*/
Matrix.prototype.get = function( i, j ) {
	return this.data[ i*this._strides[0] + j*this._strides[1] ];
}; // end METHOD get()

/**
* METHOD: set( i, j, value )
*	Sets a matrix element based on the provided subscripts.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @param {Number} value - value to set
* @returns {Number} matrix element
*/
Matrix.prototype.set = function( i, j, v ) {
	return this.data[ i*this._strides[0] + j*this._strides[1] ] = v;
}; // end METHOD get()


// EXPORTS //

module.exports = Matrix;
