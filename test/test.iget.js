/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix class:
	matrix = require( './../lib' ),

	// Module to be tested:
	iget = require( './../lib/iget.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix#iget', function tests() {

	var mat, data;

	data = new Int32Array( 100 );
	for ( var i = 0; i < data.length; i++ ) {
		data[ i ] = i * 2;
	}
	mat = matrix( data, [10,10] );

	it( 'should export a function', function test() {
		expect( iget ).to.be.a( 'function' );
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
				mat.iget( value );
			};
		}
	});

	it( 'should return a Matrix element', function test() {
		var actual, expected;

		actual = mat.iget( 56 );
		expected = 112;

		assert.strictEqual( actual, expected );
	});

	it( 'should accept negative indices', function test() {
		var actual, expected;

		actual = mat.iget( -2 );
		expected = 196;

		assert.strictEqual( actual, expected );
	});

	it( 'should return undefined if provided an out-of-bounds index', function test() {
		assert.isUndefined( mat.iget( 1e5 ) );
		assert.isUndefined( mat.iget( -1e5 ) );
	});

});
