const options = require('./lib/cliOptionsProvider');
const getTargetBaseConfigurationPath = require('./lib/configurationPathProvider');
const fs   = require('fs');

let _configuration = null;
module.exports.Configuration = () => {
	if (_configuration) return _configuration;
	
	const baseConfig = JSON.parse(fs.readFileSync(getTargetBaseConfigurationPath(this.Platform), 'utf-8'));

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

/*
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
}*/

