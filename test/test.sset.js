/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix class:
	matrix = require( './../lib' ),

	// Module to be tested:
	sset = require( './../lib/sset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix#sset', function tests() {

	var mat;

	beforeEach( function before() {
		var data = new Int8Array( 100 );
		for ( var i = 0; i < data.length; i++ ) {
			data[ i ] = i;
		}
		mat = matrix( data, [10,10] );
	});

	it( 'should export a function', function test() {
		expect( sset ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a string', function test() {
		var values = [
			5,
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
				mat.sset( value, 5 );
			};
		}
	});

	it( 'should throw an error if provided a string which does not have row and column subsequences', function test() {
		var values = [
			'5:',
			'5:;',
			'5:;::1',
			5,
			NaN,
			null,
			true,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				mat.sset( value, 5 );
			};
		}
	});

	it( 'should throw an error if provided a value matrix with dimensions which do not match the dimensions determined by the row and column subsequences', function test() {
		var m;

		m = matrix( new Int8Array( 2 ), [1,2] );
		expect( badValue( m ) ).to.throw( Error );

		m = matrix( new Int8Array( 2 ), [2,1] );
		expect( badValue( m ) ).to.throw( Error );

		function badValue( value ) {
			return function() {
				mat.sset( '4:6,6:8', value );
			};
		}
	});

	it( 'should return the Matrix instance', function test() {
		var m = mat.sset( '4:6,6:8', 5 );
		assert.strictEqual( mat, m );
	});

	it( 'should silently ignore out-of-bounds subsequences', function test() {
		var actual, expected;

		expected = mat.toString();

		mat.sset( '400:600,6:8', 5 );
		actual = mat.toString();

		assert.strictEqual( actual, expected );

		mat.sset( '4:6,600:800', 5 );
		actual = mat.toString();

		assert.strictEqual( actual, expected );
	});

	it( 'should set Matrix elements using a callback', function test() {
		var submat;

		mat.sset( '4:6,6:8', set );
		submat = mat.sget( '3:7,5:9' );

		assert.strictEqual( submat.toString(), '35,36,37,38;45,64,74,48;55,65,75,58;65,66,67,68' );

		function set( d, i, j, idx ) {
			return '' + j + i;
		}
	});

	it( 'should set Matrix elements using a callback and a provided context', function test() {
		var submat;

		mat.sset( '4:6,6:8', set, null );
		submat = mat.sget( '3:7,5:9' );

		assert.strictEqual( submat.toString(), '35,36,37,38;45,64,74,48;55,65,75,58;65,66,67,68' );

		function set( d, i, j, idx ) {
			/* jshint validthis:true */
			assert.isNull( this );
			return '' + j + i;
		}
	});

	it( 'should set Matrix elements to a single numeric value', function test() {
		var submat;

		mat.sset( '4:6,6:8', 5 );
		submat = mat.sget( '3:7,5:9' );

		assert.strictEqual( submat.toString(), '35,36,37,38;45,5,5,48;55,5,5,58;65,66,67,68' );
	});

	it( 'should set Matrix elements to elements in a different Matrix', function test() {
		var submat, zeros;

		zeros = matrix( [2,2], 'int8' );

		mat.sset( '4:6,6:8', zeros );
		submat = mat.sget( '3:7,5:9' );

		assert.strictEqual( submat.toString(), '35,36,37,38;45,0,0,48;55,0,0,58;65,66,67,68' );
	});

});
