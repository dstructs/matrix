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
	return ITYPES[ typeName( x ) ] || null;
} // end FUNCTION getType()


// EXPORTS //

module.exports = getType;
