import { logError } from "../logger";
import { Environment, Updater } from "../types";

const regexVersion = /(?:bundleVersion: )(?:[0-9]+[.]?)+/;
const regexBundleVersionCode = /(?:AndroidBundleVersionCode: )[0-9]+/;
const regexIPhoneVersionSection = /(?<=buildNumber:\n)(    \w+: \d+(\n)?)+/;
const regexIPhoneBuildVersion = /iPhone: \d+/;

/**
 * Builds the functions that are used to read the current version
 * and write the new version.
 * These functions are provided to and used by the standard-version package.
 * @param env current environment.
 * @returns object with readVersion and writeVersion functions.
 */
export function updaterProvider(env: Environment): Updater {
    return {
        readVersion(contents: string) {
            const matches = regexVersion.exec(contents);
            if (!matches) {
                logError("No version found whild reading");
                throw Error;
            }

            const versionFound = matches[0].replace("bundleVersion: ", "");
            return versionFound;
        },
        writeVersion(contents: string, version: string) {
            const androidMatches = regexBundleVersionCode.exec(contents);
            if (!androidMatches) {
                logError("No android version found");
                throw Error;
            }
            const androidVersion = androidMatches[0].replace("AndroidBundleVersionCode: ", "");
            const iOSSection = regexIPhoneVersionSection.exec(contents);
            if (!iOSSection || iOSSection.length <= 0) {
                logError("No ios version found");
                throw Error;
            }
            const iOSMatches = regexIPhoneBuildVersion.exec(iOSSection[0]);
            if (!iOSMatches) {
                logError("No ios version found");
                throw Error;
            }
            const iOSVersion = iOSMatches[0].replace("iPhone: ", "");

            const isDev = env === "develop";

            const messageA = isDev ? "Expected ProjectSettings bump: " : "Bump ProjectSettings: ";
            console.log(messageA + this.readVersion(contents) + " -> " + version);
            const messageB = isDev ? "Expected AndroidBundleVersionCode bump: " : "Bump AndroidBundleVersionCode: ";
            console.log(messageB + androidVersion + " -> " + (parseInt(androidVersion) + 1));

            if (!isDev) {
                contents = contents.replace(regexVersion, "bundleVersion: " + version);
                contents = contents.replace(
                    regexBundleVersionCode,
                    "AndroidBundleVersionCode: " + (parseInt(androidVersion) + 1)
                );
            }

            if (parseInt(iOSVersion) > 0) {
                const messageC = isDev ? "Expected iPhoneBuildVersion reset from: " : "Reset iPhoneBuildVersion from: ";
                console.log(messageC + iOSVersion);
                if (!isDev) {
                    const baseContent = iOSSection[0].replace(regexIPhoneBuildVersion, "iPhone: 0");
                    contents = contents.replace(regexIPhoneVersionSection, baseContent);
                }
            }

            return contents;
        }
    };
}
