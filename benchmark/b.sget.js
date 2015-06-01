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
	m, n,
	i, j, k;


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

// Basic get:
m = matrix( [nRows,nCols] );

nRows = 10;
nCols = 10;
n = matrix( [nRows,nCols] );

start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	for ( j = 0; j < nRows; j++ ) {
		for ( k = 0; k < nCols; k++ ) {
			n.set( j, k, m.get( 64+j, 64+k ) );
		}
	}
}
stop = process.hrtime( start );

res[ 0 ] = stop[ 0 ] + stop[ 1 ]*1e-9;

// Subsequence get:
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	n = m.sget( '64:74,64:74' );
}
stop = process.hrtime( start );

res[ 1 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// --------------------------------------
// RESULTS

console.log( 'get:\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( 'sget:\t%d ops/sec', Math.floor( len/res[ 1 ] ) );
console.log( '\n' );

