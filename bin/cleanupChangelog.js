#!/usr/bin/env node

const config = require('../configurationProvider');
const {logAction, logError} = require('../logger');
const index = require('../index');

index.ClenupChangelog(config.Configuration()).catch(err => {
    logError('changelog-creator: ' + err);
    process.exit(1);
})