/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix class:
	matrix = require( './../lib' ).raw,

	// Module to be tested:
	get = require( './../lib/get.raw.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix#get', function tests() {

	var mat, data;

	data = new Int8Array( 100 );
	for ( var i = 0; i < data.length; i++ ) {
		data[ i ] = i;
	}
	mat = matrix( data, [10,10] );

	it( 'should export a function', function test() {
		expect( get ).to.be.a( 'function' );
		expect( mat.get ).to.be.a( 'function' );
	});

	it( 'should return a Matrix element', function test() {
		var actual, expected;

		actual = mat.get( 5, 6 );
		expected = 56;

		assert.strictEqual( actual, expected );
	});

});
