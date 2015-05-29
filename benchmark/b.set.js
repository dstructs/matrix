'use strict';

// MODULES //

var matrix = require( './../lib' );


// VARIABLES //

var start,
	stop,
	res,
	len,
	m,
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

res = new Array( 1 );

m = matrix( [128,128] );

start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	m.set( 64, 64, Math.random() );
}
stop = process.hrtime( start );

res[ 0 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// --------------------------------------
// RESULTS

console.log( 'Set:\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( '\n' );

