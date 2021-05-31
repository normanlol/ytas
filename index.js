const express = require("express");
const app = express();
const path = require("path");
const formidable = require('formidable');
const ytdl = require("ytdl-core");
const search = require("./retrievers/all");
const cheerio = require("cheerio");
const fs = require("fs");

app.listen(process.env.PORT || 3728);

app.use(express.static(path.join(__dirname, "frontend/static")));

app.post("/finder", function(request, response, next) {
    const form = formidable({multiples: true});

    form.parse(request, function(err, fields, files) {
        if (err) {
            next(err);
            return;
        }

        if (fields["id-url"]) {
            if (fields["id-url"].startsWith("http") && ytdl.validateURL(fields["id-url"])) { var id = ytdl.getURLVideoID(fields["id-url"]); }
            else { if (ytdl.validateID(fields["id-url"])) {var id = ytdl.getVideoID(fields["id-url"]);} else {var id = null;}}

            console.log(id);
            if (id == null) {
                response.send("invalid id");
                return;
            }

            search.go(id, function(resp) {
                if (resp.length == 0) {
                    response.sendFile(path.join(__dirname, "frontend/dynamic/results/none.html"));
                } else {
                    fs.readFile(__dirname + "/frontend/dynamic/results/index.html", function(err, content) {
                        if (err) {next(err); return;}
                        var $ = cheerio.load(content);
                        for (var c in resp) {
                            var d = `<a rel="noopener noreferrer" href="${resp[c].url}"><div class="result">Archive from ${translateToReadable(resp[c].source)}</div></a>`;
                            $(".results").append(d);
                        }
                        response.send($.html());
                    })
                }
            })
        } else {
            response.send("invalid id");
        }

    });
});

function translateToReadable(tx) {
    switch(tx) {
        case "archive-hidden":
            return "Archive.org's Hidden Archives";
        default:
            return "<could not translate>";
    }
}