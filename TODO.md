TODO
====

1. Should we at least validate if `matrix-like` in `mset.js`?
2. for methods accepting index `arrays` as input, generalize for `array-like` objects
	-	e.g., the case where `linspace` outputs a typed-array
	-	currently, only plain arrays are accepted
3. allow for specifying column major order?
4. fix `toString` and `toJSON` tests by only using `call`
	-	explicitly provide the context
5. 
