import inquirer from "inquirer";
import generateLocalConfiguration from "./configurations/generate-local-config";
import { logAction } from "./logger";

/**
 * Create configuration for the changelog-creator
 */
export default async function configureChangelog(): Promise<void> {
    const ans: { path: string } = await inquirer.prompt([
        {
            name: "path",
            message: "Provide the absolute path to your project's ProjectSettings.asset file:\n"
        }
    ]);

    logAction("Generating local configuration...");
    await generateLocalConfiguration(ans.path);
}
