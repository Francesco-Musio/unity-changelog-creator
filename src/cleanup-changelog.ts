import { readFile, writeFile } from "fs/promises";
import { compact, drop, forEach, keyBy, map, slice, split, take } from "lodash";

const sectionDelimitersRegex = /(?=## \[[0-9]\.[0-9]+\.[0-9]+\])/;
const versionRegex = /## \[[0-9]\.[0-9]+\.[0-9]+\]/;

export default async function cleanupChangelog(path: string) {
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
