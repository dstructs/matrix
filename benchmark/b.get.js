'use strict';

// MODULES //

var matrix = require( './../lib' ).raw;


// VARIABLES //

var start,
	stop,
	nRows,
	nCols,
	res,
	len,
	m,
	v,
	i, j;


// --------------------------------------
// WARM-UP

len = 1e6;
for ( i = 0; i < len; i++ ) {
	i = i;
}


// --------------------------------------
// BENCHMARK

len = 1e6;
nRows = 128;
nCols = 128;

res = new Array( 2 );

// Array of Arrays:
m = new Array( nRows );
for ( i = 0; i < nRows; i++ ) {
	m[ i ] = new Array( nCols );
	for ( j = 0; j < nCols; j++ ) {
		m[ i ][ j ] = 0;
	}
}

start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	v = m[ 64 ][ 64 ];
}
stop = process.hrtime( start );

res[ 0 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// Matrix:
m = matrix( [nRows,nCols] );

start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	v = m.get( 64, 64 );
}
stop = process.hrtime( start );

res[ 1 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// --------------------------------------
// RESULTS

console.log( 'Arrays:\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( 'Get:\t%d ops/sec', Math.floor( len/res[ 1 ] ) );
console.log( '\n' );

