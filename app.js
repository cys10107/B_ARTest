var cors = require("cors");
const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
var url = require("url");

// Build express app
var app = express();

// Main html router
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/index.html"));
});

// Serve JS files
app.get("/ARNFT", (req, res) => {
	res.sendFile(path.join(__dirname, "ARNFT.js"));
});
app.use(express.static("AframeComponents"));

// Router url builder
function makeRelativeUrl(inputStr) {
	// Parse the url input and seperate it to build the full url
	let filename = inputStr.split(".");
	return "datasets/" + filename[0] + "/" + filename[0] + "." + filename[1];
}
// Dataset routers
app.get("/datasets/:id", (req, res) => {
	let fullUrl = makeRelativeUrl(req.params.id);
	//console.log(`User attempt to GET ${fullUrl}`);
	res.sendFile(path.join(__dirname, fullUrl));
});
app.get("/image/:id", (req, res)=> {
	let fullUrl = "images/" + req.params.id;
	res.sendFile(path.join(__dirname, fullUrl));
});

// Server
// 雖然老師一定知道，但是要改hostname哦!
const hostname = '192.168.50.164'
const port = 8000;
const options = {
	key: fs.readFileSync("key.pem"),
	cert: fs.readFileSync("cert.pem")
};

var server = https.createServer(options, app);

server.listen(port, () => {
	console.log(`Server running at https://${hostname}:${port}/`);
	console.log(`Base URL: ${__dirname}`);
});