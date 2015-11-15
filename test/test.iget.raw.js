/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	matrix = require( './../lib' ).raw,
	iget = require( './../lib/iget.raw.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix.raw#iget', function tests() {

	var mat, data;

	data = new Int32Array( 100 );
	for ( var i = 0; i < data.length; i++ ) {
		data[ i ] = i * 2;
	}

	beforeEach( function before() {
		mat = matrix( data, [10,10], 'int32' );
	});

	it( 'should export a function', function test() {
		expect( iget ).to.be.a( 'function' );
	});

	it( 'should return a Matrix element', function test() {
		var actual, expected;

		actual = mat.iget( 56 );
		expected = 112;

		assert.strictEqual( actual, expected );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		actual = mat.iget( 56 );
		expected = 106;

		assert.strictEqual( actual, expected, 'fliplr' );

		// Flip the matrix top-to-bottom:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		actual = mat.iget( 56 );
		expected = 86;

		assert.strictEqual( actual, expected, 'fliplrud' );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		actual = mat.iget( 56 );
		expected = 92;

		assert.strictEqual( actual, expected, 'flipud' );
	});

	it( 'should accept negative indices', function test() {
		var actual, expected;

		actual = mat.iget( -2 );
		expected = 196;

		assert.strictEqual( actual, expected );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		actual = mat.iget( -2 );
		expected = 182;

		assert.strictEqual( actual, expected, 'fliplr' );

		// Flip the matrix top-to-bottom:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		actual = mat.iget( -2 );
		expected = 2;

		assert.strictEqual( actual, expected, 'fliplrud' );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		actual = mat.iget( -2 );
		expected = 16;

		assert.strictEqual( actual, expected, 'flipud' );
	});

	it( 'should return undefined if provided an out-of-bounds index', function test() {
		assert.isUndefined( mat.iget( 1e5 ) );
		assert.isUndefined( mat.iget( -1e5 ) );
	});

});
