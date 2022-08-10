const findUp = require('findup-sync');

const platformTypes = require('./platformTypes');

const devConfigName = 'configuration_dev.json';
const preReleaseConfigName = 'configuration_preRelease.json';
const releasePathConfigName = 'configuration_release.json';

// we expect this to be in node_modules
function getBasePath(isConfiguring) {
    return isConfiguring ? "./baseConfigurations" : "../../../";
}

module.exports.getTargetBaseConfigurationPath = (type, isConfiguring = false) => {
	const prefix = isConfiguring ? "example_" : "";
    
    let target = undefined;
	switch (type) {
		case platformTypes.release:
			target = findUp(prefix + releasePathConfigName, {cwd: getBasePath(isConfiguring)});
			break;
		case platformTypes.pre_release:
			target = findUp(prefix + preReleaseConfigName, {cwd: getBasePath(isConfiguring)});
			break;
		default:
			target = findUp(prefix + devConfigName, {cwd: getBasePath(isConfiguring)});
			break;
	}

	if (!target)
		throw "No configuration found for target: " + type;
	
	return target;
}