/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix class:
	matrix = require( './../lib' ),

	// Module to be tested:
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
	mat = matrix( data, [10,10] );

	it( 'should export a function', function test() {
		expect( iset ).to.be.a( 'function' );
		expect( mat.iset ).to.be.a( 'function' );
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
	});

	it( 'should accept negative indices', function test() {
		var prev, actual, expected;

		prev = mat.iget( -2 );
		mat.iset( -2, 999 );

		actual = mat.iget( -2 );
		expected = 999;

		assert.notEqual( actual, prev );
		assert.strictEqual( actual, expected );
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
