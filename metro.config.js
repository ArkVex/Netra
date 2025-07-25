const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Configure path aliases
config.resolver.alias = {
  '@': __dirname,
};

module.exports = config;
