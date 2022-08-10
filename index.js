
/////////////////////////////////////////////////////////////////
//
// SCOPA CHANGELOG CREATOR 1.0
//
/////////////////////////////////////////////////////////////////

const standardVersion = require('commit-and-tag-version');
const changelogCleanup = require('./lib/cleanupChangelog');
const configurationCreator = require('./lib/configurationCreator');

module.exports.Generate = async (configuration) => {
    await standardVersion(configuration);
}

module.exports.ClenupChangelog = async (configuration) => {
    await changelogCleanup(configuration.infile);
}

module.exports.CreateConfigs = () => {
    configurationCreator()
}

