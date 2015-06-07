'use strict';

// MODULES //

var matrix = require( './../lib' ),
	rawMatrix = matrix.raw;


// VARIABLES //

var start,
	stop,
	iArr,
	nRows,
	nCols,
	res,
	len,
	m,
	i, j, k;


// --------------------------------------
// WARM-UP

len = 1e6;
for ( i = 0; i < len; i++ ) {
	i = i;
}


// --------------------------------------
// BENCHMARK

nRows = 128;
nCols = 128;
iArr = new Float32Array( nRows*nCols );
len = 1e6;

res = new Array( 8 );

// [0] Array of Arrays:
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	m = new Array( nRows );
	for ( j = 0; j < nRows; j++ ) {
		m[ j ] = new Array( nCols );
		for ( k = 0; k < nCols; k++ ) {
			m[ j ][ k ] = 0;
		}
	}
	m.ndims = 2;
	m.dtype = 'float64';
	m.shape = [ nRows, nCols ];
	m.length = nRows * nCols;
	m.data = m;
	m.nbytes = m.length * 8;
}
stop = process.hrtime( start );

res[ 0 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// [1] Array of Arrays:
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	m.ndims = 2;
	m.dtype = 'float64';
	m.shape = [ nRows, nCols ];
	m.length = nRows * nCols;
	m.data = m;
	m.nbytes = m.length * 8;
}
stop = process.hrtime( start );

res[ 1 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// [2] Base matrix creator (w/o input data)...
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	m = matrix( [nRows,nCols], 'float32' );
}
stop = process.hrtime( start );

res[ 2 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// [3] Base matrix creator...
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	m = matrix( iArr, [nRows,nCols] );
}
stop = process.hrtime( start );

res[ 3 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// [4] Base matrix constructor:
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	m = new m.constructor( iArr, 'float32', [nRows,nCols], 0, [nCols,1]  );
}
stop = process.hrtime( start );

res[ 4 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// [5] Raw matrix creator (w/o input data)...
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	m = rawMatrix( [nRows,nCols], 'float32' );
}
stop = process.hrtime( start );

res[ 5 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// [6] Raw matrix creator...
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	m = rawMatrix( iArr, [nRows,nCols], 'float32' );
}
stop = process.hrtime( start );

res[ 6 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// [7] Raw matrix constructor:
start = process.hrtime();
for ( i = 0; i < len; i++ ) {
	m = new m.constructor( iArr, 'float32', [nRows,nCols], 0, [nCols,1] );
}
stop = process.hrtime( start );

res[ 7 ] = stop[ 0 ] + stop[ 1 ]*1e-9;


// --------------------------------------
// RESULTS

console.log( 'Arrays:\t\t%d ops/sec', Math.floor( len/res[ 0 ] ) );
console.log( 'Arrays (data):\t%d ops/sec', Math.floor( len/res[ 1 ] ) );
console.log( 'Create:\t\t%d ops/sec', Math.floor( len/res[ 2 ] ) );
console.log( 'Create (data):\t%d ops/sec', Math.floor( len/res[ 3 ] ) );
console.log( 'Create (ctor):\t%d ops/sec', Math.floor( len/res[ 4 ] ) );
console.log( 'Create (raw):\t%d ops/sec', Math.floor( len/res[ 5 ] ) );
console.log( 'Create (rdata):\t%d ops/sec', Math.floor( len/res[ 6 ] ) );
console.log( 'Create (rctor):\t%d ops/sec', Math.floor( len/res[ 7 ] ) );
console.log( '\n' );




