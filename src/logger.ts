import chalk from "chalk";

/**
 * Print a log in console using color green
 * @param message message to log
 */
export function logAction(message: string) {
    console.log(chalk.green(message));
}

/**
 * Print a log in console using red green
 * @param message message to log
 */
export function logError(message: string) {
    console.log(chalk.red(message));
}
