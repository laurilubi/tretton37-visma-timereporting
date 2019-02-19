const clientUsesHttps = process.env.CLIENT_USES_HTTPS || false;
const defaultCustomization = process.env.DEFAULT_CUSTOMIZATION || "tretton37";
const port = process.env.PORT || 8000;

var hoxy = require("hoxy");
var fs = require('fs');
var adapter = require('ugly-adapter');
var fileUrl = require('file-url');

console.log("Node process version: " + process.version);
console.log("clientUsesHttps: " + clientUsesHttps);
console.log("defaultCustomization: " + defaultCustomization);
console.log("Internal port: " + port);
console.log("Project base url: " + getProjectBaseUrl());

var readFile = adapter.part(fs.readFile); // promise shim

var proxy = hoxy.createServer({
  reverse: "https://px3.afdrift.se"
}).listen(port);

var jqueryRgx = /<script\s[^>]*src="[^"]*jquery[^"]*"/gi;
var headEndRgx = /<\s*\/\s*head\s*>/i; // only the first occurrence
var imageBaseUrlRgx = /\{\{imageBaseUrl\}\}/gi;

// non-secure cookies
proxy.intercept('response', function (req, resp) {
  if (clientUsesHttps) return;
  makeCookiesNonSecure(resp.headers["set-cookie"]);
});

// inject tretton37 CSS and JS
proxy.intercept({
  phase: 'response',
  mimeType: 'text/html',
  as: 'string' // required to avoid fixing HTML nesting errors, it might differ from how browser fix those issues
}, function (req, resp) {
  var addition = "";
  var hasAlreadyJquery = jqueryRgx.test(resp.string);
  if (hasAlreadyJquery == false)
    addition += "<script type='text/javascript' src='https://code.jquery.com/jquery-3.3.1.min.js'></script>";

  addition += "<script type='text/javascript' src='/customization/helper.js'></script>";

  var customization = getCustomization(req);
  addition += "<link rel='stylesheet' type='text/css' href='/customization/" + customization + "/_common.css' />";
  addition += "<script type='text/javascript' src='/customization/" + customization + "/_common.js'></script>";

  var pageId = getPageId(req.url);
  addition += "<link rel='stylesheet' type='text/css' href='/customization/" + customization + "/" + pageId + ".css' />";
  addition += "<script type='text/javascript' src='/customization/" + customization + "/" + pageId + ".js'></script>";

  resp.string = resp.string.replace(headEndRgx, addition + "</head>");
});

// serve tretton37 CSS and JS content
proxy.intercept({
  phase: 'request',
  url: '/customization/*'
}, function (req, resp) {
  console.log(req.url);

  var filePath = getValidFilePath(req.url);
  if (fs.existsSync(filePath) == false) {
    console.log("File " + req.url + " not found");
    resp.statusCode = 404;
    resp.string = "";
    return;
  }

  var contents = fs.readFileSync(filePath, "utf8");
  resp.statusCode = 200;

  if (filePath == "./customization/helper.js") {
    contents = contents.replace(imageBaseUrlRgx, getImageBaseUrl(req));
  }

  resp.string = contents;
});

proxy.intercept({ phase: 'response', as: 'string', url: '/customization/*.png' }, function (req, resp) { serveBinary(req, resp, "image/png"); });
proxy.intercept({ phase: 'response', as: 'string', url: '/customization/*.gif' }, function (req, resp) { serveBinary(req, resp, "image/gif"); });
proxy.intercept({ phase: 'response', as: 'string', url: '/customization/*.jpg' }, function (req, resp) { serveBinary(req, resp, "image/jpeg"); });

function serveBinary(req, resp, contentType) {
  console.log(req.url);

  var filePath = getValidFilePath(req.url);
  if (fs.existsSync(filePath) == false) {
    console.log("Image " + req.url + " not found");
    resp.statusCode = 404;
    resp.string = "";
    return;
  }

  var contents = fs.readFileSync(filePath);
  resp.statusCode = 200;
  resp.headers["content-type"] = "image/png"; // TODO correct extension
  resp.string = contents;
}

function getValidFilePath(url) {
  // TODO sanitize?
  return "." + url;
}

function makeCookiesNonSecure(cookies) {
  if (cookies == null) return;
  for (var index = 0; index < cookies.length; index++) {
    cookies[index] = cookies[index].replace("secure; ", "");
  }
}

function getPageId(url) {
  var splits = url.split("?");
  var normalizedUrl = splits[0];
  normalizedUrl = normalizedUrl.replace(/[^a-z\d]/gi, "-");
  if (normalizedUrl.startsWith("-")) normalizedUrl = normalizedUrl.substr(1);
  if (normalizedUrl.endsWith("-asp")) normalizedUrl = normalizedUrl.substr(0, normalizedUrl.length - 4);
  return normalizedUrl;
}

function getCustomization(req) {
  const prefix = "_customization=";
  var cookieString = req.headers.cookie;
  var cookies = cookieString.split("; ");
  var customizationCookies = cookies.filter(function (_) { return _.startsWith(prefix) });
  if (customizationCookies.length == 0) return defaultCustomization;

  var cookieValue = customizationCookies[0].substr(prefix.length);
  if (cookieValue == "") return defaultCustomization;

  return cookieValue;
}

function getProjectBaseUrl() {
  if (port != 8000) { // TODO should be based on env variable
    return "https://raw.githubusercontent.com/laurilubi/tretton37-visma-timereporting/master/";
  }

  return fileUrl("./") + "/";
}

function getImageBaseUrl(req) {
  return getProjectBaseUrl() + "customization/" + getCustomization(req) + "/";
}
