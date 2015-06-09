/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix class:
	matrix = require( './../lib' ),

	// Module to be tested:
	mget = require( './../lib/mget.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix#mget', function tests() {

	var mat, data;

	data = new Int8Array( 100 );
	for ( var i = 0; i < data.length; i++ ) {
		data[ i ] = i;
	}

	beforeEach( function before() {
		mat = matrix( data, [10,10] );
	});

	it( 'should export a function', function test() {
		expect( mget ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a linear indices argument which is not a nonnegative integer array', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			true,
			undefined,
			[],
			[1,-1],
			[1,Math.PI],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mat.mget( value );
			};
		}
	});

	it( 'should throw an error if provided a row indices argument which is not a nonnegative integer array', function test() {
		var values = [
			'5',
			5,
			NaN,
			// null, // allowed
			true,
			undefined,
			[],
			[1,-1],
			[1,Math.PI],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mat.mget( value, [1,2,3] );
			};
		}
	});

	it( 'should throw an error if provided a column indices argument which is not a nonnegative integer array', function test() {
		var values = [
			'5',
			5,
			NaN,
			// null, // allowed
			true,
			undefined,
			[],
			[1,-1],
			[1,Math.PI],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mat.mget( [1,2,3], value );
			};
		}
	});

	it( 'should return values located at specified linear indices', function test() {
		var m, expected;

		m = mat.mget( [14,28,47] );
		expected = '14,28,47';

		assert.deepEqual( m.shape, [1,3] );
		assert.strictEqual( m.toString(), expected );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		m = mat.mget( [14,28,47] );
		expected = '15,21,42';

		assert.strictEqual( m.toString(), expected, 'fliplr' );

		// Flip the matrix top-to-bottom:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		m = mat.mget( [14,28,47] );
		expected = '85,71,52';

		assert.strictEqual( m.toString(), expected, 'fliplrud' );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		m = mat.mget( [14,28,47] );
		expected = '84,78,57';

		assert.strictEqual( m.toString(), expected, 'flipud' );
	});

	it( 'should return values located at specified linear indices and ignore any indices which are out-of-bounds', function test() {
		var mat1 = mat.mget( [14,28,9999,47] );

		assert.strictEqual( mat1.toString(), '14,28,47' );
	});

	it( 'should return all rows and select columns', function test() {
		var m, expected;

		m = mat.mget( null, [1] );
		expected = '1;11;21;31;41;51;61;71;81;91';

		assert.deepEqual( m.shape, [10,1] );
		assert.strictEqual( m.toString(), expected );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		m = mat.mget( null, [1] );
		expected = '8;18;28;38;48;58;68;78;88;98';

		assert.strictEqual( m.toString(), expected, 'fliplr' );

		// Flip the matrix top-to-bottom:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		m = mat.mget( null, [1] );
		expected = '98;88;78;68;58;48;38;28;18;8';

		assert.strictEqual( m.toString(), expected, 'fliplrud' );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		m = mat.mget( null, [1] );
		expected = '91;81;71;61;51;41;31;21;11;1';

		assert.strictEqual( m.toString(), expected, 'flipud' );
	});

	it( 'should return all columns and select rows', function test() {
		var m, expected;

		m = mat.mget( [1], null );
		expected = '10,11,12,13,14,15,16,17,18,19';

		assert.deepEqual( m.shape, [1,10] );
		assert.strictEqual( m.toString(), expected );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		m = mat.mget( [1], null );
		expected = '19,18,17,16,15,14,13,12,11,10';

		assert.strictEqual( m.toString(), expected, 'fliplr' );

		// Flip the matrix top-to-bottom:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		m = mat.mget( [1], null );
		expected = '89,88,87,86,85,84,83,82,81,80';

		assert.strictEqual( m.toString(), expected, 'fliplrud' );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		m = mat.mget( [1], null );
		expected = '80,81,82,83,84,85,86,87,88,89';

		assert.strictEqual( m.toString(), expected, 'flipud' );
	});

	it( 'should ignore out-of-bounds row and column indices', function test() {
		var mat1 = mat.mget( [2,999,4], [2,999,4] );

		assert.deepEqual( mat1.shape, [2,2] );
		assert.strictEqual( mat1.toString(), '22,24;42,44' );
	});

	it( 'should return an empty matrix if provided indices which have no corresponding matrix elements', function test() {
		var mat1;

		mat1 = mat.mget( [999] );
		assert.strictEqual( mat1.length, 0 );

		mat1 = mat.mget( [999,998], [998,999] );
		assert.strictEqual( mat1.length, 0 );
	});

	it( 'should not dedupe indices', function test() {
		var mat1;

		mat1 = mat.mget( [1,1,1,1,2,2] );
		assert.strictEqual( mat1.toString(), '1,1,1,1,2,2' );

		mat1 = mat.mget( [1,1], [1,2] );
		assert.strictEqual( mat1.toString(), '11,12;11,12' );
	});

});
