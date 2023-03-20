import { writeFile } from "fs/promises";
import { localConfig } from "./configs";
import getFilePath from "./get-file-path";
import { LocalConfiguration } from "../types";
import { mapValues } from "lodash";

export default async function generateLocalConfiguration(pathToPS: string): Promise<void> {
    const local = mapValues(localConfig, (c) => ({
        ...c,
        pathToProjectSettings: c.pathToProjectSettings ? pathToPS : undefined
    }));

    await writeFile(getFilePath(), JSON.stringify(local), {
        flag: "w+"
    });
}
