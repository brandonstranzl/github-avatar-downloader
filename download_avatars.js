var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');
var filePath = './avatars'

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body)
    // *this is code from first part of exercise - this was moved to CB function as don't need two loops of same data:
    // var data = JSON.parse(body);
    // for (var i = 0; i < data.length; i++) {
    //   console.log(data[i].url)
    // }
    }
  );
}

  function cb(err, body) {
    var data = JSON.parse(body);
    for (var i = 0; i < data.length; i++) {
      var url = data[i].avatar_url;
      // var filePath = `./avatars/${data[i].url}`;
      var filePath = "./avatars/" + data[i].login ;
      downloadImageByURL(url, filePath);
    }
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

if (process.argv[2] == undefined) {
  console.log("GIVE ME THE PARAMETERS NEWBIE!");
  } else {
  getRepoContributors(process.argv[2], process.argv[3], cb)
}


// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg")
