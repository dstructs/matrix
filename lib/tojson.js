'use strict';

/**
* FUNCTION: toJSON()
*	Returns a JSON representation of a Matrix.
*
* @returns {String} JSON representation
*/
function toJSON() {
	/* jshint validthis: true */
	var out,
		len,
		d,
		i;

	// Copy data to a generic array...
	len = this.data.length;
	d = new Array( len );
	for ( i = 0; i < len; i++ ) {
		d[ i ] = this.data[ i ];
	}
	// Build an object containing all Matrix properties needed to revive a serialized Matrix...
	out = {};
	out.type = 'Matrix';
	out.dtype = this.dtype;
	out.shape = this.shape;
	out.offset = this.offset;
	out.strides = this.strides;

	// TODO: sniff whether a Matrix is raw or not

	out.data = d;

	return JSON.stringify( out );
} // end FUNCTION toJSON()


// EXPORTS //

module.exports = toJSON;
