'use strict';

main();

function main() {
  if (handleRedirects() == false) return;
  pageInjection();
}

function handleRedirects() {
  if (document.location.href.indexOf("http://pxcontrol1337.afdrift.se/") >= 0) {
    document.location = "https://pxcontrol1337.afdrift.se/";
    return false;
  } else if (document.location.href.indexOf("://px3.afdrift.se/") >= 0) {
    document.location = "https://pxcontrol1337.afdrift.se/";
    return false;
  }
  return true;
}

function pageInjection() {
  if (getHead() == null) {
    console.log('head=null - skipping');

  } else {
    let hasAlreadyJquery = !!window.$;
    console.log('hasAlreadyJquery=' + hasAlreadyJquery);

    if (hasAlreadyJquery === false) {
      addScript("customization/jquery-3.4.1.min.js", getExtensionBaseUrl(), inject);
      // addScript("https://code.jquery.com/jquery-3.3.1.min.js");
      // jQuery.noConflict();
    } else {
      inject();
    }
  }
}

function inject() {
  let baseUrl = getExtensionBaseUrl();

  var customization = getCustomization();
  addCss("customization/" + customization + "/_common.css", baseUrl);
  addScript("customization/" + customization + "/_common.js", baseUrl);

  var pageId = getPageId(location.pathname);
  addCss("customization/" + customization + "/" + pageId + ".css", baseUrl);
  addScript("customization/" + customization + "/" + pageId + ".js", baseUrl);
}

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

function addScript(url, baseUrl, callback) {
  var head = getHead();
  if (head == null) return false;

  var elm = document.createElement('script');
  elm.src = url.startsWith("http://") || url.startsWith("https://")
    ? url
    : baseUrl + url;
  elm.type = "text/javascript";
  if (callback) elm.onload = callback;
  head.appendChild(elm);

  return true;
}

function addCss(url, baseUrl, callback) {
  var head = getHead();
  if (head == null) return false;

  var elm = document.createElement('link');
  elm.href = baseUrl + url;
  elm.rel = "stylesheet";
  elm.type = "text/css";
  if (callback) elm.onload = callback;
  head.appendChild(elm);

  return true;
}

function getHead() {
  var heads = document.getElementsByTagName('head');
  if (heads.length === 0) return null;
  return heads[0];
}



// Returns the full url, based on the active customization
// relativeUrl is relative to /customization/*, eg /customization/tretton37
function url(relativeUrl) {
  // TODO
  return chrome.runtime.getURL("/customization/tretton37/" + relativeUrl);
}
