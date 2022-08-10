#!/usr/bin/env node

if (process.version.match(/v(\d+)\./)[1] < 6) {
	console.error(
		'changelog-creator: Node v6 or greater is required. `changelog-creator` did not run.'
	)
} else {
    console.log("lol");
	const config = require('../index.js');
    console.log("lol");
    config.CreateConfigs();
}