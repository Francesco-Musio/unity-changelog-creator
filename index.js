
/////////////////////////////////////////////////////////////////
//
// SCOPA CHANGELOG CREATOR 1.0
//
/////////////////////////////////////////////////////////////////

const standardVersion = require('commit-and-tag-version');

module.exports.Generate = async function (configuration) {
    await standardVersion(configuration);
}

module.exports.ClenupChangelog = async function (configuration) {
    await cleanupChangelog(configuration.infile);
}

