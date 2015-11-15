/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	matrix = require( './../lib' ),
	isnan = require( 'validate.io-nan' ),
	iset = require( './../lib/iset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix#iset', function tests() {

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

	it( 'should throw an error if not provided an integer', function test() {
		var values = [
			'5',
			Math.PI,
			NaN,
			null,
			true,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mat.iset( value, 999 );
			};
		}
	});

	it( 'should throw an error if provided a non-numeric value to set', function test() {
		var values = [
			'5',
			null,
			true,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mat.iset( 0, value );
			};
		}
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

	it( 'should set a Matrix element to NaN', function test() {
		var mat1, mat2,
			prev, actual, expected;

		mat1 = matrix( [1,2,3,4], [2,2], 'float32' );
		prev = mat1.iget( 2 );
		mat1.iset( 2, NaN );

		actual = mat1.iget( 2 );

		assert.notEqual( actual, prev );
		assert.isTrue( isnan( actual ) );

		// For integer matrices, NaN will be cast to 0:
		mat2 = matrix( [1,2,3,4], [2,2], 'int32' );
		prev = mat2.iget( 2 );
		mat2.iset( 2, NaN );

		actual = mat2.iget( 2 );
		expected = 0;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected );

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
