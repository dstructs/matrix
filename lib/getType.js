'use strict';

// MODULES //

var typeName = require( 'type-name' );


// VARIABLES //

var ITYPES = require( './itypes.js' );


// GET TYPE //

/**
* FUNCTION: getType( x )
*	Determines an input data type.
*
* @private
* @param {*} x - input value
* @returns {String|Null} data type
*/
function getType( x ) {
	var type = ITYPES[ typeName( x ) ];
	if ( type ) {
		return type;
	}
	return null;
} // end FUNCTION getType()


// EXPORTS //

module.exports = getType;
