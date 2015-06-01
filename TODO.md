TODO
====

1. casting
2. higher-level API should be willing to accept an `Array`, but then cast it to `float64`, regardless of whether it contains numeric content or not.
	- lower-level API should __not__ accept plain `arrays`
		-	document this discrepancy
		-	document what input `data` is accepted 
3. if provided `data` and not a `dtype`, should determine the type from the `data`
4.validate.io-matrix / validate.io-matrix-like
5. 



#### Tests

1. getType
2. matrix
3. matrix.raw
4. mget
5. mget.raw
6. mset
7. mset.raw
8. sget
9. sget.raw
10. sset
11. sset.raw
12. ctor
13. ctor.raw

