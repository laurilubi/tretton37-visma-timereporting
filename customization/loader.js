'use strict';

debugger;
var baseUrl = getExtensionBaseUrl();

let hasAlreadyJquery = window.jQuery == true;
// alert('jQuery=' + hasAlreadyJquery);
if (hasAlreadyJquery === false) {
  addScript("customization/jquery-3.4.1.min.js");
  // addScript("https://code.jquery.com/jquery-3.3.1.min.js");
  // jQuery.noConflict();
}

var customization = getCustomization();
addCss("customization/" + customization + "/_common.css");
addScript("customization/" + customization + "/_common.js");

var pageId = getPageId(location.pathname);
addCss("customization/" + customization + "/" + pageId + ".css");
addScript("customization/" + customization + "/" + pageId + ".js");



function getCustomization() {
  return "tretton37"; // TODO
}

function getPageId(url) {
  var splits = url.split("?");
  var normalizedUrl = splits[0];
  normalizedUrl = normalizedUrl.replace(/[^a-z\d]/gi, "-");
  if (normalizedUrl.startsWith("-")) normalizedUrl = normalizedUrl.substr(1);
  if (normalizedUrl.endsWith("-asp")) normalizedUrl = normalizedUrl.substr(0, normalizedUrl.length - 4);
  return normalizedUrl;
}

function getExtensionBaseUrl() {
  var html = document.getElementsByTagName('html')[0];
  return html.getAttribute("extensionBaseUrl");
}

function addScript(url) {
  // if (chromeFileExists(chrome.runtime.getURL(url)) === false) return;
  // chrome.runtime.sendMessage({ executeScript: true, filename: url }, function (response) { });
  var elm = document.createElement('script');
  elm.src = url.startsWith("http://") || url.startsWith("https://")
    ? url
    : baseUrl + url;
  elm.type = "text/javascript";
  document.getElementsByTagName('head')[0].appendChild(elm);
}

function addCss(url) {
  // if (chromeFileExists(chrome.runtime.getURL(url)) === false) return;
  // chrome.runtime.sendMessage({ insertCSS: true, filename: url }, function (response) { });
  var elm = document.createElement('link');
  elm.href = baseUrl + url;
  elm.rel = "stylesheet";
  elm.type = "text/css";
  document.getElementsByTagName('head')[0].appendChild(elm);
}



// Returns the full url, based on the active customization
// relativeUrl is relative to /customization/*, eg /customization/tretton37
function url(relativeUrl) {
  // TODO
  return chrome.runtime.getURL("/customization/tretton37/" + relativeUrl);
}
