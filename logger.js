const chalk = require("chalk");

module.exports.logAction = function (msg) {	
	console.log(chalk.green.bold(msg))
}

module.exports.logError = function (msg) {
	console.log(chalk.red.bold(msg))
}