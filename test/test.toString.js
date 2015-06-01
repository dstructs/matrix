/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix class:
	matrix = require( './../lib' ),

	// Module to be tested:
	toString = require( './../lib/toString.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix#toString', function tests() {

	it( 'should export a function', function test() {
		expect( toString ).to.be.a( 'function' );
		expect( matrix( [10,10] ).toString ).to.be.a( 'function' );
		expect( matrix.raw( [10,10] ).toString ).to.be.a( 'function' );
	});

	it( 'should convert a Matrix instance to a string', function test() {
		var mat, data, actual, expected;

		// Zero-filled matrix:
		mat = matrix( [4,4], 'int8' );

		actual = mat.toString();
		expected = '0,0,0,0;0,0,0,0;0,0,0,0;0,0,0,0';

		assert.strictEqual( actual, expected );

		// Full matrix:
		data = new Float32Array( 6 );
		for ( var i = 0; i < data.length; i++ ) {
			data[ i ] = i * 2;
		}

		mat = matrix( data, [3,2], 'float32' );

		actual = mat.toString();
		expected = '0,2;4,6;8,10';

		assert.strictEqual( actual, expected );
	});

});
