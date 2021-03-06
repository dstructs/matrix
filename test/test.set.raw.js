/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	matrix = require( './../lib' ).raw,
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

	beforeEach( function before() {
		mat = matrix( data, [10,10], 'int32' );
	});

	it( 'should export a function', function test() {
		expect( set ).to.be.a( 'function' );
	});

	it( 'should set a Matrix element', function test() {
		var prev, actual, expected;

		prev = mat.get( 5, 6 );
		mat.set( 5, 6, 1000 );

		actual = mat.get( 5, 6 );
		expected = 1000;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		prev = mat.get( 5, 6 );
		mat.set( 5, 6, 1001 );

		actual = mat.get( 5, 6 );
		expected = 1001;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected, 'fliplr' );

		// Flip the matrix top-to-bottom:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		prev = mat.get( 5, 6 );
		mat.set( 5, 6, 1002 );

		actual = mat.get( 5, 6 );
		expected = 1002;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected, 'fliplrud' );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		prev = mat.get( 5, 6 );
		mat.set( 5, 6, 1003 );

		actual = mat.get( 5, 6 );
		expected = 1003;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected, 'flipud' );
	});

	it( 'should return the Matrix instance', function test() {
		assert.strictEqual( mat.set( 5, 6, 999 ), mat );
	});

	it( 'should silently fail if provided an out-of-bounds index', function test() {
		mat.set( 500, 100, 1000 );
		assert.isUndefined( mat.get( 500, 100 ) );

		mat.strides[ 0 ] *= -1;
		mat.set( 500, 100, 1000 );
		assert.isUndefined( mat.get( 500, 100 ) );
	});

});
