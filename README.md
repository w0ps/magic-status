magic-status
[![Build Status](https://travis-ci.org/w0ps/magic-status.svg?branch=master)](https://travis-ci.org/w0ps/magic-status)

an automatic status object.
First you define properties with default values,
add a callback function, give a wait time,
returns a status object,
setting the properties will now result in the cb being called after wait time, only with the updated properties.

todo: make option to always send all

```var ms = require('./index'),
		status = ms({
			asd: 5,
			hoi: 'daag',
			foo: 'bar',
			bar: 'baz'
		}, console.log.bind( console, 'update :' ), 3000 );

status.hoi; // 5
status.hoi = 3;

// update: { hoi: 3 }```