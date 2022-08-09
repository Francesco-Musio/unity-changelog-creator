const fs   = require('fs');
const options = require('./cliOptionsProvider');

const findUp = require('findup-sync');
const devConfigName = 'configuration_dev.json';
const preReleaseConfigName = 'configuration_preRelease.json';
const releasePathConfigName = 'configuration_release.json';

function getTargetBaseConfigurationPath(type){
	let target = undefined;
	switch (type) {
		case module.exports.PlatformTypes.release:
			target = findUp(releasePathConfigName);
			break;
		case module.exports.PlatformTypes.pre_release:
			target = findUp(preReleaseConfigName);
			break;
		default:
			target = findUp(devConfigName);
			break;
	}

	if (!target)
		throw "No configuration found for target: " + type;
	
	return target;
}

module.exports.Platform = options.target;
module.exports.PlatformTypes = {
	develop: 'develop',
	pre_release: 'pre-release',
	release: 'release'
}
module.exports.NewPSPath = options.psPath;
module.exports.NewChangelogPath = options.changelogPath;

module.exports.ConfigureProjectSettingsPath = function(path) {
	Object.keys(this.PlatformTypes).map(key => {
		const file = getTargetBaseConfigurationPath(this.PlatformTypes[key]);
		const f = JSON.parse(fs.readFileSync(file).toString());
		const target = key == this.PlatformTypes.develop ? "invalid path to fallback to latest git commit tag version" : path;
		f.bumpFiles[0].filename = target;
		f.packageFiles[0].filename = target;
		fs.writeFileSync(file, JSON.stringify(f));
	});
}

module.exports.ConfigureChangelogPath = function(path) {
	Object.keys(this.PlatformTypes).map(key => {
		const file = getTargetBaseConfigurationPath(this.PlatformTypes[key]);
		const f = JSON.parse(fs.readFileSync(file).toString());
		f.infile = path + 'CHANGELOG.md';
		fs.writeFileSync(file, JSON.stringify(f));
	});
}

let _configuration = null;
module.exports.Configuration = function () {
	if (_configuration) return _configuration;
	
	const baseConfig = require(getTargetBaseConfigurationPath(this.Platform));

	const additionalOptions = {};
	additionalOptions["releaseAs"] = options.releaseAs;
	if (options.skip)
		additionalOptions["skip"] = {...baseConfig.skip, ...options.skip.reduce((acc, skipStep) => {
				acc[skipStep] = true
				return acc;
			}, {})}
	

	_configuration = {...baseConfig, ...additionalOptions};
	return _configuration;
}

module.exports.HasPSPath = this.Configuration().bumpFiles[0].filename != "" && this.Configuration().packageFiles[0].filename != "";
module.exports.HasChangelogPath = this.Configuration().infile != "";
