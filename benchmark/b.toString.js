'use strict';

// MODULES //

var matrix = require( './../lib' );


// VARIABLES //

var start,
	stop,
	iArr,
	nRows,
	nCols,
	res,
	len,
	m, s,
	i;


// --------------------------------------
// WARM-UP

len = 1e6;
for ( i = 0; i < len; i++ ) {
	i = i;
}


// --------------------------------------
// BENCHMARK

len = 1e3;
nRows = 128;
nCols = 128;

res = new Array( 1 );

iArr = new Float64Array( nRows*nCols );
for ( i = 0; i < nRows*nCols; i++ ) {
	iArr[ i ] = i;
}

m = matrix( iArr, [nRows,nCols] );

start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	s = m.toString();
}
stop = process.hrtime( start );

res[ 0 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// --------------------------------------
// RESULTS

console.log( 'toString:\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( '\n' );

