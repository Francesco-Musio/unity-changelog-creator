const findUp = require('findup-sync');
const path = require("path");
const getConfigName = require('./configStandardNames');

// we expect this to be in node_modules
function getBasePath(isConfiguring) {
    return isConfiguring ? path.resolve(__dirname) + "/baseConfigurations" : "./"; //"../../../";
}

module.exports = (type, isConfiguring = false) => {
	const prefix = isConfiguring ? "example_" : "";
    const basePath = getBasePath(isConfiguring);

    let target = findUp(prefix + getConfigName(type), {cwd: basePath});

	if (!target)
		throw "No configuration found for target: " + type;
	
	return target;
}