/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	BTYPES = require( './../lib/btypes.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'btypes', function tests() {

	it( 'should export an object', function test() {
		expect( BTYPES ).to.be.an( 'object' );
	});

});
