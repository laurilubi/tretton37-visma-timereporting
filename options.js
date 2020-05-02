'use strict';

const keyCustomization = 'config.customization';

function initCustomization(selectJq) {
  getCustomizations(function (customizations) {
    debugger;
    for (let customization of customizations) {
      let option = $('<option/>').val(customization).text(customization);
      option.appendTo(selectJq);
    }

    chrome.storage.local.get([keyCustomization], function (result) {
      const customization = result[keyCustomization];
      console.log(`GET ${keyCustomization}=${customization}`);

      selectJq.val(customization);
      if (selectJq.val() === customization) return;

      // non-existant value in config
      selectJq.val('tretton37');
      persistCustomization(selectJq);
    });

    selectJq.change(function () {
      persistCustomization(selectJq);
    });
  });
}

function getCustomizations(callback) {
  debugger;
  chrome.runtime.getPackageDirectoryEntry(function (directoryEntry) {
    debugger;
    directoryEntry.getDirectory('customization', {}, function (subDirectoryEntry) {
      debugger;
      var directoryReader = subDirectoryEntry.createReader();
      var folderNames = [];
      (function readNext() {
        debugger;
        directoryReader.readEntries(function (entries) {
          debugger;
          if (entries.length) {
            for (var i = 0; i < entries.length; ++i) {
              if (entries[i].isDirectory==false) continue;
              folderNames.push(entries[i].name);
            }
            readNext();
          } else {
            callback(folderNames);
          }
        });
      })();
    });
  });
}

function persistCustomization(selectJq) {
  const data = {};
  data[keyCustomization] = selectJq.val();
  chrome.storage.local.set(data, function () {
    console.log(`SET ${keyCustomization}=${data[keyCustomization]}`);
  });
}

$(function () {
  const customizationSelectJq = $('select[name=customization]');
  initCustomization(customizationSelectJq);
});
