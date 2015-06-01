/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix class:
	matrix = require( './../lib' ),

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
	mat = matrix( data, [10,10] );

	it( 'should export a function', function test() {
		expect( set ).to.be.a( 'function' );
		expect( mat.set ).to.be.a( 'function' );
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
	});

	it( 'should silently fail if provided an out-of-bounds index', function test() {
		mat.set( 500, 100, 1000 );
		assert.isUndefined( mat.get( 500, 100 ) );
	});

});
