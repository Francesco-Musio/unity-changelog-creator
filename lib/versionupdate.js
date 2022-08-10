
const {logAction} = require('../logger');
const config = require('../configurationProvider');

const regexVersion = /(?:bundleVersion: )(?:[0-9]+[.]?)+/;
const regexBundleVersionCode = /(?:AndroidBundleVersionCode: )[0-9]+/;
const regexIPhoneBuildVersion = /(?<=buildNumber:\n[ ]+Standalone:[ ]+[0-9]+\n[ ]+)iPhone:[ ]+[0-9]+/

module.exports.readVersion = function (contents) {
	const versionFound = regexVersion.exec(contents)[0].replace('bundleVersion: ', '');
  return versionFound;
}

module.exports.writeVersion = function (contents, version) {
  const androidVersion = regexBundleVersionCode.exec(contents)[0].replace('AndroidBundleVersionCode: ', '');
  const iOSVersion = regexIPhoneBuildVersion.exec(contents)[0].replace('iPhone: ', '');

  const isDev = config.Platform == config.PlatformTypes.develop;

  const messageA = isDev ? "Expected ProjectSettings bump: " : "Bump ProjectSettings: ";
  logAction(messageA + this.readVersion(contents) + " -> " + version);
  const messageB = isDev ? "Expected AndroidBundleVersionCode bump: " : "Bump AndroidBundleVersionCode: ";
  logAction(messageB + androidVersion + " -> " + (parseInt(androidVersion) + 1));

  if (!isDev) {
    contents = contents.replace(regexVersion, 'bundleVersion: ' + version);
    contents = contents.replace(regexBundleVersionCode, 'AndroidBundleVersionCode: ' + (parseInt(androidVersion) + 1));
  }

  if (parseInt(iOSVersion) > 0) {
    const messageC = isDev ? "Expected iPhoneBuildVersion reset from: " : "Reset iPhoneBuildVersion from: ";
    logAction(messageC + iOSVersion);
    if (!isDev) 
      contents = contents.replace(regexIPhoneBuildVersion, 'iPhone: 0');
  }

  return contents;
}