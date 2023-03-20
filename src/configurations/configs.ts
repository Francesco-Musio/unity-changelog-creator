import { Configuration, LocalConfiguration } from "../types";
import { updaterProvider } from "./updater-provider";

export const baseConfig: Configuration = {
    develop: {
        firstRelease: false,
        noVerify: true,
        silent: false,
        skip: { commit: true, tag: true },
        bumpFiles: [
            {
                filename: "invalid path to fallback to latest git commit tag version",
                updater: updaterProvider("develop")
            }
        ],
        packageFiles: [
            {
                filename: "invalid path to fallback to latest git commit tag version",
                updater: updaterProvider("develop")
            }
        ],
        commitUrlFormat: "{{host}}/{{owner}}/{{repository}}/commits/{{hash}}",
        infile: "./CHANGELOG.md",
        tagPrefix: "",
        types: [
            { type: "feat", section: "WIP" },
            { type: "fix", section: "WIP" },
            { type: "chore", hidden: true },
            { type: "docs", hidden: true },
            { type: "style", hidden: true },
            { type: "refactor", hidden: true },
            { type: "perf", hidden: true },
            { type: "test", hidden: true }
        ],
        compareUrlFormat: "From tag '{{previousTag}}' to current"
    },
    prerelease: {
        firstRelease: false,
        noVerify: true,
        silent: false,
        skip: { tag: true },
        commitAll: true,
        bumpFiles: [
            {
                filename: "invalid path to fallback to latest git commit tag version",
                updater: updaterProvider("prerelease")
            }
        ],
        packageFiles: [
            {
                filename: "invalid path to fallback to latest git commit tag version",
                updater: updaterProvider("prerelease")
            }
        ],
        commitUrlFormat: "{{host}}/{{owner}}/{{repository}}/commits/{{hash}}",
        infile: "./CHANGELOG.md",
        tagPrefix: "",
        types: [
            { type: "feat", section: "To release" },
            { type: "fix", section: "To release" },
            { type: "chore", hidden: true },
            { type: "docs", hidden: true },
            { type: "style", hidden: true },
            { type: "refactor", hidden: true },
            { type: "perf", hidden: true },
            { type: "test", hidden: true }
        ],
        compareUrlFormat: "From tag '{{previousTag}}' to current",
        scripts: { precommit: "git add --all" }
    },
    release: {
        firstRelease: false,
        noVerify: true,
        silent: false,
        skip: { bump: true, commit: true, tag: true },
        bumpFiles: [
            {
                filename: "invalid path to fallback to latest git commit tag version",
                updater: updaterProvider("release")
            }
        ],
        packageFiles: [
            {
                filename: "invalid path to fallback to latest git commit tag version",
                updater: updaterProvider("release")
            }
        ],
        commitUrlFormat: "{{host}}/{{owner}}/{{repository}}/commits/{{hash}}",
        infile: "./CHANGELOG.md",
        tagPrefix: "",
        types: [
            { type: "feat", section: "Features" },
            { type: "fix", section: "Bug Fixes" },
            { type: "chore", hidden: true },
            { type: "docs", hidden: true },
            { type: "style", hidden: true },
            { type: "refactor", hidden: true },
            { type: "perf", hidden: true },
            { type: "test", hidden: true }
        ],
        compareUrlFormat: "{{previousTag}} -> {{currentTag}}",
        scripts: { precommit: "git add --all" }
    }
};

export const localConfig: LocalConfiguration = {
    develop: {
        infile: "./CHANGELOG.md",
        tagPrefix: "",
        types: [
            { type: "feat", section: "WIP" },
            { type: "fix", section: "WIP" },
            { type: "chore", hidden: true },
            { type: "docs", hidden: true },
            { type: "style", hidden: true },
            { type: "refactor", hidden: true },
            { type: "perf", hidden: true },
            { type: "test", hidden: true }
        ],
        compareUrlFormat: "From tag '{{previousTag}}' to current"
    },
    prerelease: {
        infile: "./CHANGELOG.md",
        tagPrefix: "",
        types: [
            { type: "feat", section: "To release" },
            { type: "fix", section: "To release" },
            { type: "chore", hidden: true },
            { type: "docs", hidden: true },
            { type: "style", hidden: true },
            { type: "refactor", hidden: true },
            { type: "perf", hidden: true },
            { type: "test", hidden: true }
        ],
        compareUrlFormat: "From tag '{{previousTag}}' to current",
        pathToProjectSettings: "path-to-project-settings"
    },
    release: {
        infile: "./CHANGELOG.md",
        tagPrefix: "",
        types: [
            { type: "feat", section: "Features" },
            { type: "fix", section: "Bug Fixes" },
            { type: "chore", hidden: true },
            { type: "docs", hidden: true },
            { type: "style", hidden: true },
            { type: "refactor", hidden: true },
            { type: "perf", hidden: true },
            { type: "test", hidden: true }
        ],
        compareUrlFormat: "{{previousTag}} -> {{currentTag}}",
        pathToProjectSettings: "path-to-project-settings"
    }
};
