const cheerio = require("cheerio");
const got = require("got");

exports.hidden = function(id, cb) {
    got("https://web.archive.org/web/2oe_/http://wayback-fakeurl.archive.org/yt/" + id, {
        followRedirect: false
    }).then(function(response) {
        if (response.headers.location) {
            cb(null, {
                found: true,
                url: response.headers.location
            });
        } else {
            cb(null, {found: false, url: null})
        }
    }).catch(function(err) {
        cb(err, null);
    })
}

exports.main = function(id, cb) {
    got('https://archive.org/search.php?query=' + id + '&and[]=mediatype%3A"movies"').then(function(response) {
        var $ = cheerio.load(response.body);
        var a = [];
        for (var c in $("div .results div .C234 div a")) {
            if ($("div .results div .C234 div a")[c].attribs && $("div .results div .C234 div a")[c].attribs.href) {
                a.push("https://archive.org" + $("div .results div .C234 div a")[c].attribs.href);
            }
        }
        cb(null, a)
    }).catch(function(err) {
        cb(err, null);
    })
}