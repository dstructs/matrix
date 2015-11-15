/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	matrix = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'dstructs-matrix', function tests() {

	it( 'should export a function', function test() {
		expect( matrix ).to.be.a( 'function' );
	});

	it( 'should export a lower-level (raw) interface', function test() {
		expect( matrix.raw ).to.be.a( 'function' );
	});

});
