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
- `Work in progress:` only generates the changelog. It will then write a new section for the release displaying the version that the commits are going to generate.
- `Pre release:` bump the versions, generates the changelog and commit everything with the commit message `chore(release): <new_version>`
- `Release:` update the changelog making sure that every change goes under the right section

## Requirements

1. Follow the [Conventional Commits Specification](https://conventionalcommits.org) in your repository.
2. Follow the [Successfull Git Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)

To guarantee the correct behavior of the tool, when ready to push to production a new release or hotfix it's necessary to:
 - after merging in master, create the changelog and tag that commit as the release
 - after publishing the release, instead of merging the release branch in develop, the master branch should be merged instead

## Installing `unity-changelog-creator`

Download the folder place it inside your Unity project.

Move into the folder inside the terminal, run `npm install` followed by `npm link`.

### Configure `unity-changelog-creator`

The tool requires a directory for the changelog and the path to the ProjectSettings file. Both path can be either absolute or relative.

To configure the tool, run
```
changelog-creator-configure
```
in the folder that you want to use as main directory. Following the directions, three configurations file will be created in the current folder.

## CLI usage

### Run generation step

Generation steps names are `develop`, `pre-release` and `release`. Any of this can be run like this:
```
changelog-creator -t <step_name>
```

### Skip lyfecycle step during execution

To skip any step of the generation process run `-s` followed by one or more steps:
- bump
- changelog
- commit

This could cause issues if used improperly, but it's useful for example to run multiple `pre-release` without having to bump the version every time like this:
```
changelog-creator -t pre-release -s bump
```

### Specify release type imperatively

To bypass the automated version bump use `-r` with the argument `major`, `minor` or `patch`.

Suppose the last version of your code is `1.0.0`, you've only landed `fix:` commits, but
you would like your next release to be a `minor`. Simply run the following:

```
changelog-creator -r <release_type>
```

You will get version `1.1.0` rather than what would be the auto-generated version `1.0.1`.

## Known bugs

- If the release version changes while working, the changelog cleanup process will not cleanup the previous section.
    - example: if I'm working on 7.1.5 and one change push the version to 7.2.0, the changelog will still contain the 7.1.5 instead of deleting it.

- If the release is done with the `releaseAs` command, the changelog will delete the former version's section.
    - example: if I'm working on 7.1.5 and want to release as minor, the changelog will still contain the 7.1.5 instead of deleting it.

## Next Steps

Push the package to npm
Complete the configuration script with more options