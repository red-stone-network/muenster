var filterLink = "none"

const https = require('https');
  
// This gets the URL blocklist. Don't wanna host it here in case Glitch
// doesn't like it.
const url = 'https://redstone-nw.netlify.app/blocklist.txt';
  
const request = https.request(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data = data + chunk.toString();
    });
  
    response.on('end', () => {
      filterLink = new RegExp(
        data.replace(/\n/g, "").replace(/https:\/\//g, ""),
        "gi")
    });
})
request.on('error', (error) => {
    console.log('An error', error);
});
request.end()

function filterLink1(match, n1) {
  return '<a href="' + encodeURI(n1) + '" target="_blank" onclick="aClick(this);">' + match + "</a>";
}

function filterLink2(match, n1) {
  return '<img src="' + encodeURI(n1) + '">';
}

exports.filter = function(text, format) {
  var result = text;
  var result = result.replace(/^[\s\r\n]/, "");
  var result = result.replace(/</g, "&lt;");
  var result = result.replace(/>/g, "&gt;");
  var result = result.replace(/[\s\r\n]$/, "");
  var oldresult = result;
  
  // START SLUR FILTER - DO NOT PUT ANYTHING IN HERE UNLESS IT REMOVES
  // SLURS OR OTHER BAD STUFF
  var oldresult = result;
  var result = result.replace(
    filterLink,
    ""
  );
  var result = result.replace(/[fF]+[ a@A4*#$]+[ gGq*$#]+[ aAgGq*#$oO0tT4]*/g, "");
  if (result != oldresult) {
    if (format == true) {
      result = "<span class=\"contentdeleted\">The content of this message was deleted due to possible rule-breaking content.</span>";
    } else {
      result = "[ CONTENT DELETED ]";
    }
  }
  // END SLUR FILTER
  if (format == true) {
    if (/Apr 01/.test(new Date().toDateString())) {
      var result = result.replace(/hi/ig, "cheese");
      var result = result.replace(/hello/ig, "haiiii! :3");
      var result = result.replace(/:\)|:D/g, ":3");  
      var result = result.replace(/>:\)|>:D/g, ">:3");
      var result = result.replace(/:\(|D:/g, "TwT");
      var result = result.replace(/you/ig, "uwu");
      var result = result.replace(/ok/ig, "no");
      var result = result.replace(/right now/ig, "later");
      var result = result.replace(/now/ig, "later");
      var result = result.replace(/fuck/ig, "fracking fracker");
      var result = result.replace(/what/ig, "**WHAT THE FUCK**");
      
      var result = result.replace(/shit/ig, "biscuit");
      var result = result.replace(/ass/ig, "booty booty buttcheeks");
      var result = result.replace(/april fools/ig, "APRIL FOOLS BY MUENSTER! >:3");
      var result = result.replace(/math/ig, "number class");
    }
    
    for (let i = 1; i < 3; ++i) {
      var result = result.replace(/\n/, "<br>");
    }
    var result = result.replace(/\n/g, "");
    var result = result.replace(/!\(([^\)]+)\)/, filterLink2);
    var result = result.replace(
      /\<\)\)\)\(([^\)]+)\)/,
      '<audio controls src="$1">'
    );
    var result = result.replace(/\[https:/, "[");
    var result = result.replace(
      /(https:\/\/([a-zA-Z0-9\-\.]+)[\S]+)/g,
      filterLink1
    );
    var result = result.replace(
      /\*\*\*([\sa-zA-Z.,:;?!@#$%^&()\-_=+]+)\*\*\*/g,
      "<b><i>$1</i></b>"
    );
    var result = result.replace(
      /\*\*([\sa-zA-Z.,:;?!@#$%^&()\-_=+]+)\*\*/g,
      "<b>$1</b>"
    );
    var result = result.replace(
      /\*([\sa-zA-Z.,:;?!@#$%^&()\-_=+]+)\*/g,
      "<i>$1</i>"
    );
    var result = result.replace(
      /\_\_([\sa-zA-Z.,:;?!@#$%^&()\-*=+]+)\_\_/g,
      "<u>$1</u>"
    );
    var result = result.replace(
      /\~\~([\s\a-zA-Z.,:;?!@#$%^&*()-_=+]+)\~\~/g,
      "<s>$1</s>"
    );
    var result = result.replace(
      /\=\=([\s\a-zA-Z.,:;?!@#$%^&*()-_+]+)\=\=/g,
      "<mark>$1</mark>"
    );
  }
  return result;
}