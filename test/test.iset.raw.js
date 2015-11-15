/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	matrix = require( './../lib' ).raw,
	iset = require( './../lib/iset.raw.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix.raw#iset', function tests() {

	var mat, data;

	data = new Int32Array( 100 );
	for ( var i = 0; i < data.length; i++ ) {
		data[ i ] = i * 2;
	}

	beforeEach( function before() {
		mat = matrix( data, [10,10], 'int32' );
	});

	it( 'should export a function', function test() {
		expect( iset ).to.be.a( 'function' );
	});

	it( 'should set a Matrix element', function test() {
		var prev, actual, expected;

		prev = mat.iget( 56 );
		mat.iset( 56, 365 );

		actual = mat.iget( 56 );
		expected = 365;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		prev = mat.iget( 56 );
		mat.iset( 56, 499 );

		actual = mat.iget( 56 );
		expected = 499;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected, 'fliplr' );

		// Flip the matrix top-to-bottom:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		prev = mat.iget( 56 );
		mat.iset( 56, 1001 );

		actual = mat.iget( 56 );
		expected = 1001;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected, 'fliplrud' );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		prev = mat.iget( 56 );
		mat.iset( 56, 782 );

		actual = mat.iget( 56 );
		expected = 782;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected, 'flipud' );
	});

	it( 'should accept negative indices', function test() {
		var prev, actual, expected;

		prev = mat.iget( -2 );
		mat.iset( -2, 999 );

		actual = mat.iget( -2 );
		expected = 999;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		prev = mat.iget( -2 );
		mat.iset( -2, 499 );

		actual = mat.iget( -2 );
		expected = 499;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected, 'fliplr' );

		// Flip the matrix top-to-bottom:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		prev = mat.iget( -2 );
		mat.iset( -2, 1001 );

		actual = mat.iget( -2 );
		expected = 1001;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected, 'fliplrud' );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		prev = mat.iget( -2 );
		mat.iset( -2, 782 );

		actual = mat.iget( -2 );
		expected = 782;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected, 'flipud' );
	});

	it( 'should return the Matrix instance', function test() {
		assert.strictEqual( mat.iset( 5, 6, 999 ), mat );
	});

	it( 'should silently fail if provided an out-of-bounds index', function test() {
		mat.iset( 1e5, 987 );
		assert.isUndefined( mat.iget( 1e5 ) );

		mat.iset( -1e5, 789 );
		assert.isUndefined( mat.iget( -1e5 ) );
	});

});
