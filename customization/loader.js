'use strict';

var Extension = function () {
  var self = this;
  var baseUrl;
  var head;

  this.execute = function () {
    if (handleRedirects() == false) return;

    baseUrl = getExtensionBaseUrl();
    head = getHead();
    conditionalInjection();
  }

  var handleRedirects = function () {
    if (window != top) return;

    if (document.location.href.indexOf("http://pxcontrol1337.afdrift.se/") >= 0) {
      document.location = "https://pxcontrol1337.afdrift.se/";
      return false;
    } else if (document.location.href.indexOf("://px3.afdrift.se/") >= 0) {
      document.location = "https://pxcontrol1337.afdrift.se/";
      return false;
    }
    return true;
  }

  var conditionalInjection = function () {
    if (head == null) {
      console.log('head=null - skipping');

    } else {
      let hasAlreadyJquery = !!window.$;
      console.log('hasAlreadyJquery=' + hasAlreadyJquery);

      if (hasAlreadyJquery === false) {
        addScript("customization/jquery-3.4.1.min.js", inject);
      } else {
        inject();
      }
    }
  }

  var inject = function () {
    var customization = getCustomization();
    addCss("customization/" + customization + "/_common.css");
    addScript("customization/" + customization + "/_common.js");

    var pageId = getPageId(location.pathname);
    addCss("customization/" + customization + "/" + pageId + ".css");
    addScript("customization/" + customization + "/" + pageId + ".js");
  }

  var getCustomization = function () {
    return "tretton37"; // TODO
  }

  var getPageId = function (url) {
    var splits = url.split("?");
    var normalizedUrl = splits[0];
    normalizedUrl = normalizedUrl.replace(/[^a-z\d]/gi, "-");
    if (normalizedUrl.startsWith("-")) normalizedUrl = normalizedUrl.substr(1);
    if (normalizedUrl.endsWith("-asp")) normalizedUrl = normalizedUrl.substr(0, normalizedUrl.length - 4);
    return normalizedUrl;
  }

  var getExtensionBaseUrl = function () {
    var html = document.getElementsByTagName("html")[0];
    return html.getAttribute("extensionBaseUrl");
  }

  var addScript = function (url, callback) {
    if (head == null) return false;

    var elm = document.createElement("script");
    elm.src = url.startsWith("http://") || url.startsWith("https://")
      ? url
      : baseUrl + url;
    elm.type = "text/javascript";
    if (callback) elm.onload = callback;
    head.appendChild(elm);

    return true;
  }

  var addCss = function (url, callback) {
    if (head == null) return false;

    var elm = document.createElement("link");
    elm.href = baseUrl + url;
    elm.rel = "stylesheet";
    elm.type = "text/css";
    if (callback) elm.onload = callback;
    head.appendChild(elm);

    return true;
  }

  var getHead = function () {
    var heads = document.getElementsByTagName("head");
    if (heads.length === 0) return null;
    return heads[0];
  }
}


new Extension().execute();


// Returns the full url, based on the active customization
// relativeUrl is relative to /customization/*, eg /customization/tretton37
function url(relativeUrl) {
  // TODO customization selection
  var html = document.getElementsByTagName("html")[0];
  const baseUrl = html.getAttribute("extensionBaseUrl");
  return `${baseUrl}customization/tretton37/${relativeUrl}`;
}
