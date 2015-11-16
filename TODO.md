TODO
====

1. Should we at least validate if `matrix-like` in `mset.js`?
2. for methods accepting index `arrays` as input, generalize for `array-like` objects
	-	e.g., the case where `linspace` outputs a typed-array
	-	currently, only plain arrays are accepted
3. `toJSON`
	-	data
	-	dtype
	-	shape
	-	offset
	-	strides
	-	raw

	``` javascript
	{
		"type": "Matrix",
		"dtype": "<dtype>",
		"shape": [0,0],
		"offset": 0,
		"strides": [0,0],
		"raw": true || false,
		"data": "<data>"
	}
	```
4. typed-array 
	-	type
	-	data
5. 
