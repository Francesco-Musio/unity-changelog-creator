#!/usr/bin/env node

import inquirer from "inquirer";
import { CliOperation, cliOperations } from "./types";
import createChangelog from "./create-changelog";
import configureChangelog from "./configure-changelog";

async function main() {
    const ans: { toDo: CliOperation } = await inquirer.prompt([
        {
            type: "list",
            name: "toDo",
            message: "Welcome to changelog-creator!\nWhat do you want to do?",
            choices: cliOperations
        }
    ]);

    switch (ans.toDo) {
        case "create changelog":
            await createChangelog();
            process.exit(1);
        case "configure changelog creator":
            await configureChangelog();
            process.exit(1);
        default:
            process.exit(0);
    }
}

main();
