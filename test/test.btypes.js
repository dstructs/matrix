/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
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
