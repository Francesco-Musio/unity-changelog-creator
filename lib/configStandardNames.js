const platformTypes = require('./platformTypes');
const devConfigName = 'configuration_dev.json';
const preReleaseConfigName = 'configuration_preRelease.json';
const releasePathConfigName = 'configuration_release.json';

module.exports = (type) => {
    switch (type) {
		case platformTypes.release:
			return releasePathConfigName;
		case platformTypes.pre_release:
			return preReleaseConfigName;
		default:
			return devConfigName;
	}
}