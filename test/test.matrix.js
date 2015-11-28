/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	typeName = require( 'type-name' ),
	matrix = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix', function tests() {

	it( 'should export a function', function test() {
		expect( matrix ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a shape argument which is not a nonnegative integer array', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			[1,-1],
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue1( values[ i ] ) ).to.throw( TypeError );
			expect( badValue2( values[ i ] ) ).to.throw( TypeError );
			expect( badValue3( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue1( value ) {
			return function() {
				matrix( value );
			};
		}
		function badValue2( value ) {
			return function() {
				matrix( new Int8Array( 10 ), value );
			};
		}
		function badValue3( value ) {
			return function() {
				matrix( new Int8Array( 10 ), value, 'int8' );
			};
		}
	});

	it( 'should throw an error if provided a shape array which does not contain exactly 2 elements', function test() {
		expect( badValue1 ).to.throw( Error );
		expect( badValue2 ).to.throw( Error );
		expect( badValue3 ).to.throw( Error );
		function badValue1() {
			matrix( [1,2,3] );
		}
		function badValue2() {
			matrix( new Int8Array( 12 ), [1,2,6] );
		}
		function badValue3() {
			matrix( new Int8Array( 10 ), [10], 'int8' );
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type', function test() {
		var values = [
			'5',
			'double',
			'single',
			'int64',
			'int128',
			'doubledouble',
			'boolean',
			'binary',
			'string',
			'number',
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue2( values[ i ] ) ).to.throw( TypeError );
			expect( badValue3( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue2( value ) {
			return function() {
				matrix( [1,1], value );
			};
		}
		function badValue3( value ) {
			return function() {
				matrix( new Int8Array( 10 ), [10,1], value );
			};
		}
	});

	it( 'should throw an error if provided data which is an unrecognized/unsupported data type', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			// [], // Arrays are supported, but cast to `float64`
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue2( values[ i ] ) ).to.throw( TypeError );
			expect( badValue3( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue2( value ) {
			return function() {
				matrix( value, [1,1] );
			};
		}
		function badValue3( value ) {
			return function() {
				matrix( value, [10,1], 'int8' );
			};
		}
	});

	it( 'should throw an error if the matrix shape does not match the input data length', function test() {
		expect( badValue2 ).to.throw( Error );
		expect( badValue3 ).to.throw( Error );
		function badValue2() {
			matrix( new Int8Array( 10 ), [2,2] );
		}
		function badValue3() {
			matrix( new Int8Array( 10 ), [5,1], 'int8' );
		}
	});

	it( 'should return a new Matrix instance', function test() {
		var mat;

		mat = matrix( [1,1] );
		assert.strictEqual( mat.constructor.name, 'Matrix' );

		mat = matrix( new Int8Array( 1 ), [1,1] );
		assert.strictEqual( mat.constructor.name, 'Matrix' );

		mat = matrix( [1,1], 'int8' );
		assert.strictEqual( mat.constructor.name, 'Matrix' );

		mat = matrix( new Int8Array( 1 ), [1,1], 'int8' );
		assert.strictEqual( mat.constructor.name, 'Matrix' );
	});

	it( 'should return a new Matrix instance of a specified type', function test() {
		var mat;

		mat = matrix( new Int8Array( 1 ), [1,1] );
		assert.strictEqual( mat.dtype, 'int8' );

		mat = matrix( new Int8Array( 1 ), [1,1], 'int8' );
		assert.strictEqual( mat.dtype, 'int8' );
	});

	it( 'should initialize a zero-filled Matrix if not provided input data (default dtype float64)', function test() {
		var mat = matrix( [1,1] );

		for ( var i = 0; i < mat.data.length; i++ ) {
			assert.strictEqual( mat.data[ i], 0 );
		}

		assert.strictEqual( mat.constructor.name, 'Matrix' );
		assert.strictEqual( typeName( mat.data ), 'Float64Array' );
		assert.strictEqual( mat.dtype, 'float64' );
	});

	it( 'should initialize a zero-filled Matrix having a specified data type if not provided input data', function test() {
		var mat = matrix( [1,1], 'uint32' );

		for ( var i = 0; i < mat.data.length; i++ ) {
			assert.strictEqual( mat.data[ i], 0 );
		}

		assert.strictEqual( mat.constructor.name, 'Matrix' );
		assert.strictEqual( typeName( mat.data ), 'Uint32Array' );
		assert.strictEqual( mat.dtype, 'uint32' );
	});

	it( 'should cast input data to a specified type', function test() {
		var mat;

		mat = matrix( new Int8Array( 10 ), [5,2], 'uint16' );
		assert.strictEqual( mat.dtype, 'uint16' );
		assert.strictEqual( mat.data.BYTES_PER_ELEMENT, 2 );

		mat = matrix( new Float32Array( 10 ), [5,2], 'uint8_clamped' );
		assert.strictEqual( mat.dtype, 'uint8_clamped' );
		assert.strictEqual( mat.data.BYTES_PER_ELEMENT, 1 );

		mat = matrix( new Uint32Array( 10 ), [5,2], 'float32' );
		assert.strictEqual( mat.dtype, 'float32' );
		assert.strictEqual( mat.data.BYTES_PER_ELEMENT, 4 );
	});

	it( 'should cast a plain array to a float64', function test() {
		var mat, arr;

		arr = new Array(1,2,3,4,5,6);
		mat = matrix( arr, [3,2] );

		assert.strictEqual( mat.dtype, 'float64' );
		assert.strictEqual( mat.data.BYTES_PER_ELEMENT, 8 );
		assert.strictEqual( mat.data.length, arr.length );

		for ( var i = 0; i < arr.length; i++ ) {
			assert.strictEqual( arr[ i ], mat.data[ i ] );
		}
	});

});
