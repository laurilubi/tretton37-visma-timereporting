'use strict';

let config = null; // async loaded

function initCustomization(selectJq) {
  getCustomizations()
    .then(customizations => {
      for (const customization of customizations) {
        const option = $('<option/>').val(customization).text(customization);
        option.appendTo(selectJq);
      }

      const customization = config.customization;
      console.log(`customization=${customization}`);
      selectJq.val(customization);
      if (selectJq.val() !== customization) {
        // non-existant value in config
        customization = config.customization = defaultCustomization;
        selectJq.val(customization);
        saveConfig(config);
      }

      selectJq.change(() => {
        config.customization = selectJq.val();
        saveConfig(config);
      });
    });
}

function getCustomizations() {
  return new Promise((resolve) => {
    chrome.runtime.getPackageDirectoryEntry(function (directoryEntry) {
      directoryEntry.getDirectory('customization', {}, function (subDirectoryEntry) {
        const folderNames = [];
        const directoryReader = subDirectoryEntry.createReader();
        (function readNext() {
          directoryReader.readEntries(function (entries) {
            if (entries.length) {
              for (var i = 0; i < entries.length; i++) {
                if (entries[i].isDirectory == false) continue;
                folderNames.push(entries[i].name);
              }
              readNext();
            } else {
              resolve(folderNames);
            }
          });
        })();
      });
    });
  });
}

$(function () {
  getConfig()
    .then(c => config = c)
    .then(() => {
      const customizationSelectJq = $('select[name=customization]');
      initCustomization(customizationSelectJq);
    })
});
