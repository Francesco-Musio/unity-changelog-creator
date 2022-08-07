
/////////////////////////////////////////////////////////////////
//
// SCOPA CHANGELOG CREATOR 1.0
//
/////////////////////////////////////////////////////////////////

const standardVersion = require('commit-and-tag-version');
const {logAction, logError} = require('./logger');
const fs   = require('fs/promises');

const sectionDelimitersRegex = /(?=## \[[0-9]\.[0-9]+\.[0-9]+\])/
const versionRegex = /## \[[0-9]\.[0-9]+\.[0-9]+\]/

async function cleanupChangelog(path) {
    logAction("Cleanup changelog..")

    var data = await fs.readFile('../../CHANGELOG.md', 'utf-8'); 
    const sections = data.split(sectionDelimitersRegex);
    const sectionByVersion = sections.map(x => versionRegex.exec(x));

    // section 0 is always header
    const res = {};
    for(i = 1; i < sections.length; ++i) {
        const key = sectionByVersion[i];
        if (!res[key]) res[key] = sections[i];
    }
    const finalChangelog = sections[0] + Object.keys(res).reduce((acc, key) => acc + res[key], "");

    await fs.writeFile('../../CHANGELOG.md', finalChangelog);
}

module.exports.Generate = async function (configuration) {
    await standardVersion(configuration);
}

module.exports.ClenupChangelog = async function (configuration) {
    await cleanupChangelog(configuration.projectSettingsPath);
}

