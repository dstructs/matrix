/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix class:
	matrix = require( './../lib' ).raw,

	// Module to be tested:
	sget = require( './../lib/sget.raw.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix.raw#sget', function tests() {

	var mat, data;

	data = new Int8Array( 100 );
	for ( var i = 0; i < data.length; i++ ) {
		data[ i ] = i;
	}

	beforeEach( function before() {
		mat = matrix( data, [10,10] );
	});

	it( 'should export a function', function test() {
		expect( sget ).to.be.a( 'function' );
	});

	it( 'should return values according to a specified subsequence', function test() {
		var mat1;

		mat1 = mat.sget( '1:3,2:4' );

		assert.deepEqual( mat1.shape, [2,2] );
		assert.strictEqual( mat1.toString(), '12,13;22,23' );

		// Flip up-down:
		mat1 = mat.sget( '2:0:-1,2:4' );

		assert.deepEqual( mat1.shape, [2,2] );
		assert.strictEqual( mat1.toString(), '22,23;12,13' );

		// Flip left-right:
		mat1 = mat.sget( '1:3,3:1:-1' );

		assert.deepEqual( mat1.shape, [2,2] );
		assert.strictEqual( mat1.toString(), '13,12;23,22' );

		// Flip the matrix instance up-down and then flip left-right:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length + mat.strides[0];

		mat1 = mat.sget( '1:3,3:1:-1' );

		assert.deepEqual( mat1.shape, [2,2] );
		assert.strictEqual( mat1.toString(), '83,82;73,72' );
	});

	it( 'should return an empty matrix if a subsequence does not have any corresponding matrix elements', function test() {
		var mat1 = mat.sget( '999:,998:' );

		assert.strictEqual( mat1.length, 0 );
	});

});
