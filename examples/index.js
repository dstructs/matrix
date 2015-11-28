'use strict';

var matrix = require( './../lib' );

// Create a new 2x2 matrix:
var mat = matrix( [2,2] );
console.log( mat );

// Inspect the initialized matrix elements:
console.log( mat.get( 1, 1 ) );

// Set a matrix element:
mat.set( 1, 1, 5  );

// Confirm that the matrix element was set:
console.log( mat.get( 1, 1 ) );

// Convert the matrix to a string:
console.log( mat.toString() );

// Convert the matrix to JSON:
console.log( mat.toJSON() );
