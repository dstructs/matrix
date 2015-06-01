/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	DTYPES = require( './../lib/dtypes.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'dtypes', function tests() {

	it( 'should export an array', function test() {
		expect( DTYPES ).to.be.an( 'array' );
	});

});
