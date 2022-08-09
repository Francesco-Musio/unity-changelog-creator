const yargs = require("yargs");
const fs   = require('fs');

module.exports = yargs
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