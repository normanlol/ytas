const archive = require("./archive.org");

exports.go = function(id, cb) {
    var res = [];
    archive.hidden(id, function(err, resp) {
        if (resp !== null && resp.found == true) {
            res.push({
                "source": "archive-hidden",
                "url": resp.url
            });
        }
        archive.main(id, function(err, resp) {
            if (resp !== null) {
                for (var c in resp) {
                    res.push({
                        "source": "archive-main",
                        "url": resp[c]
                    });
                }
            }
            cb(res)
        });
    });
}