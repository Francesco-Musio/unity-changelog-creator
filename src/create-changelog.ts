import { Configuration, Environment, EnvironmentConfiguration, environments } from "./types";
import standardVersion from "commit-and-tag-version";
import cleanupChangelog from "./cleanup-changelog";
import inquirer from "inquirer";
import getConfigurationForEnvironment from "./configurations/get-config-for-env";

export default async function createChangelog() {
    const ans: { env: Environment } = await inquirer.prompt([
        {
            type: "list",
            name: "env",
            message: "Select your environment:",
            choices: environments
        }
    ]);

    let config: EnvironmentConfiguration;
    try {
        config = await getConfigurationForEnvironment(ans.env);
    } catch (error) {
        console.log("No local configuration found for environement: " + ans.env);
        process.exit(0);
    }

    const preConfig = {
        ...config,
        skip: {
            ...config.skip,
            commit: true,
            tag: true
        }
    };

    const postConfig = {
        ...config,
        skip: {
            ...config.skip,
            bump: true,
            changelog: true
        }
    };

    await standardVersion(preConfig);

    await cleanupChangelog(config.infile);

    await standardVersion(postConfig);
}
