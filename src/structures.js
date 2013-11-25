/*global window */
(function (olly) {
    "use strict";

    olly.structures = {
        // Youtube.com Video Structure
        youtube: function (URL) {
            var structure = {
                data: {
                    embedURL: 'http://www.youtube.com/v/' + URL.query.v
                }
            };
            return structure;
        },
        
        // Vimeo.com Video Structure
        vimeo: function (URL) {
            var structure = {
                data: {
                    embedURL: '//player.vimeo.com/video/' + URL.pathchunks[0]
                }
            };
            return structure;
        },
        
        // Imgur Image Structure
        imgur: function (URL) {
            var structure = {
                data: {
                    embedURL: 'http://i.imgur.com/' + URL.pathchunks[0] + '.gif'
                }
            };
            return structure;
        },
        
        // jsFiddle IDE/Editor Structure
        jsfiddle: function (URL) {
            var structure = {
                data: {
                    embedURL: 'http://jsfiddle.net/' + URL.pathchunks.join('/') + '/embedded/'
                }
            };
            return structure;
        },
        
        // Twitter Structure
        twitter: function (URL) {
            var template, structure;
            template = URL.pathchunks.length === 1 ? "twitter_timeline" : "twitter_tweet";
            structure = {
                template: template,
                data: {
                    embedURL: URL.url
                }
            };
            return structure;
        },
    
        // Github Repo Structure
        github: function (URL) {
            var structure = {
                data: {
                    repo: URL.pathchunks.join('/')
                }
            };
            return structure;
        },
        
        // Reddit Repo Structure
        reddit: function (URL) {
            var deferred, structure, callbackName;
            
            callbackName = '_reddit_' + URL.pathchunks[1];
            
            deferred = olly.defer();
            window[callbackName] = function (markup) {
                deferred.resolve({markup: markup});
            };
            
            structure = {
                templatePromise: deferred.promise,
                data: {
                    JSONPURL: 'http://www.reddit.com/r/' + URL.pathchunks[1] + '/hot/.embed',
                    callbackName: callbackName
                }
            };
            return structure;
        }
    };
    
}(window.olly));