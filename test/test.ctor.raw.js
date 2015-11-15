/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	isTypedArray = require( 'validate.io-typed-array' ),
	ctor = require( './../lib/ctor.raw.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'Matrix.raw', function tests() {

	var mat = ctor( new Float32Array( 10 ), 'float32', [5,2], 0, [2,1] );

	it( 'should export a function', function test() {
		expect( ctor ).to.be.a( 'function' );
	});

	it( 'should have an arity of 5', function test() {
		assert.strictEqual( ctor.length, 5 );
	});

	it( 'should create a new Matrix instance', function test() {
		assert.isTrue( mat instanceof ctor );
	});

	it( 'should not require a `new` operator', function test() {
		var A, B;

		A = ctor( mat.data, mat.shape, mat.dtype, mat.offset, mat.strides );
		B = new ctor( mat.data, mat.shape, mat.dtype, mat.offset, mat.strides );

		assert.isTrue( A instanceof ctor );

		assert.isTrue( B instanceof ctor );
	});

	it( 'should create a Matrix having setters', function test() {
		assert.isFunction( mat.set );
		assert.isFunction( mat.iset );
		assert.isFunction( mat.mset );
		assert.isFunction( mat.sset );
	});

	it( 'should create a Matrix having getters', function test() {
		assert.isFunction( mat.get );
		assert.isFunction( mat.iget );
		assert.isFunction( mat.mget );
		assert.isFunction( mat.sget );
	});

	it( 'should create a Matrix having a custom toString method', function test() {
		assert.isFunction( mat.toString );
	});

	it( 'should create a Matrix having a dtype property', function test() {
		assert.isTrue( mat.hasOwnProperty( 'dtype' ) );
		assert.isString( mat.dtype );
	});

	it( 'should create a Matrix having a shape property', function test() {
		assert.isTrue( mat.hasOwnProperty( 'shape' ) );
		assert.isArray( mat.shape );
	});

	it( 'should create a Matrix having a strides property', function test() {
		assert.isTrue( mat.hasOwnProperty( 'strides' ) );
		assert.isArray( mat.strides );
		assert.deepEqual( mat.strides, [2,1] );
	});

	it( 'should create a Matrix having an offset property', function test() {
		assert.isTrue( mat.hasOwnProperty( 'offset' ) );
		assert.isNumber( mat.offset );
		assert.deepEqual( mat.offset, 0 );
	});

	it( 'should create a Matrix having a ndims property', function test() {
		assert.isTrue( mat.hasOwnProperty( 'ndims' ) );
		assert.isNumber( mat.ndims );
		assert.strictEqual( mat.ndims, 2 );
	});

	it( 'should create a Matrix having a length property', function test() {
		assert.isTrue( mat.hasOwnProperty( 'length' ) );
		assert.isNumber( mat.length );
		assert.strictEqual( mat.length, 10 );
	});

	it( 'should create a Matrix having a nbytes property', function test() {
		assert.isTrue( mat.hasOwnProperty( 'nbytes' ) );
		assert.isNumber( mat.nbytes );
	});

	it( 'should create a Matrix having a data property', function test() {
		assert.isTrue( mat.hasOwnProperty( 'data' ) );
		assert.isTrue( isTypedArray( mat.data ) );
	});

});
