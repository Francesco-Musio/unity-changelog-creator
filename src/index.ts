#!/usr/bin/env node

import inquirer from "inquirer";
import { CliOperation, cliOperations } from "./types";
import createChangelog from "./create-changelog";
import configureChangelog from "./configure-changelog";
import { logAction } from "./logger";

async function main() {
    logAction("Welcome to changelog-creator!\n\n");

    const ans: { toDo: CliOperation } = await inquirer.prompt([
        {
            type: "list",
            name: "toDo",
            message: "What do you want to do?",
            choices: cliOperations
        }
    ]);

    switch (ans.toDo) {
        case "create changelog":
            await createChangelog();
            logAction("Changelog generated!");
            process.exit(1);
        case "configure changelog creator":
            await configureChangelog();
            logAction("Changelog-creator correctly configured!");
            process.exit(1);
        default:
            process.exit(0);
    }
}

main();
