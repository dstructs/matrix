'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer-primitive' ),
	isnan = require( 'validate.io-nan' ),
	isNumber = require( 'validate.io-number-primitive' );


// ISET //

/**
* FUNCTION: iset( idx, value )
*	Sets a matrix element located at a specified index.
*
* @param {Number} idx - linear index
* @param {Number} value - value to set
* @returns {Matrix} Matrix instance
*/
function iset( idx, v ) {
	/* jshint validthis: true */
	var r, j;
	if ( !isInteger( idx ) ) {
		throw new TypeError( 'invalid input argument. An index must be an integer. Value: `' + idx + '`.' );
	}
	if ( !isNumber( v ) && !isnan( v ) ) {
		throw new TypeError( 'invalid input argument. An input value must be a number primitive. Value: `' + v + '`.' );
	}
	if ( idx < 0 ) {
		idx += this.length;
		if ( idx < 0 ) {
			return this;
		}
	}
	j = idx % this.strides[ 0 ];
	r = idx - j;
	if ( this.strides[ 0 ] < 0 ) {
		r = -r;
	}
	this.data[ this.offset + r + j*this.strides[1] ] = v;
	return this;
} // end FUNCTION iset()


// EXPORTS //

module.exports = iset;
