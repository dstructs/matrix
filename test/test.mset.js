/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	matrix = require( './../lib' ),
	mset = require( './../lib/mset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix#mset', function tests() {

	var mat;

	beforeEach( function before() {
		var data = new Int32Array( 100 );
		for ( var i = 0; i < data.length; i++ ) {
			data[ i ] = i;
		}
		mat = matrix( data, [10,10] );
	});

	it( 'should export a function', function test() {
		expect( mset ).to.be.a( 'function' );
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
			expect( badValue1( values[ i ] ) ).to.throw( TypeError );
			expect( badValue2( values[ i ] ) ).to.throw( TypeError );
			expect( badValue3( values[ i ] ) ).to.throw( TypeError );
			expect( badValue4( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue1( value ) {
			return function() {
				mat.mset( value, 5 );
			};
		}
		function badValue2( value ) {
			return function() {
				mat.mset( value, function set() {
					return 0;
				});
			};
		}
		function badValue3( value ) {
			return function() {
				mat.mset( value, function set() {
					return 0;
				}, null );
			};
		}
		function badValue4( value ) {
			return function() {
				mat.mset( value, matrix( [1,1] ) );
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
			expect( badValue1( values[ i ] ) ).to.throw( TypeError );
			expect( badValue2( values[ i ] ) ).to.throw( TypeError );
			expect( badValue3( values[ i ] ) ).to.throw( TypeError );
			expect( badValue4( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue1( value ) {
			return function() {
				mat.mset( value, [1,2,3], 5 );
			};
		}
		function badValue2( value ) {
			return function() {
				mat.mset( value, [1,2,3], function set() {
					return 0;
				});
			};
		}
		function badValue3( value ) {
			return function() {
				mat.mset( value, [1,2,3], function set() {
					return 0;
				}, null );
			};
		}
		function badValue4( value ) {
			return function() {
				mat.mset( value, [1,2,3], matrix( [1,3] ) );
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
			// function(){} // 2nd arg allowed (callback)
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue1( values[ i ] ) ).to.throw( TypeError );
			expect( badValue2( values[ i ] ) ).to.throw( TypeError );
			expect( badValue3( values[ i ] ) ).to.throw( TypeError );
			expect( badValue4( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue1( value ) {
			return function() {
				mat.mset( [1,2,3], value, 5 );
			};
		}
		function badValue2( value ) {
			return function() {
				mat.mset( [1,2,3], value, function set() {
					return 0;
				});
			};
		}
		function badValue3( value ) {
			return function() {
				mat.mset( [1,2,3], value, function set() {
					return 0;
				}, null );
			};
		}
		function badValue4( value ) {
			return function() {
				mat.mset( [1,2,3], value, matrix( [1,3] ) );
			};
		}
	});

	it( 'should throw an error if provided 4 arguments and the third argument is not a function', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			true,
			undefined,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mat.mset( [1,2,3], [1,2,3], value, null );
			};
		}
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

	it( 'should set Matrix values located at specified linear indices to NaN', function test() {
		var idx, mat, m, prev, actual, expected;

		mat = matrix( [1,2,3,4,5,6,7,8,9], [3,3], 'float64' );

		idx = [ 2, 5, 8 ];
		expected = 'NaN,NaN,NaN';

		prev = mat.mget( idx );
		mat.mset( idx, NaN );

		m = mat.mget( idx );
		actual = m.toString();

		assert.notEqual( actual, prev.toString() );
		assert.strictEqual( actual, expected );

		// For integer-typed matrices, elements are set to 0:
		mat = matrix( [1,2,3,4,5,6,7,8,9], [3,3], 'int32' );

		idx = [ 2, 5, 8 ];
		expected = '0,0,0';

		prev = mat.mget( idx );
		mat.mset( idx, NaN );

		m = mat.mget( idx );
		actual = m.toString();

		assert.notEqual( actual, prev.toString() );
		assert.strictEqual( actual, expected );

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

	it( 'should set values located at specified linear indices and ignore any indices which are out-of-bounds', function test() {
		var mat1;

		// Numeric value:
		mat.mset( [14,28,9999,47], 5 );
		mat1 = mat.mget( [14,28,9999,47] );
		assert.strictEqual( mat1.toString(), '5,5,5' );

		// Callback:
		mat.mset( [14,28,745,47], set );
		mat1 = mat.mget( [14,28,745,47] );
		assert.strictEqual( mat1.toString(), '25,25,25' );

		// Callback with context:
		mat.mset( [14,1092,47,28], set, null );
		mat1 = mat.mget( [14,1092,47,28] );
		assert.strictEqual( mat1.toString(), '25,25,25' );

		// Matrix:
		mat.mset( [1534,14,28,9999,47], matrix( [1,5], 'int32' ) );
		mat1 = mat.mget( [1534,14,28,9999,47] );
		assert.strictEqual( mat1.toString(), '0,0,0' );

		function set() {
			return 25;
		}
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

	it( 'should ignore out-of-bounds row and column indices', function test() {
		var prev, mat1, actual;

		// Number:
		prev = mat.mget( [2,4], [8,7,6] ).toString();
		mat.mset( [2,999,4], [8,7,6], 5 );
		mat1 = mat.mget( [2,999,4], [8,7,6] );
		actual = mat1.toString();

		assert.notEqual( prev, actual );
		assert.strictEqual( mat.mget( [999], [8,7,6] ).length, 0 );

		// Callback:
		prev = mat.mget( [2,4], [8,7,6] ).toString();
		mat.mset( [2,1999,4], [8,7,6], set );
		mat1 = mat.mget( [2,1999,4], [8,7,6] );
		actual = mat1.toString();

		assert.notEqual( prev, actual );
		assert.strictEqual( mat.mget( [1999], [8,7,6] ).length, 0 );

		// Callback with context:
		prev = mat.mget( [3,2,1], [8,7,6] ).toString();
		mat.mset( [3,2999,2,1], [8,7,6], set, null );
		mat1 = mat.mget( [3,2999,2,1], [8,7,6] );
		actual = mat1.toString();

		assert.notEqual( prev, actual );
		assert.strictEqual( mat.mget( [2999], [8,7,6] ).length, 0 );

		// Matrix:
		prev = mat.mget( [2,4], [8,7,6] ).toString();
		mat.mset( [2,10999,4], [8,7,6], matrix( [2,3], 'int32' ) );
		mat1 = mat.mget( [2,10999,4], [8,7,6] );
		actual = mat1.toString();

		assert.notEqual( prev, actual );
		assert.strictEqual( mat.mget( [10999], [8,7,6] ).length, 0 );

		function set() {
			return 25;
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
