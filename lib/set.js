'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer-primitive' ),
	isNumber = require( 'validate.io-number-primitive' );


// SET //

/**
* FUNCTION: set( i, j, value )
*	Sets a matrix element based on the provided row and column indices.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @param {Number} value - value to set
* @returns {Number} matrix element
*/
function set( i, j, v ) {
	/* jshint validthis: true */
	if ( !isInteger( i ) || !isInteger( j ) ) {
		throw new TypeError( 'set()::invalid input argument. Row and column indices must be integers. Values: `[' + i + ',' + j + ']`.' );
	}
	if ( !isNumber( v ) ) {
		throw new TypeError( 'set()::invalid input argument. An input value must be a number primitive. Value: `' + v + '`.' );
	}
	this.data[ i*this.strides[0] + j*this.strides[1] ] = v;
	return this;
} // end FUNCTION set()


// EXPORTS //

module.exports = set;
