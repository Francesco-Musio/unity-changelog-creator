#!/usr/bin/env node

const {logError, logAction} = require('../logger');

/* istanbul ignore if */
if (process.version.match(/v(\d+)\./)[1] < 6) {
	console.error(
		'changelog-creator: Node v6 or greater is required. `changelog-creator` did not run.'
	)
} else {
	const config = require('../configurationProvider');

	if (config.NewPSPath) {
		config.ConfigureProjectSettingsPath(config.NewPSPath);
		logAction("changelog-creator: Configured new ProjectSettings path.");
		process.exit(0);
	} 
	
	if (config.NewChangelogPath) {
		config.ConfigureChangelogPath(config.NewChangelogPath);
		logAction("changelog-creator: Configured new Changelog path.");
		process.exit(0);
	} 

	if (!config.HasPSPath) {
		logError("changelog-creator: No projectSettings path has been set. Run -p to set your Project Settings path");
		process.exit(1);
	}

	if (!config.HasChangelogPath) {
		logError("changelog-creator: No Changelog path has been set. Run -c to set your Project Settings path");
		process.exit(1);
	}

	const index = require('../index');
	index.Generate(config.Configuration()).catch(err => {
		logError('changelog-creator: ' + err);
		process.exit(1);
	})
}
