/**
 * Operations that can be performed by the changelog-creator
 */
export const cliOperations = ["create changelog", "configure changelog creator"] as const;
export type CliOperation = (typeof cliOperations)[number];

/**
 * Possible working environments
 */
export const environments = ["develop", "prerelease", "release"] as const;
export type Environment = (typeof environments)[number];

type Steps = {
    bump?: boolean;
    changelog?: boolean;
    commit?: boolean;
    tag?: boolean;
};

type TagType = {
    type: "feat" | "fix" | "chore" | "docs" | "style" | "refactor" | "perf" | "test";
    section?: string;
    hidden?: boolean;
};

/**
 * Contains the functions that will be used to read / write the app version
 */
export type Updater = {
    /**
     * Read the current version.
     * @param contents file that contains the version.
     * @returns current version.
     */
    readVersion: (contents: string) => string;

    /**
     * Provides the new file that will be written to disk after the version bump.
     * @param contents unchanged file that contained the version.
     * @param version updated version.
     * @returns file to write. Should be the "contents" after applying the version bump.
     */
    writeVersion: (contents: string, version: string) => string;
};

/**
 * Configuration internal to the module.
 * It contains the base values that cannot be changed by the user.
 */
export type BaseConfiguration = {
    firstRelease: boolean;
    noVerify: boolean;
    silent: boolean;
    skip: Steps;
    commitAll?: boolean;
    bumpFiles: { filename: string; updater: Updater }[];
    packageFiles: { filename: string; updater: Updater }[];
    commitUrlFormat: string;
    scripts?: { precommit: string };
};

/**
 * Configuration external to the module.
 * This configurations will be saved to disk so that
 * they can be edited by the user.
 */
export type CustomizableConfiguration = {
    infile: string;
    tagPrefix: string;
    types: TagType[];
    compareUrlFormat: string;
    pathToProjectSettings?: string;
};

export type LocalConfiguration = {
    [K in Environment]: CustomizableConfiguration;
};

/**
 * Complete configuration for an environment.
 */
export type EnvironmentConfiguration = CustomizableConfiguration & BaseConfiguration;

export type Configuration = {
    [K in Environment]: EnvironmentConfiguration;
};
