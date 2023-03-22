# Unity Changelog Creator

A utility for versioning using semver and CHANGELOG generation powered by Conventional Commits.
This tool has been designed to work with Unity's ProjectSettings file.

> **`unity-changelog-creator` is an extension for [`commit-and-tag-version`](https://github.com/absolute-version/commit-and-tag-version)**. It provides a user expirience ready for unity development by using the tools that the base package exposes.

### How does it work?

The tool provides **three different changelog generation steps** for work-in-progress, pre-release and release phases.

Combining those, the tool will:

1. Retrieve the current version from `Unity's ProjectSettings` file or latest git tag.
2. `Bump` the version in `ProjectSettings` based on commit history using [semver](https://semver.org/). It also resets the `iOS Bundle Number` and increase the `Android Bundle Version Code`
3. Generate `changelog` based on commits, displaying all commits under `feat` and `fix`
4. When needed, creates a new `commit` with changelog and version bump included.

The changelog creation can be run as many times as needed. The changelog will `automatically update` by adding to the latest section all the new commits found.

### Generation steps

-   `Work in progress:` only generates the changelog. It will then write a new section or updating the existing one for the release displaying the version that the commits are going to generate.
-   `Pre release:` bump the versions, generates the changelog and commit everything with the commit message `chore(release): <new_version>`
-   `Release:` update the changelog making sure that every change goes under the right section

## Requirements

Follow the [Conventional Commits Specification](https://conventionalcommits.org) in your repository.

It's important that the commit with the latest tag is reachable from every branch in the project in which the changelog needs to be generated. To guarantee the correct behavior of the tool, when ready to push to production a new release or hotfix it's necessary to:

-   after merging in master, create the changelog and tag that commit as the release
-   after publishing the release, instead of merging the release branch in develop, the master branch should be merged instead

## Installing `unity-changelog-creator`

1. Create a project.json in the root of the unity project.
2. Mark the tool as a dependency with a path to the cloned repository.
3. Navigate to the cloned repo and run `npm run build`
4. In the project's root, run `npm install`

> Soon the project will be published as an npm package, making the installation easier to perform.

## CLI usage

Run `npx unity-changelog-creator` to start using the tool.

### Configure the tool

A configuration step needs to be performed before the tool can operate correctly.

To configurate the tool, run `npx unity-changelog-creator` and select `configure changelog creator`. It will ask for the absolute path to the project's ProjectSettings.asset file: this is so the tool can correctly bump the project's version.

A new file `changelog-creator.config.json` will be created containing the configuration for each environment.

```typescript
{
    {
        // path to the Changelog file.
        infile: "./CHANGELOG.md",
        // prefix of the project's version tags.
        // e.g. tagPrefix = "hello" -> tag will be formatted like "helloX.Y.Z"
        tagPrefix: "",
        // how to display every type of commit.
        // if "section" is the same, all commit of that type are displayed in the same section.
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
        // text that will be displayed next to the version.
        compareUrlFormat: "From tag '{{previousTag}}' to current",
        // path to the ProjectSettings.asset file. Will be correctly
        // filled with the value provided during the configuration process.
        pathToProjectSettings: "path-to-project-settings"
    }
}
```

### Run changelog generation

To start the generation, run `npx unity-changelog-creator` and select `create changelog`.

There will be 3 options to choose from:

-   `develop:` will generate the changelog displaying the version as it will be after the bump. No version bump will actually occur.
-   `prerelease:` will bump the version accordingly to [`semver`](https://semver.org/) standards and update the changelog. After this, it will commit every change present with the name `chore(release): <new_version>`.
-   `release:` will just generate the changelog without the version bump.

### Specify release type imperatively

> Coming Soon

### CLI Help

> Coming Soon

## Known bugs

-   If the release version changes while working, the changelog cleanup process will not cleanup the previous section.

    -   example: if I'm working on 7.1.5 and one commit change push the version to 7.2.0, the changelog will still contain the 7.1.5 instead of deleting it.

## Next Steps

Push the package to npm
Implement help commands
Implement the releasAs option
