console.log('step a');
const clientUsesHttps = false;

var hoxy = require("hoxy");
var fs = require('fs');
var adapt = require('ugly-adapter');
console.log('step b');

var readFile = adapt.part(fs.readFile); // promise shim

var port = process.env.PORT || 8000;
console.log('step c ' +port);
var proxy = hoxy.createServer({
  reverse: "https://px3.afdrift.se"
}).listen(port);
console.log('step d');

proxy.intercept('request', (req, resp) => {
  var x = req;
  //req.headers['accept-encoding'] = 'utf-8';
  // server will now see the "x-unicorns" header
});

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
proxy.intercept('response', (req, resp) => {
  if (clientUsesHttps) return;
  makeCookiesNonSecure(resp.headers["set-cookie"]);
});

// inject tretton37 CSS and JS
proxy.intercept({
  phase: 'response',
  mimeType: 'text/html',
  as: '$'
}, (req, resp) => {
  resp.$('meta[http-equiv=Content-Type]').attr("content", "text/html; charset=utf-8");
  resp.$('title').text('Unicorns!');

  // console.log('bla');
  // var cssLink = $('<link/>').attr({
  // rel: "stylesheet",
  // type:"text/css",
  // href:"../tretton37-2.css"});

  resp.$("head").append("<link rel='stylesheet' type='text/css' href='/tretton37-common.css' />");
  resp.$("head").append("<script type='text/javascript' src='/tretton37-common.js' />");

  var pageId = getNormalizedUrl(req.url);
  resp.$("head").append("<link rel='stylesheet' type='text/css' href='/tretton37" + pageId + ".css' />");
  resp.$("head").append("<script type='text/javascript' src='/tretton37" + pageId + ".js' />");
});

// serve tretton37 CSS and JS content
proxy.intercept({
  phase: 'request',
  url: '/tretton37*.*'
}, (req, resp) => {
  console.log(req.url);

  //req.headers["content-type"] = resp.headers["content-type"] = ""; // avoid 
  try {
    var contents = fs.readFileSync("." + req.url, "utf8");
    resp.statusCode = 200;
    resp.string = contents;
  } catch (ex) {
    console.log("File " + req.url + " not found");
    resp.statusCode = 404;
    resp.string = "";
  }

  // readFile('./tretton37.css', 'utf8')
  // .then(function(header) {
  // console.log('tretton37.css B');
  // resp.string =header;

  // });
  // return readFile('./header.html', 'utf8')
  // 
  // 
});

// proxy.intercept({
//   phase: 'request',
//   url: 'tretton37*.js'
// }, (req, resp) => {
//   console.log('tretton37.js');
//   var js = fs.readFileSync('tretton37.js', 'utf8');
//   resp.statusCode = 200;
//   resp.string = js;
// });

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

console.log('step e');
