'use strict';

// MODULES //

var matrix = require( './../lib' ),
	rawMatrix = matrix.raw;


// VARIABLES //

var start,
	stop,
	iArr,
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

iArr = new Float32Array( 128*128 );
len = 1e6;

res = new Array( 2 );

// Base matrix creator...
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	m = matrix( iArr, [128,128] );
}
stop = process.hrtime( start );

res[ 0 ] = stop[ 0 ] + stop[ 1 ]*1e-9;

// Raw matrix creator...
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	m = rawMatrix( iArr, [128,128], 'float32' );
}
stop = process.hrtime( start );

res[ 1 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// --------------------------------------
// RESULTS

console.log( 'Create:\t\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( 'Create (raw):\t%d ops/sec', Math.floor( len/res[ 1 ] ) );
console.log( '\n' );




