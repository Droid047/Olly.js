/*global window,module,olly,document */
(function (olly, document) {
    "use strict";
    
    //Inspired from https://gist.github.com/jlong/2428561
    olly.parseURL = function (URLString) {
        var cleanPathchunks, parser, pathchunks, pathchunkIndex, query, queryIndex, querypairs, querypair, querystring;
        
        parser = document.createElement('a');
        parser.href = URLString;
        
        query = {};
        cleanPathchunks = [];

        console.log(parser.href);
        if (parser.search[0] === "?") {
            querystring = parser.search.slice(1, parser.search.length);
            querypairs = querystring.split("&");
            for (queryIndex = 0; queryIndex < querypairs.length; queryIndex += 1) {
                querypair = querypairs[queryIndex].split("=");
                query[querypair[0]] = querypair[1];
            }
        }
        console.log('hello!?');
        
        if (parser.pathname !== "") {
            pathchunks = parser.pathname.split("/");
            for (pathchunkIndex = 0; pathchunkIndex < pathchunks.length; pathchunkIndex += 1) {
                if (pathchunks[pathchunkIndex]) {
                    cleanPathchunks.push(pathchunks[pathchunkIndex]);
                }
            }
        }
        console.log('here?');      
        return {
            url: URLString,               // => "http://example.com:3000/pathname/?search=test#hash"
            protocol: parser.protocol,    // => "http:"
            hostname: parser.hostname,    // => "example.com"
            port: parser.port,            // => "3000"
            pathname: parser.pathname,    // => "/pathname/"
            pathchunks: cleanPathchunks,  // => ["pathname"]
            querystring: parser.search,   // => "?search=test"
            query: query,                 // => {search: "test"}
            hash: parser.hash,            // => "#hash"
            host: parser.host             // => "example.com:3000"
        };
    };
    
}(
    typeof module !== 'undefined' && module.exports? module.exports : window.olly,
    typeof module !== 'undefined'? module.document : document
));