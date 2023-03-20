export const cliOperations = ["create changelog", "configure changelog creator"] as const;
export type CliOperation = (typeof cliOperations)[number];

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

export type Updater = {
    readVersion: (contents: string) => string;
    writeVersion: (contents: string, version: string) => string;
};

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

export type EnvironmentConfiguration = CustomizableConfiguration & BaseConfiguration;

export type Configuration = {
    [K in Environment]: EnvironmentConfiguration;
};
