import { readFile, writeFile } from "fs/promises";
import { compact, drop, forEach, keyBy, map, slice, split, take } from "lodash";
import { logAction } from "./logger";

const sectionDelimitersRegex = /(?=## \[[0-9]\.[0-9]+\.[0-9]+\])/;
const versionRegex = /## \[[0-9]\.[0-9]+\.[0-9]+\]/;

/**
 * Cleanup the changelog.
 * The standard-version package that is used internally doesn't support the
 * override of a changelog section that already exists, so generating the changelog
 * multiple times would result in multiple entries for the same version.
 * This fixes the issue by making sure that only the most recent section amongs
 * those for the same version remains.
 *
 * @param path path to the changelog file.
 */
export default async function cleanupChangelog(path: string) {
    logAction("Cleaning changelog...");

    var data = await readFile(path, "utf-8");
    const sections = data.split(sectionDelimitersRegex);
    const sectionByVersion = sections.map((x) => versionRegex.exec(x));

    // section 0 is always header
    const res: { [key: string]: string } = {};
    for (let i = 1; i < sections.length; ++i) {
        const key = sectionByVersion[i]![0];
        if (!res[key]) res[key] = sections[i];
    }
    const finalChangelog = sections[0] + Object.keys(res).reduce((acc, key) => acc + res[key], "");

    await writeFile(path, finalChangelog);
}
