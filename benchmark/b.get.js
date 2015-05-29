'use strict';

// MODULES //

var matrix = require( './../lib' );


// VARIABLES //

var start,
	stop,
	res,
	len,
	m,
	v,
	i;


// --------------------------------------
// WARM-UP

len = 1e6;
for ( i = 0; i < len; i++ ) {
	i = i;
}


// --------------------------------------
// BENCHMARK

len = 1e6;

res = new Array( 2 );

m = matrix( [128,128] );

start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	v = m.get( 64, 64 );
}
stop = process.hrtime( start );

res[ 1 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// --------------------------------------
// RESULTS

console.log( 'Get:\t%d ops/sec', Math.floor( len/res[ 1 ] ) );
console.log( '\n' );

