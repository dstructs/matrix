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
		-	warn that set values get cast to target matrix dtype
		-	warn that when provided a `Matrix`, it must have the correct dimensions
	-	`mset`, `mget`
		-	use linear index
5. `toString` method
6. `toArray` method (???)
7. 
8. should we allow negative indices for `iset`, `iget`, etc?
9. should `set` methods return the `Matrix` instance to allow for method chaining?
10. 

