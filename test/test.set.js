/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix class:
	matrix = require( './../lib' ),

	// Validates whether a value is equal to NaN
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	set = require( './../lib/set.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix#set', function tests() {

	var mat, data;

	data = new Int32Array( 100 );
	for ( var i = 0; i < data.length; i++ ) {
		data[ i ] = i;
	}

	beforeEach( function before() {
		mat = matrix( data, [10,10] );
	});

	it( 'should export a function', function test() {
		expect( set ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a row index which is not a nonnegative integer', function test() {
		var values = [
			'5',
			-1,
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
				mat.set( value, 0, 5 );
			};
		}
	});

	it( 'should throw an error if provided a column index which is not a nonnegative integer', function test() {
		var values = [
			'5',
			-1,
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
				mat.set( 0, value, 5 );
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
				mat.set( 0, 0, value );
			};
		}
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

	it( 'should set a Matrix element to NaN', function test() {
		var mat1, mat2,
			prev, actual, expected;

		mat1 = matrix( [1,2,3,4], [2,2], 'float32' );
		prev = mat1.get( 1, 1 );
		mat1.set( 1, 1, NaN );

		actual = mat1.get( 1, 1 );

		assert.notEqual( actual, prev );
		assert.isTrue( isnan( actual ) );

		// For integer matrices, NaN will be casted to 0:
		mat2 = matrix( [1,2,3,4], [2,2], 'int32' );
		prev = mat2.get( 1, 1 );
		mat2.set( 1, 1, NaN );

		actual = mat2.get( 1, 1 );
		expected = 0;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected );

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
