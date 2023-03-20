import { Environment, Updater } from "../types";

const regexVersion = /(?:bundleVersion: )(?:[0-9]+[.]?)+/;
const regexBundleVersionCode = /(?:AndroidBundleVersionCode: )[0-9]+/;
const regexIPhoneBuildVersion = /(?<=buildNumber:\n[ ]+Standalone:[ ]+[0-9]+\n[ ]+)iPhone:[ ]+[0-9]+/;

export function updaterProvider(env: Environment): Updater {
    return {
        readVersion(contents: string) {
            const matches = regexVersion.exec(contents);
            if (!matches) {
                throw "No version found whild reading";
            }

            const versionFound = matches[0].replace("bundleVersion: ", "");
            return versionFound;
        },
        writeVersion(contents: string, version: string) {
            const androidMatches = regexBundleVersionCode.exec(contents);
            if (!androidMatches) {
                throw "No android version found";
            }
            const androidVersion = androidMatches[0].replace("AndroidBundleVersionCode: ", "");
            const iOSMatches = regexIPhoneBuildVersion.exec(contents);
            if (!iOSMatches) {
                throw "No iso version found";
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
                if (!isDev) contents = contents.replace(regexIPhoneBuildVersion, "iPhone: 0");
            }

            return contents;
        }
    };
}
