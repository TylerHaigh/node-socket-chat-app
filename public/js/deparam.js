/**
 * jQuery.deparam - The oposite of jQuery param. Creates an object of query string parameters.
 *
 * Credits for the idea and Regex:
 * http://stevenbenner.com/2010/03/javascript-regex-trick-parse-a-query-string-into-an-object/
 * 
 * https://gist.githubusercontent.com/andrewjmead/b71e03d8df237983285892f9a265d401/raw/f377d98e530ee9b10b3d2bcca6ab9f8b7660c45d/deparam.js
*/

var deparamUri = function(uri) {
    if(uri === undefined){
        uri = window.location.search;
      }
      var queryString = {};
      uri.replace(
        new RegExp(
          "([^?=&]+)(=([^&#]*))?", "g"),
          function($0, $1, $2, $3) {
              queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
          }
        );
        return queryString;
};

(function($){
    $.deparam = $.deparam || function(uri){
      return deparamUri(uri)
    };
  })(jQuery);