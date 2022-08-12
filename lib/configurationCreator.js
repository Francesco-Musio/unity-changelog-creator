const prompt = require('prompt-sync')({sigint: true});
const {logAction, logError} = require('../logger');
const fs   = require('fs');
const platformTypes = require('./platformTypes');
const getTargetBaseConfigurationPath = require('./configurationPathProvider');
const getConfigName = require('./configStandardNames');
const pathExt = require("path");

module.exports = () => {
    logAction("Starting configuration for unity-changelog-creator...\n");

    logAction("\nProject Settings:\n");
    const PSpath = prompt('Insert path to ProjectSettings file: ');

    logAction("\nChangelog:\n");
    const CLpath = prompt('Insert path to Changelog\'s desired directory: ');

    logAction("\n\nCreating configuration in this folder ...");

    Object.keys(platformTypes).forEach(key => {
        const type = platformTypes[key];
        const path = getTargetBaseConfigurationPath(type, true);

		const base = JSON.parse(fs.readFileSync(path).toString());
		base.infile = CLpath + "CHANGELOG.md";
		const target = type == platformTypes.develop ? "invalid path to fallback to latest git commit tag version" : PSpath;
        base.scripts.postchangelog = pathExt.resolve(__dirname).replace('lib', '') + base.scripts.postchangelog;
		base.bumpFiles[0].filename = target;
        base.bumpFiles[0].updater = pathExt.resolve(__dirname) + '/' + base.bumpFiles[0].updater;
		base.packageFiles[0].filename = target;
        base.packageFiles[0].updater = pathExt.resolve(__dirname) + '/' + base.packageFiles[0].updater;
		fs.writeFileSync('./' + getConfigName(type), JSON.stringify(base), {flag: 'w+'});
    })

    logAction("\n\nConfiguration complete!");
}