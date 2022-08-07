const yargs = require("yargs");
const fs   = require('fs');
const devPath = './configurations/configuration_dev.json';
const preReleasePath = './configurations/configuration_preRelease.json';
const releasePath = './configurations/configuration_release.json';

const options = yargs
 .usage("Configure ProjectSettings path with: [-p <psPath>] [-c <changelogPath>]\nUsage: [-t <target>] [-s <skip>] [-r <releaseAs>]") 
 .option("t", { alias: "target", describe: "ready for release or WIP", type: "string", demandOption: false, default: "develop", choices: ["develop", "pre-release", "release"]})
 .option("s", { alias: "skip", describe: "skip a specific step", type: "array", demandOption: false, choices: ["bump", "changelog", "commit"]})
 .option("r", { alias: "releaseAs", description: "override semantic versioning", type: "string", demandOption: false, choices: ["major", "minor", "patch"]})
 .option("p", { alias: "psPath", describe: "configure the Project Settings path", type: "string", demandOption: false})
 .option("c", { alias: "changelogPath", describe: "configure the Changelog path", type: "string", demandOption: false})
 .check((argv) => {
	if (argv.c && !fs.lstatSync(argv.c).isDirectory()) {
	  throw Error('specified changelog path is invalid: ' + argv.c)
	} else if (argv.p && !fs.lstatSync(argv.p).isFile()) {
      throw Error('specified project settings path is invalid: ' + argv.p)
    } else {
      return true
    }
  })
 .alias('version', 'v')
 .alias('help', 'h')
 .wrap(120)
 .argv;

function getTargetBaseConfigurationPath(type){
	switch (type) {
		case module.exports.PlatformTypes.release:
			return releasePath;
		case module.exports.PlatformTypes.pre_release:
			return preReleasePath;
		default:
			return devPath;
	}
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
