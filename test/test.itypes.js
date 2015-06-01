/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	ITYPES = require( './../lib/itypes.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'itypes', function tests() {

	it( 'should export an object', function test() {
		expect( ITYPES ).to.be.an( 'object' );
	});

});
