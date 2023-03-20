export const pathToLocalConfiguration = "./";
export const localConfigurationName = "changelog-creator.config.json";

export default function getFilePath(): string {
    return `${pathToLocalConfiguration}${localConfigurationName}`;
}
