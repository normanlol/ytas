const archive = require("../retrievers/archive.org");

// This is simply a test of the retrievers used for this project.
// All IDs here are known to work with these methods, if they result in
// error, either the scraper is broken or the content was removed from the
// site itself.

console.log("-- scraper test for ytas --")

archive.hidden("PVy1xh7eVpk", function(err, resp) {
    if (resp == null || resp.url == null) {
        console.log("[x] hidden archive.org search for 'PVy1xh7eVpk' has failed.");
    } else {
        console.log("[i] hidden archive.org search for 'PVy1xh7eVpk' has succeeded.");
    }
});

archive.main("0aQ3RqEOF44", function(err, resp) {
    if (resp == null || resp.length == 0) {
        console.log("[x] main archive.org search for '0aQ3RqEOF44' has failed.");
    } else {
        console.log("[i] main archive.org search for '0aQ3RqEOF44' has succeeded. [got " + resp.length + " results]");
    }
});