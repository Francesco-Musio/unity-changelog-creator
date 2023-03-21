import chalk from "chalk";

export function logAction(message: string) {
    console.log(chalk.green(message));
}

export function logError(message: string) {
    console.log(chalk.red(message));
}
