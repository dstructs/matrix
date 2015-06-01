'use strict';

// MODULES //

var matrix = require( './../lib' );


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

res = new Array( 1 );

m = matrix( [nRows,nCols] );
j = 64*m.strides[0] + 1*m.strides[1];

start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	v = m.iget( j );
}
stop = process.hrtime( start );

res[ 0 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// --------------------------------------
// RESULTS

console.log( 'iget:\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( '\n' );

