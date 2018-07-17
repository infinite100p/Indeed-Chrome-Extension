var request = require('request');
var extend = require('extend');
var cheerio = require('cheerio');
var fs = require('fs');
var FileReader = require('filereader');

var $ = require('jquery');

var NUM_OF_PAGES = 3;
var jobIndex = 0;
// var gcHeapStats = require('gc-heap-stats')();

// const username = require('username');
 
// username().then(username => {
//     console.log(username);
// });

// gcHeapStats.on('stats', function (stats) {
//     console.log(JSON.stringify(stats, null, 2));
// });

// var startIndex = 20;
var startIndexes = [];

// print numbers 1 to 10 to console
// for (var i=0; i < 200; i++) {
//   fs.appendFileSync('test.txt', i + '\n');
// }

console.log('app has started yeah');

// var gcHeapStats = require('gc-heap-stats')();
// gcHeapStats.on('stats', function (stats) {
//     console.log(JSON.stringify(stats, null, 2));
// });

// generate array of startIndex values separated by a difference of 10
// [0, 10, 20, 30, 40]
function getStartIndexes() {
  let counter = 0;
  for (var i=0; i < NUM_OF_PAGES; i++) {
    startIndexes[i] = counter; 
    counter += 10; 
  }
  console.log(`startIndexes inside = ${startIndexes}`);
  return startIndexes;
}

console.log(`startIndexes outside = ${startIndexes}`);

// print jobTitles and append to text file
// for (var startIndex = 0; startIndex < 10; startIndex + 10) {
function printJobTitles() {
  for (var i = 0; i < startIndexes.length; i++) {
    request(`https://www.indeed.com/jobs?q=accounting&l=10012&start=${getStartIndexes()[i]}`, function(error, response, body) {
      if(error) {
        console.log("Error: " + error);
      }
      console.log("Status code: " + response.statusCode);

      var $ = cheerio.load(body);

      $('#resultsCol .row').each(function( index ) {
        jobIndex += 1;
        var jobTitle = $(this).find('.jobtitle').text().trim();
        var job_URL = $(this).find('.jobtitle').attr('href');
        var companyName = $(this).find('.company').text().trim();
        var location = $(this).find('.location').text().trim();
        console.log("Job Title: " + jobTitle);

        // $('#results').html(`<b> ${jobIndex} </b> \n companyName location \n ${getIndeedLink(job_URL)} \n`);

       

        fs.appendFileSync('indeed.docx', jobIndex + '. **' + jobTitle + '**' + '\n' + companyName + ' - ' + location + '\n' + getIndeedLink(job_URL) + '\n' + '\n');
      });
    })
  };
}

// download job results content retreived from Indeed
function downloadPageContent(filename, elId) {
    var elHtml = document.getElementById(elId).innerHTML;
    var link = document.createElement('a');
    link.setAttribute('download', filename);
    
    link.setAttribute('href', 'data:' + 'text/doc' + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}

var fileName =  'test.txt';

// download page content on button click
function downloadIndeedResults(filename, elId) {
  $('#download-btn').addEventListener('click', function() {
      downloadPageContent()
  })
}

// ERR: jQuery requires a window with a document
// $(document).ready(function() {
//   downloadIndeedResults(fileName, 'results');
// });


// fs.appendFileSync('test.docx', 'yo');

// window.onload = function() {

    //Check File API support
    // if (window.File && window.FileList && window.FileReader) {

                //Only plain text
                // if (!file.type.match('plain')) continue;
  // var textReader = new FileReader();

  // textReader.addEventListener("load", function(event) {
  //   console.log(`please work: ${e.target.result}`);
  // }, false);

  // textReader.readAsText('/indeed.txt');


  // textReader.onload = function(e, callback) {
  //   logTxtFileToConsole(e.target.result);
  //   console.log(`yo: ${textReader.result}`);
  //   // console.log(`indeed.text content: ${e.target.result}`);
  // };

  //Read the text file
  // textReader.readAsText('indeed.txt', 'utf-8');

// $(document).ready(function() {  


  var text = fs.readFileSync("indeed.txt").toString('utf-8');

  var file = fs.readFileSync('indeed.txt', {encoding: 'utf8'});
  console.log(`file: ${file.toString()}`);

  var alternateFile = fs.readFileSync('indeed.txt', 'utf8');
 console.log(`alternateFile: ${alternateFile}`);



  if (text) {
    console.log(`Text content: ${text}`);
  } else {
    console.log(`Text not there. ${text}`);
  }
// })

var reader = new FileReader();

reader.onload = function(e) {
  var text = reader.result;
  console.log(`e.target.result: ${e.target.result}`);
}

// reader.readAsText('test.txt', 'utf8');





// reader.readAsBinaryString('_indeed.txt');
// reader.readFile('indeed.txt', 'text', 'UTF-8');
// reader.readAsText('/Users/tinasu/Downloads/chrome\ extension2/indeed.txt', 'UTF-8');

  // log content in text file to console
  function logTxtFileToConsole(text) {
    console.log(`Textreader content: ${text}`);
  }

// with closure
// function handleFileSelect(evt)
// {
//     var files = evt.target.files; // FileList object

//     // Loop through the FileList and render image files as thumbnails.
//     for (var i = 0, f; f = files[i]; i++)
//     {

//         var reader = new FileReader();
//         reader.onload = (function(reader)
//         {
//             return function()
//             {
//                 var contents = reader.result;
//                 var lines = contents.split('\n');
//                 //////
//                 document.getElementById('container').innerHTML=contents;
//             }
//         })(reader);

//         reader.readAsText(f);
//     }
// }

// without closure
// function handleFileSelect(evt)
// {
//     var files = evt.target.files; // FileList object

//     // Loop through the FileList and render image files as thumbnails.
//     for (var i = 0, f; f = files[i]; i++)
//     {

//         var reader = new FileReader();
//         reader.onload = function(event)
//         {
//             // NOTE: event.target point to FileReader
//             var contents = event.target.result;
//             var lines = contents.split('\n');
//             //////
//             document.getElementById('container').innerHTML=contents;
//         };

//         reader.readAsText(f);
//     }
// }
      

    // };
// }

// function loadFile(o) {
//         var fr = new FileReader();
//         fr.onload = function(e)
//             {
//                 showDataFile(e, o);
//             };
//         fr.readAsText(o.files[0]);
// }

// function showDataFile(e, o) {
//         document.getElementById("data").innerText = e.target.result;
// }

// mark the end of a code run
function markCodeRun() {
  fs.appendFileSync('indeed.md', '\n End of code run');
}

// prepend http://www.indeed.com to given string
function getIndeedLink(str) {
  return `https://indeed.com${str}`;
}

function printJobTitles2() {
  for (var i = 0; i < startIndexes.length; i++) {
  request(`https://www.indeed.com/jobs?q=accounting&l=10012&start=${getStartIndexes()[i]}`).then(function() { console.log('hey')});
}}

// printJobTitles2();

// delete contents of given text file
function clearTextFile(txtFile) {
  var fs = require('fs')
  fs.writeFile(txtFile, '');
}

// clearTextFile('test.txt');


// clearTextFile('indeed.txt');

// clearTextFile('indeed.md');

// getStartIndexes();
// printJobTitles();

// markCodeRun();




      // var title = $(this).find('p.title > a.title').text().trim();
      // var score = $(this).find('div.score.unvoted').text().trim();
      // var user = $(this).find('a.author').text().trim();
      // console.log("Title: " + title);
      // console.log("Score: " + score);
      // console.log("User: " + user);


      // fs.appendFileSync('indeed.txt', jobTitle + '\n');

