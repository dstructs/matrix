/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	matrix = require( './../lib' ).raw,
	get = require( './../lib/get.raw.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix.raw#get', function tests() {

	var mat, data;

	data = new Int8Array( 100 );
	for ( var i = 0; i < data.length; i++ ) {
		data[ i ] = i;
	}

	beforeEach( function before() {
		mat = matrix( data, [10,10], 'int8' );
	});

	it( 'should export a function', function test() {
		expect( get ).to.be.a( 'function' );
	});

	it( 'should return a Matrix element', function test() {
		var actual, expected;

		actual = mat.get( 5, 6 );
		expected = 56;

		assert.strictEqual( actual, expected );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		actual = mat.get( 5, 6 );
		expected = 53;

		assert.strictEqual( actual, expected, 'fliplr' );

		// Flip the matrix top-to-bottom:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		actual = mat.get( 5, 6 );
		expected = 43;

		assert.strictEqual( actual, expected, 'fliplrud' );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		actual = mat.get( 5, 6 );
		expected = 46;

		assert.strictEqual( actual, expected, 'flipud' );
	});

	it( 'should return undefined if provided an out-of-bounds index', function test() {
		assert.isUndefined( mat.get( 500, 100 ) );
	});

});
