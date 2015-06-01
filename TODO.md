TODO
====

1. casting
2. higher-level API should be willing to accept an `Array`, but then cast it to `float64`, regardless of whether it contains numeric content or not.
	- lower-level API should __not__ accept plain `arrays`
		-	document this discrepancy
		-	document what input `data` is accepted 
3. if provided `data` and not a `dtype`, should determine the type from the `data`
4. set/get api
	-	`sset`, `sget`
		-	should `sget` also accept a callback?
			-	provides a shortcut for doing map-type ops
		-	and should `sset` accept a callback?
			-	essentially an in-place map
	-	`mset`, `mget`
		-	use linear index
5. 
6. 
7. 
8.
9. 
10. pretty print a matrix
	-	separate module? => `compute-print-matrix`
	-	does not seem essential to core functionality
	- 	what about a general `print` module, which accepts `arrays`, `matrices`, `ndarrays`, and `dataframes`?
		-	similar to `to-matrix`, `to-array`, etc.
11. validate.io-matrix / validate.io-matrix-like
12. benchmark fancy (subsequence) get versus normal `get`
13. 

