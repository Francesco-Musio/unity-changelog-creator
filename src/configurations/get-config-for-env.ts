import { readFile } from "fs/promises";
import { Environment, EnvironmentConfiguration, LocalConfiguration } from "../types";
import { baseConfig } from "./configs";
import getFilePath from "./get-file-path";
import { updaterProvider } from "./updater-provider";

/**
 * Provide the configuration to use for the changelog generation.
 * @param env current envitonment.
 * @returns configuration.
 */
export default async function getConfigurationForEnvironment(env: Environment): Promise<EnvironmentConfiguration> {
    const base = baseConfig[env];

    const file = await readFile(getFilePath(), "utf-8");
    const localConfig: LocalConfiguration = JSON.parse(file);
    const custom = localConfig[env];

    const complete = {
        ...base,
        ...custom,
        bumpFiles: [
            {
                filename: custom.pathToProjectSettings ?? base.bumpFiles[0].filename ?? "",
                updater: updaterProvider(env)
            }
        ],
        packageFiles: [
            {
                filename: custom.pathToProjectSettings ?? base.packageFiles[0].filename ?? "",
                updater: updaterProvider(env)
            }
        ]
    };

    return complete;
}
