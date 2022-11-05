"use strict";
exports.__esModule = true;
var express = require("express");
var fs = require("fs");
var cors = require("cors");
var path = require("path");
var jsonParser = express.json();
var app = express();
app.use(cors());
var filePath = "./server/data.json";
var PORT = process.env.PORT || 5000;
var corsReq = cors();
app.post("/api/users", corsReq, jsonParser, function (req, res) {
    try {
        if (!req.body) {
            return res.status(401).send();
        }
        var _a = req.body, email_1 = _a.email, password_1 = _a.password;
        var data = fs.readFileSync(filePath, "utf-8");
        var users = JSON.parse(data);
        var user = users.filter(function (el) { return el.email === email_1 && el.password === password_1; })[0];
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.sendStatus(401);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
});
app.use(express.static(path.resolve(__dirname, "../dist")));
app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});
app.listen(PORT, function () {
    console.log("Start server port ".concat(PORT, " on http://localhost:").concat(PORT));
});
