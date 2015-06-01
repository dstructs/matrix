/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix class:
	matrix = require( './../lib' ).raw,

	// Module to be tested:
	set = require( './../lib/set.raw.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix.raw#set', function tests() {

	var mat, data;

	data = new Int32Array( 100 );
	for ( var i = 0; i < data.length; i++ ) {
		data[ i ] = i;
	}
	mat = matrix( data, [10,10] );

	it( 'should export a function', function test() {
		expect( set ).to.be.a( 'function' );
		expect( mat.set ).to.be.a( 'function' );
	});

	it( 'should set a Matrix element', function test() {
		var prev, actual, expected;

		prev = mat.get( 5, 6 );
		mat.set( 5, 6, 1000 );

		actual = mat.get( 5, 6 );
		expected = 1000;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected );
	});

	it( 'should silently fail if provided an out-of-bounds index', function test() {
		mat.set( 500, 100, 1000 );
		assert.isUndefined( mat.get( 500, 100 ) );
	});

});
