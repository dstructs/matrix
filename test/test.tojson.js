/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	matrix = require( './../lib' ),
	toJSON = require( './../lib/tojson.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix#toJSON', function tests() {

	it( 'should export a function', function test() {
		expect( toJSON ).to.be.a( 'function' );
	});

	it( 'should serialize a Matrix instance as JSON', function test() {
		var mat, data, actual, expected;

		// Zero-filled matrix:
		mat = matrix( [4,4], 'int8' );

		actual = mat.toJSON();
		expected = JSON.stringify({
			'type': 'Matrix',
			'dtype': 'int8',
			'shape': [4,4],
			'offset': 0,
			'strides': [4,1],
			'raw': false,
			'data': [
				0,0,0,0,
				0,0,0,0,
				0,0,0,0,
				0,0,0,0
			]
		});

		assert.strictEqual( actual, expected );

		// Full matrix:
		data = new Float32Array( 6 );
		for ( var i = 0; i < data.length; i++ ) {
			data[ i ] = i * 2;
		}

		mat = matrix( data, [3,2] );

		actual = mat.toJSON();
		expected = JSON.stringify({
			'type': 'Matrix',
			'dtype': 'float32',
			'shape': [3,2],
			'offset': 0,
			'strides': [2,1],
			'raw': false,
			'data': [
				0,2,
				4,6,
				8,10
			]
		});

		assert.strictEqual( actual, expected );
	});

	it( 'should serialize a raw Matrix instance as JSON', function test() {
		var mat, data, actual, expected;

		// Zero-filled matrix:
		mat = matrix.raw( [4,4], 'int8' );

		actual = mat.toJSON();
		expected = JSON.stringify({
			'type': 'Matrix',
			'dtype': 'int8',
			'shape': [4,4],
			'offset': 0,
			'strides': [4,1],
			'raw': true,
			'data': [
				0,0,0,0,
				0,0,0,0,
				0,0,0,0,
				0,0,0,0
			]
		});

		assert.strictEqual( actual, expected );

		// Full matrix:
		data = new Float32Array( 6 );
		for ( var i = 0; i < data.length; i++ ) {
			data[ i ] = i * 2;
		}

		mat = matrix.raw( data, [3,2] );

		actual = mat.toJSON();
		expected = JSON.stringify({
			'type': 'Matrix',
			'dtype': 'float32',
			'shape': [3,2],
			'offset': 0,
			'strides': [2,1],
			'raw': true,
			'data': [
				0,2,
				4,6,
				8,10
			]
		});

		assert.strictEqual( actual, expected );
	});

});
