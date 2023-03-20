import { readFile } from "fs/promises";
import { Environment, EnvironmentConfiguration, LocalConfiguration } from "../types";
import { baseConfig } from "./configs";
import getFilePath from "./get-file-path";
import { updaterProvider } from "./updater-provider";

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
