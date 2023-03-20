import inquirer from "inquirer";
import generateLocalConfiguration from "./configurations/generate-local-config";

export default async function configureChangelog(): Promise<void> {
    const ans: { path: string } = await inquirer.prompt([
        {
            name: "path",
            message: "Provide the absolute path to your project's ProjectSettings.asset file:\n"
        }
    ]);

    await generateLocalConfiguration(ans.path);
}
