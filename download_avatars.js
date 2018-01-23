var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');
var filePath = './avatars'

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'brandonstranzl',
      'Authorization': token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].url)
    }
  });
}

  function cb(err, body) {
    var data = JSON.parse(body);
    for (var i = 0; i < data.length; i++) {
      var url = data[i].url;
      var filePath = data[i].url_avatar;
    }
      return data;
      return url[i];
      return filePath[i];
  }


  function downloadImageByURL(url, filePath) {
    request.get(url)
           .on('error', function (err) {
            throw err;
            })
           .on('response', function (response) {
            console.log(filePath);
            })
           .pipe(fs.createWriteStream(filePath));
            }

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
})

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg")
// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "/avatars/url")


// var data = JSON.parse(url).avatar_url;
// console.log(obj.avatar_url);