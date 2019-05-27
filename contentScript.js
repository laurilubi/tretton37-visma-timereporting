'use strict';

// alert('starting contentScript.js');
injectExtensionBaseUrl();
addScript(chrome.runtime.getURL("customization/loader.js"));


function injectExtensionBaseUrl() {
  var att = document.createAttribute("extensionBaseUrl");
  att.value = chrome.runtime.getURL("/");
  var html = document.getElementsByTagName('html')[0];
  html.setAttributeNode(att);
  // document.extensionBaseUrl = chrome.runtime.getURL("/");
}

function addScript(url) {
  // if (chromeFileExists(chrome.runtime.getURL(url)) === false) return;
  // chrome.runtime.sendMessage({ executeScript: true, filename: url }, function (response) { });
  var elm = document.createElement('script');
  elm.src = url;
  elm.type = "text/javascript";
  document.getElementsByTagName('head')[0].appendChild(elm);
}
