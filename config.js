'use strict';

const storageKey = 'config';
const defaultCustomization = 'tretton37';

function getConfig() {
  return new Promise((resolve) => {
    chrome.storage.local.get([storageKey], function (result) {
      const config = result[storageKey] || {};
      console.log(`GET ${storageKey}=${JSON.stringify(config)}`);

      if (!config.customization) config.customization = defaultCustomization;

      resolve(config);
    });
  });
}

function saveConfig(config) {
  const data = {};
  data[storageKey] = config;
  chrome.storage.local.set(data, function () {
    console.log(`SET ${storageKey}=${JSON.stringify(config)}`);
  });
}
