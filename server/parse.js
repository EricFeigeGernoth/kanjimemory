console.log("Hello i am here");
var convert = require("xml-js");
const fs = require("fs");
var xml = fs.readFileSync("exam.xml", "utf8");
var options = { ignoreComment: true, alwaysChildren: true };
var result = convert.xml2js(xml, options); // or convert.xml2json(xml, options)
console.log(result);
