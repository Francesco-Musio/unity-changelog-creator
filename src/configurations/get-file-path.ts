export const pathToLocalConfiguration = "./";
export const localConfigurationName = "changelog-creator.config.json";

/**
 * Get the path to the changelog-creator configuration file.
 */
export default function getFilePath(): string {
    return `${pathToLocalConfiguration}${localConfigurationName}`;
}
