'use strict';

var matrix = require( './../lib' );

// Create a new 2x2 matrix:
var mat = matrix( [2,2] );
console.log( mat );

// Inspect the initialized matrix elements:
console.log( mat.get( 1, 1 ) );

// Set a matrix element:
console.log( mat.set( 1, 1, 5  ) );

// Confirm that the matrix element was set:
console.log( mat.get( 1, 1 ) );


var arr = new Float32Array( 10*10 );

for ( var i = 0; i < arr.length; i++ ) {
	arr[ i ] = i;
}

mat = matrix( arr, [10,10] );

console.log( mat.sget( '3:6,5:9' ) );

var mat1 = matrix( [2,2], 'float32' );

mat.sset( '4:6,6:8', mat1 );
console.log( mat.sget( '3:6,5:9' ) );
