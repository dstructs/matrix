'use strict';

// MODULES //

var cast = require( 'dstructs-cast-arrays' ),
	copy = require( 'utils-copy' );


// TOJSON //

/**
* FUNCTION: toJSON()
*	Returns a JSON representation of a Matrix.
*
* @returns {Object} JSON representation
*/
function toJSON() {
	/* jshint validthis: true */
	var prop,
		out;

	// Build an object containing all Matrix properties needed to revive a serialized Matrix...
	out = {};
	out.type = 'Matrix';
	out.dtype = this.dtype;
	out.shape = copy( this.shape );
	out.offset = this.offset;
	out.strides = copy( this.strides );

	prop = Object.getOwnPropertyDescriptor( this, 'data' );
	out.raw = prop.writable && prop.configurable && prop.enumerable;

	// Cast data to a generic array:
	out.data = cast( this.data, 'generic' );

	return out;
} // end FUNCTION toJSON()


// EXPORTS //

module.exports = toJSON;
