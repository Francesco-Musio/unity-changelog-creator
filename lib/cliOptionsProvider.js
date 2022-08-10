const yargs = require("yargs");

module.exports = yargs
    .usage("Configure ProjectSettings path with: [-p <psPath>] [-c <changelogPath>]\nUsage: [-t <target>] [-s <skip>] [-r <releaseAs>]") 
    .option("t", { alias: "target", describe: "ready for release or WIP", type: "string", demandOption: false, default: "develop", choices: ["develop", "pre-release", "release"]})
    .option("s", { alias: "skip", describe: "skip a specific step", type: "array", demandOption: false, choices: ["bump", "changelog", "commit"]})
    .option("r", { alias: "releaseAs", description: "override semantic versioning", type: "string", demandOption: false, choices: ["major", "minor", "patch"]})
    .alias('version', 'v')
    .alias('help', 'h')
    .wrap(120)
    .argv;