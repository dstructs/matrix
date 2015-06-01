/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	getType = require( './../lib/getType.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'getType', function tests() {

	it( 'should export a function', function test() {
		expect( getType ).to.be.a( 'function' );
	});

	it( 'should correctly return the corresponding data type for a typed array', function test() {
		assert.strictEqual( getType( new Int8Array( 10 ) ), 'int8', 'int8' );
		assert.strictEqual( getType( new Uint8Array( 10 ) ), 'uint8', 'uint8' );
		assert.strictEqual( getType( new Uint8ClampedArray( 10 ) ), 'uint8_clamped', 'uint8_clamped' );
		assert.strictEqual( getType( new Int16Array( 10 ) ), 'int16', 'int16' );
		assert.strictEqual( getType( new Uint16Array( 10 ) ), 'uint16', 'uint16' );
		assert.strictEqual( getType( new Int32Array( 10 ) ), 'int32', 'int32' );
		assert.strictEqual( getType( new Uint32Array( 10 ) ), 'uint32', 'uint32' );
		assert.strictEqual( getType( new Float32Array( 10 ) ), 'float32', 'float32' );
		assert.strictEqual( getType( new Float64Array( 10 ) ), 'float64', 'float64' );
	});

	it( 'should return null for unrecognized/unsupported input types', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			{},
			function(){},
			[],
			new Number( 5 ),
			new Boolean( 5 ),
			new String( '5' )
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isNull( getType( values[ i ] ), values[ i ] );
		}
	});

});
