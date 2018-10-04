const clientUsesHttps = process.env.CLIENT_USES_HTTPS || false;
const defaultCustomization = process.env.DEFAULT_CUSTOMIZATION || "tretton37";
const port = process.env.PORT || 8000;

console.log("Node process version: " + process.version);
console.log("clientUsesHttps: " + clientUsesHttps);
console.log("defaultCustomization: " + defaultCustomization);
console.log("Internal port: " + port);

var hoxy = require("hoxy");
var fs = require('fs');
var adapt = require('ugly-adapter');

var readFile = adapt.part(fs.readFile); // promise shim

var proxy = hoxy.createServer({
  reverse: "https://px3.afdrift.se"
}).listen(port);

//proxy.intercept('request', function (req, resp) {
//var x = req;
//req.headers['accept-encoding'] = 'utf-8';
// server will now see the "x-unicorns" header
//});

// encoding
// <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
// proxy.intercept({
// phase: 'response',
// mimeType: 'text/html',
// as: '$'
// }, function(req, resp) {
// resp.$('meta[http-equiv=Content-Type]').attr("content", "text/html; charset=utf-8");
// });

// non-secure cookies
proxy.intercept('response', function (req, resp) {
  if (clientUsesHttps) return;
  makeCookiesNonSecure(resp.headers["set-cookie"]);
});

// inject tretton37 CSS and JS
proxy.intercept({
  phase: 'response',
  mimeType: 'text/html',
  as: '$'
}, function (req, resp) {
  //resp.$('meta[http-equiv=Content-Type]').attr("content", "text/html; charset=utf-8");
  //resp.$('title').text('Unicorns!'); TODO put into js

  // console.log('bla');
  // var cssLink = $('<link/>').attr({
  // rel: "stylesheet",
  // type:"text/css",
  // href:"../tretton37-2.css"});

  resp.$("head").append("<script type='text/javascript' src='https://code.jquery.com/jquery-3.3.1.min.js' />");

  var customization = getCustomization(req);
  resp.$("head").append("<link rel='stylesheet' type='text/css' href='/customization/" + customization + "/_common.css' />");
  resp.$("head").append("<script type='text/javascript' src='/customization/" + customization + "/_common.js' />");

  var pageId = getNormalizedUrl(req.url);
  resp.$("head").append("<link rel='stylesheet' type='text/css' href='/customization/" + customization + "/" + pageId + ".css' />");
  resp.$("head").append("<script type='text/javascript' src='/customization/" + customization + "/" + pageId + ".js' />");
});

// serve tretton37 CSS and JS content
proxy.intercept({
  phase: 'request',
  url: '/customization/*'
}, function (req, resp) {
  console.log(req.url);

  //req.headers["content-type"] = resp.headers["content-type"] = ""; // avoid 
  var filePath = "." + req.url; // TODO sanitize?
  if (fs.existsSync(filePath) == false) { // TODO enable
    console.log("File " + req.url + " not found");
    resp.statusCode = 404;
    resp.string = "";
    return;
  }

  //try {
  var contents = fs.readFileSync(filePath, "utf8");
  resp.statusCode = 200;
  resp.string = contents;
  // } catch (ex) {
  //   // TODO remove
  //   console.log("File " + req.url + " not found");
  //   resp.statusCode = 404;
  //   resp.string = "";
  // }

  // readFile('./tretton37.css', 'utf8')
  // .then(function(header) {
  // console.log('tretton37.css B');
  // resp.string =header;

  // });
  // return readFile('./header.html', 'utf8')
  // 
  // 
});

function makeCookiesNonSecure(cookies) {
  if (cookies == null) return;
  for (var index = 0; index < cookies.length; index++) {
    cookies[index] = cookies[index].replace("secure; ", "");
  }
}

function getNormalizedUrl(url) {
  var normalizedUrl = url.replace(/[^a-z\d]/gi, "-");
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
