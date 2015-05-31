'use strict';

var matrix = require( './../lib' );

var data, A, B, i;

data = new Int8Array( 10*10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
// Create a 10x10 matrix:
A = matrix( data, [10,10] );

// Extract a 4x4 submatrix from A:
console.log( A.sget( '3:7,5:9' ) );

// Create a zero-filled matrix:
B = matrix( [2,2], 'int8' );

// Set a submatrix in A to the zero-filled matrix B:
A.sset( '4:6,6:8', B );
console.log( A.sget( '3:7,5:9' ) );
