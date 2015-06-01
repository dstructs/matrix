'use strict';

var matrix = require( './../lib' );

var data, mat, i;

data = new Int8Array( 5*2 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}

mat = matrix( data, [5,2] );

// Copy a matrix:
console.log( mat.sget( ':,:' ) );

// Extract a submatrix:
console.log( mat.sget( '1:4,:' ) );

// Flip a matrix top-to-bottom:
console.log( mat.sget( '::-1,:' ) );

// Flip a matrix left-to-right:
console.log( mat.sget( ':,::-1' ) );

// Out-of-bounds subsequence:
console.log( mat.sget( '50:100,:' ) );

// Replicate a column:
console.log( mat.mget( null, [1,1,1,1,1] ) );

// Tile extracted rows and columns:
console.log( mat.mget( [1,2,1,2,1,2,1,2], [0,1,0,1,0,1,0,1] ) );
