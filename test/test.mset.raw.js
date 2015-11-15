/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	matrix = require( './../lib' ).raw,
	mset = require( './../lib/mset.raw.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix.raw#mset', function tests() {

	var mat;

	beforeEach( function before() {
		var data = new Int32Array( 100 );
		for ( var i = 0; i < data.length; i++ ) {
			data[ i ] = i;
		}
		mat = matrix( data, [10,10], 'int32' );
	});

	it( 'should export a function', function test() {
		expect( mset ).to.be.a( 'function' );
	});

	it( 'should throw an error if the number of linear indices and the number of matrix elements do not agree', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			mat.mset( [1,2,3], matrix( [10,1] ) );
		}
	});

	it( 'should throw an error if dimensions defined by row and column indices do not agree with value matrix dimensions', function test() {
		expect( badValue1 ).to.throw( Error );
		expect( badValue2 ).to.throw( Error );
		function badValue1() {
			mat.mset( [1,2,3], [1,2,3], matrix( [1,3] ) );
		}
		function badValue2() {
			mat.mset( [1,2,3], [1,2,3], matrix( [3,1] ) );
		}
	});

	it( 'should set Matrix values located at specified linear indices to a numeric value', function test() {
		var idx, m, prev, actual, expected;

		idx = [ 14, 28, 47 ];
		expected = '999,999,999';

		prev = mat.mget( idx );
		mat.mset( idx, 999 );

		m = mat.mget( idx );
		actual = m.toString();

		assert.notEqual( actual, prev.toString() );
		assert.strictEqual( actual, expected );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		prev = mat.mget( idx );
		mat.mset( idx, 999 );

		m = mat.mget( idx );
		actual = m.toString();

		assert.notEqual( actual, prev.toString() );
		assert.strictEqual( actual, expected, 'fliplr' );

		// Flip the matrix top-to-bottom:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		prev = mat.mget( idx );
		mat.mset( idx, 999 );

		m = mat.mget( idx );
		actual = m.toString();

		assert.notEqual( actual, prev.toString() );
		assert.strictEqual( actual, expected, 'fliplrud' );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		prev = mat.mget( idx );
		mat.mset( idx, 999 );

		m = mat.mget( idx );
		actual = m.toString();

		assert.notEqual( actual, prev.toString() );
		assert.strictEqual( actual, expected, 'flipud' );
	});

	it( 'should set Matrix values located at specified linear indices using a callback', function test() {
		var idx, m, prev, actual, expected;

		idx = [ 14, 28, 47 ];
		expected = '999,999,999';

		prev = mat.mget( idx );
		mat.mset( idx, set );

		m = mat.mget( idx );
		actual = m.toString();

		assert.notEqual( actual, prev.toString() );
		assert.strictEqual( actual, expected );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		prev = mat.mget( idx );
		mat.mset( idx, set );

		m = mat.mget( idx );
		actual = m.toString();

		assert.notEqual( actual, prev.toString() );
		assert.strictEqual( actual, expected, 'fliplr' );

		// Flip the matrix top-to-bottom:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		prev = mat.mget( idx );
		mat.mset( idx, set );

		m = mat.mget( idx );
		actual = m.toString();

		assert.notEqual( actual, prev.toString() );
		assert.strictEqual( actual, expected, 'fliplrud' );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		prev = mat.mget( idx );
		mat.mset( idx, set );

		m = mat.mget( idx );
		actual = m.toString();

		assert.notEqual( actual, prev.toString() );
		assert.strictEqual( actual, expected, 'flipud' );

		function set( d, i, j, k ) {
			assert.isTrue( i >= 0 );
			assert.isTrue( j >= 0 );
			assert.isTrue( k >= 0 );
			return 999;
		}
	});

	it( 'should set Matrix values located at specified linear indices using a callback and a provided context', function test() {
		var idx, m, prev, actual, expected;

		idx = [ 14, 28, 47 ];
		expected = '999,999,999';

		prev = mat.mget( idx );
		mat.mset( idx, set, null );

		m = mat.mget( idx );
		actual = m.toString();

		assert.notEqual( actual, prev.toString() );
		assert.strictEqual( actual, expected );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		prev = mat.mget( idx );
		mat.mset( idx, set, null );

		m = mat.mget( idx );
		actual = m.toString();

		assert.notEqual( actual, prev.toString() );
		assert.strictEqual( actual, expected, 'fliplr' );

		// Flip the matrix top-to-bottom:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		prev = mat.mget( idx );
		mat.mset( idx, set, null );

		m = mat.mget( idx );
		actual = m.toString();

		assert.notEqual( actual, prev.toString() );
		assert.strictEqual( actual, expected, 'fliplrud' );

		// Flip the matrix left-to-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		prev = mat.mget( idx );
		mat.mset( idx, set, null );

		m = mat.mget( idx );
		actual = m.toString();

		assert.notEqual( actual, prev.toString() );
		assert.strictEqual( actual, expected, 'flipud' );

		function set() {
			/* jshint validthis:true */
			assert.isNull( this );
			return 999;
		}
	});

	it( 'should set Matrix values located at specified linear indices to values from a different Matrix', function test() {
		var idx, m, vmat;

		idx = [ 5, 53, 23 ];

		vmat = matrix( new Int32Array( [1,2,3] ), [1,3], 'int32' );

		mat.mset( idx, vmat );
		m = mat.mget( idx );

		assert.strictEqual( m.toString(), '1,2,3' );

		// Flip the value matrix top-to-bottom...
		vmat.offset = vmat.length - vmat.strides[ 0 ];
		vmat.strides[ 0 ] *= -1;

		mat.mset( idx, vmat );
		m = mat.mget( idx );

		assert.strictEqual( m.toString(), '1,2,3', 'vmat flipud' );

		// Flip the matrix top-to-bottom...
		mat.offset = mat.length - mat.strides[ 0 ];
		mat.strides[ 0 ] *= -1;

		mat.mset( idx, vmat );
		m = mat.mget( idx );

		assert.strictEqual( m.toString(), '1,2,3', 'flipud' );
	});

	it( 'should set all rows and select columns', function test() {
		var prev, actual, expected;

		// Numeric value:
		prev = mat.mget( null, [1] ).toString();
		mat.mset( null, [1], 5 );

		actual = mat.mget( null, [1] ).toString();
		expected = '5;5;5;5;5;5;5;5;5;5';

		assert.notEqual( prev, actual );
		assert.strictEqual( actual, expected );

		// Flip left-to-right...
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		prev = mat.mget( null, [1] ).toString();
		mat.mset( null, [1], 5 );

		actual = mat.mget( null, [1] ).toString();
		expected = '5;5;5;5;5;5;5;5;5;5';

		assert.notEqual( prev, actual );
		assert.strictEqual( actual, expected );

		// Callback:
		prev = mat.mget( null, [9] ).toString();
		mat.mset( null, [9], set );

		actual = mat.mget( null, [9] ).toString();
		expected = '20;20;20;20;20;20;20;20;20;20';

		assert.notEqual( prev, actual );
		assert.strictEqual( actual, expected );

		// Callback with context:
		prev = mat.mget( null, [2] ).toString();
		mat.mset( null, [2], set, null );

		actual = mat.mget( null, [2] ).toString();
		expected = '20;20;20;20;20;20;20;20;20;20';

		assert.notEqual( prev, actual );
		assert.strictEqual( actual, expected );

		// Flip top-to-bottom:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		prev = mat.mget( null, [8] ).toString();
		mat.mset( null, [8], set );

		actual = mat.mget( null, [8] ).toString();
		expected = '20;20;20;20;20;20;20;20;20;20';

		assert.notEqual( prev, actual );
		assert.strictEqual( actual, expected );

		// Matrix:
		prev = mat.mget( null, [3] ).toString();
		mat.mset( null, [3], matrix( [10,1], 'int32' ) );

		actual = mat.mget( null, [3] ).toString();
		expected = '0;0;0;0;0;0;0;0;0;0';

		assert.notEqual( prev, actual );
		assert.strictEqual( actual, expected );

		function set( d, i, j, k ) {
			assert.isTrue( i >= 0 );
			assert.isTrue( j >= 0 );
			assert.isTrue( k >= 0 );
			return 20;
		}
	});

	it( 'should set select rows and all columns', function test() {
		var prev, actual, expected;

		// Numeric value:
		prev = mat.mget( [1], null ).toString();
		mat.mset( [1], null, 5 );

		actual = mat.mget( [1], null ).toString();
		expected = '5,5,5,5,5,5,5,5,5,5';

		assert.notEqual( prev, actual );
		assert.strictEqual( actual, expected );

		// Flip left-to-right...
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		prev = mat.mget( null, [1] ).toString();
		mat.mset( null, [1], 5 );

		actual = mat.mget( null, [1] ).toString();
		expected = '5;5;5;5;5;5;5;5;5;5';

		assert.notEqual( prev, actual );
		assert.strictEqual( actual, expected );

		// Callback:
		prev = mat.mget( [9], null ).toString();
		mat.mset( [9], null, set );

		actual = mat.mget( [9], null ).toString();
		expected = '20,20,20,20,20,20,20,20,20,20';

		assert.notEqual( prev, actual );
		assert.strictEqual( actual, expected );

		// Callback with context:
		prev = mat.mget( [2], null ).toString();
		mat.mset( [2], null, set, null );

		actual = mat.mget( [2], null ).toString();
		expected = '20,20,20,20,20,20,20,20,20,20';

		assert.notEqual( prev, actual );
		assert.strictEqual( actual, expected );

		// Flip top-to-bottom:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length - 1;

		prev = mat.mget( null, [8] ).toString();
		mat.mset( null, [8], set );

		actual = mat.mget( null, [8] ).toString();
		expected = '20;20;20;20;20;20;20;20;20;20';

		assert.notEqual( prev, actual );
		assert.strictEqual( actual, expected );

		// Matrix:
		prev = mat.mget( [3], null ).toString();
		mat.mset( [3], null, matrix( [1,10], 'int32' ) );

		actual = mat.mget( [3], null ).toString();
		expected = '0,0,0,0,0,0,0,0,0,0';

		assert.notEqual( prev, actual );
		assert.strictEqual( actual, expected );

		function set() {
			return 20;
		}
	});

	it( 'should not dedupe indices', function test() {
		var mat1, i;

		i = 0;

		mat.mset( [1,1,1,1,2,2], set );
		mat1 = mat.mget( [1,2] );

		assert.strictEqual( mat1.toString(), '4,6' );

		function set() {
			return ++i;
		}
	});

});
