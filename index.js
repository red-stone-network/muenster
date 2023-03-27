const { Server } = require("socket.io");

// READ THIS!
// PLEASE be careful with edits! If you make an edit while writing to the 
// logins.json file, the entire damn database will corrupt itself! I have 
// learned this the hard way sadly (multiple times!)

// RANK HIERARCHY: banned, user, helper, admin
// admin gives access to admin commands
// helper rank is entirely cosmetic - only gives an icon
// user is regular old user
// banned is for banned users

// DO NOT EDIT FEARLESSLY - YOU CAN CORRUPT THE DATABASE DOING THAT TOO!

//█▀▄ █▀▀ █░█   █░█ ▄▀█ █▀█ █▀
//█▄▀ ██▄ ▀▄▀   ▀▄▀ █▀█ █▀▄ ▄█

const disableAccountCreation = false;
// This obviously disables account creation.

const maintMode = false;
// Only maintenance users will be able to log in with this on,
// while others will get an alert saying that it's in maintenance

const nukeDatabase = false;
const nukeDatabasePassword = "no sus penis";
const nukeData = [];
// PLEASE BE CAREFUL WHEN USING THIS!
// This clears the login database of ALL USERS, which
// means everyone will lose their accounts!
// It is almost always better to revert to a prevous backup.
// Password is "nuke this shit".
// nukeData is what everything is replaced with.

// Also, we have a test account that LukasExists added.
// Username is "TestAcc", password is in .env

const enableBackupDatabase = false;
const fileToBackUpFrom = "backups.json"
// Reset the database with a backup, located in the backup
// repo, from the file put in fileToBackUpFrom.

const errorOut = false;
// Causes the server to instantly stop due to an error,
// allowing you to make changes without breaking things
// as much.

// █▀▀ █▄░█ █▀▄   █▀█ █▀▀   █▀▄ █▀▀ █░█   █░█ ▄▀█ █▀█ █▀
// ██▄ █░▀█ █▄▀   █▄█ █▀░   █▄▀ ██▄ ▀▄▀   ▀▄▀ █▀█ █▀▄ ▄█

if (errorOut == true) {
  JSON.parse("This is a controlled error - if you don't want this, set the developer variable errorOut to false.");
}

const articlesjs = require('./articles.js');
const captchajs = require('./captcha.js');
const filterjs = require('./filter.js');
const articles = articlesjs.articles;

const bannedPasswords = ["password", "password1!", "donotchangethispassword"];
const mntcUsers = ["LukasExists", "TestAcc", "TestAcc2", "TestAcc6"];
const adminUsers = ["LukasExists", "L413", "Mox_xie"];
const onlineUsers = [];

const { createCanvas, loadImage } = require("canvas");
const randClrs = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f", "#fff"];
const captchaTxt = "MmUuEeNnSsTtRr123456789";
const captchaFakeTxt = "~`';<>,./\|=+-_"

var fs = require("fs");

var COLORS = [
  "#e21400",
  "#91580f",
  "#f8a700",
  "#f78b00",
  "#f44611",
  "#87ceeb",
  "#58dc00",
  "#287b00",
  "#a8f07a",
  "#4ae8c4",
  "#f28500",
  "#dc143c",
  "#3b88eb",
  "#3824aa",
  "#a700ff",
  "#d300e7",
  "#dfff00",
  "#d2b48c",
];

// i forgot the muenster holder acc email, fuck

var logins = null;

const { Webhook } = require("discord-webhook-node");
const hook = new Webhook(process.env.LogWebhook);
const reportHook = new Webhook(process.env.ReportWebhook);
const https = require('https');
const { Gitlab } = require('@gitbeaker/node');

const gitApi = new Gitlab({
  token: process.env.gittag
});
var bc_db = null;
try {
  gitApi.RepositoryFiles.showRaw('44421528', fileToBackUpFrom, {ref: 'main'}).then((response) => {
    if (enableBackupDatabase == true) {
      console.log("attempting")
      fs.writeFile(".data/logins.json", response, (err) => {
        e2 = err ? "failure" : "success";
        console.log("revert to backup of database " + e2);
      });
    } else {
      bc_db = "denied B)"
    }
  });
} catch(e) {
  console.error("failure to read backup from gitlab: "+e)
} 

if (enableBackupDatabase == false) {
var express = require("express");
var app = express();
var server = require("http").createServer(app);
const io = require('socket.io')(server, {
  maxHttpBufferSize: 1e8 // 100 MB
});

var port = process.env.PORT || 3000;

app.get('/api/get-captcha', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(createCaptcha()));
})

if (nukeDatabase == true && nukeDatabasePassword == "nuke this shit") {
  var e2;
  fs.writeFile(".data/logins.json", JSON.stringify(nukeData), (err) => {
    e2 = err ? "failure" : "success";
    console.log("nuke database " + e2);
  });
}

function createCaptcha() {
  return captchajs.captcha();
}

function getUsernameColor(username) {
  if (username) {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  } else {
    return COLORS[1];
  }
}

function genHexString(len) {
  const hex = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let output = "";
  for (let i = 0; i < len; ++i) {
    output += hex.charAt(Math.floor(Math.random() * hex.length));
  }
  return output;
}

function filterLink1(match, n1) {
  return '<a href="' + encodeURI(n1) + '" target="_blank" onclick="aClick(this);">' + match + "</a>";
}

function filterLink2(match, n1) {
  return '<img src="' + encodeURI(n1) + '">';
}

function filterText(text, disable) {
  return filterjs.filter(text, disable);
}

function save(data) {
  var data2 = JSON.stringify(data);
  var e2;
  fs.writeFile(".data/logins.json", data2, (err) => {
    e2 = err ? "failure" : "success";
    console.log("file write " + e2);
  });
  return e2;
  console.log(logins);
}

function checkOnlineUsers() {
  let i = 0;
  while (i < onlineUsers.length) {
    if (
      logins.find((x) => x.username === onlineUsers[i].name).rank !=
      onlineUsers[i].rank
    ) {
      console.log(onlineUsers[i].name + "'s rank is incorrect");
      onlineUsers[i].rank = logins.find(
        (x) => x.username === onlineUsers[i].name
      ).rank;
    }
    if (logins.find((x) => x.username === onlineUsers[i].name) == null) {
      console.log(onlineUsers[i].name + " doesn't exist");
      onlineUsers.splice(i, 1);
    } else {
      if (
        logins.find((x) => x.username === onlineUsers[i].name).status !=
        "Online"
      ) {
        console.log(onlineUsers[i].name + " went offline");
        onlineUsers.splice(i, 1);
      }
    }
    i++;
  }
  setTimeout(checkOnlineUsers, 250);
}

checkOnlineUsers();

server.listen(port, function () {
  console.log("---MUENSTER V2---\nServer listening at port %d", port);
});

fs.readFile(".data/logins.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  logins = JSON.parse(data);
  var listOfUsers = "LIST OF USERS:\n";
  for (var i = 0; i < logins.length; i++) {
    if (adminUsers.includes(logins[i].username) == true) {
      logins[i].rank = "admin";
    }
    listOfUsers +=
      "| " + logins[i].username + " (rank: " + logins[i].rank + ") |";
  }
  if (listOfUsers != "LIST OF USERS:\n") {
    console.log(listOfUsers);
    console.log(
      "NOT BANNED USERS: " +
        listOfUsers.match(/\|[a-zA-Z0-9_ ]+ \(rank: [^b][a-z]+\) \|/g).length
    );
    console.log(
      "TOTAL USERS: " +
        listOfUsers.match(/\|[a-zA-Z0-9_ ]+ \(rank: [a-z]+\) \|/g).length
    );
  } else {
    console.log("no users");
  }
  backupDatabase();
});

function backupDatabase() {
  console.log("BACKING UP")
  var backupData = JSON.stringify(logins);
  gitApi.Commits.create(
	  '44421528',
	  'main',
	  'Backup time!',
	  [ // Array of files to add
	  	{
	  		action: 'update', // create or update
	  		filePath: 'backups.json', // Folders will be made if they don't exist
	  		content: backupData // The contents of the file
	  	},
	  ]
  );
}

setTimeout(backupDatabase, 30000);

app.use(express.static("public"));

io.on("connection", function (socket) {
  socket.loggedIn = false;
  socket.onCooldown = false;
  socket.settingCooldown = false;
  socket.currentCaptcha = createCaptcha();
  socket.warnings = 0;
  
  socket.on("getConnectionInfo", function (data, callback) {
  });

  function sendOnlineUsers() {
    socket.broadcast.emit("meta", {
      meta_name: "onlineUsers",
      meta_content: onlineUsers,
    });
    
    setTimeout(sendOnlineUsers, 500);
  }
  
  function revertCooldown() {
    socket.onCooldown = false;
  }
  
  function unmuteTemporaryMute() {
    socket.warnings = 4;
  }
  
  function revertSCd() {
    socket.settingCooldown = false;
  }
  
  sendOnlineUsers();

  socket.on("get captcha", function (data, callback) {
    socket.currentCaptcha = createCaptcha();
    callback(socket.currentCaptcha.image);
  });

  socket.on("new pm", function (data, callback) {
    if (socket.loggedIn == true) {
      var filteredMsg = filterText(data.message, true);
      socket.broadcast.emit("send pm", {
        username: socket.username,
        userTo: data.userTo,
        message: filteredMsg,
      });
      callback(filteredMsg);
    } else {
      callback(" ERROR NOT LOGGED IN ");
    }
  });

  socket.on("new message", function (data, callback) {
    if (socket.loggedIn == true) {
      if (data.message.startsWith("!!") == true) {
        if (
          logins.find((x) => x.username === socket.username).rank == "admin"
        ) {
          if (data.message.startsWith("!!ban ") == true) {
            var result = "no result";
            if (
              logins.find((x) => x.username === data.message.split(" ")[1]) !=
              null
            ) {
              logins.find(
                (x) => x.username === data.message.split(" ")[1]
              ).rank = "banned";
              socket.broadcast.emit("meta", {
                meta_name: "userBanned",
                meta_content: data.message.split(" ")[1],
              });
              socket.broadcast.emit("sys message", {
                message: data.message.split(" ")[1] + " got banned.",
                meta: "leave " + data.message.split(" ")[1],
              });
              logins.find(
                (x) => x.username === data.message.split(" ")[1]
              ).status = "Offline";
              if (/!!ban [a-zA-Z0-9_]+ ([\s\S]*)/.test(data.message) == true) {
                logins.find(
                  (x) => x.username === data.message.split(" ")[1]
                ).ban_reason = data.message.replace(
                  /!!ban [a-zA-Z0-9_]+ ([\s\S]*)/,
                  "$1"
                );
              }

              result = "successfully banned user";
            } else {
              result = "user dont exist!!!!";
            }
            save(logins);
            callback(
              '<span style="font-size: 7px; color: gray;">' +
                data.message +
                "</span><br>" +
                result
            );
            console.log(
              "BAN USER " + data.message.split(" ")[1] + " - RESULT:\n" + result
            );
          
          } else if (data.message.startsWith("!!pban ") == true) {
            var result = "no result";
            if (
              logins.find((x) => x.username === data.message.split(" ")[1]) !=
              null
            ) {
              logins.find(
                (x) => x.username === data.message.split(" ")[1]
              ).rank = "banned";
              logins.find(
                  (x) => x.username === data.message.split(" ")[1]
                ).banToken = logins.find(
                  (x) => x.username === data.message.split(" ")[1]
                ).token;
              socket.broadcast.emit("meta", {
                meta_name: "userBanned",
                meta_content: data.message.split(" ")[1],
              });
              socket.broadcast.emit("sys message", {
                message: data.message.split(" ")[1] + " got banned.",
                meta: "leave " + data.message.split(" ")[1],
              });
              logins.find(
                (x) => x.username === data.message.split(" ")[1]
              ).status = "Offline";
              if (/!!pban [a-zA-Z0-9_]+ ([\s\S]*)/.test(data.message) == true) {
                logins.find(
                  (x) => x.username === data.message.split(" ")[1]
                ).ban_reason = data.message.replace(
                  /!!pban [a-zA-Z0-9_]+ ([\s\S]*)/,
                  "$1"
                )+"<br>Account creation has been disabled. Do not come back.";
              }

              result = "successfully banned user";
            } else {
              result = "user dont exist!!!!";
            }
            save(logins);
            callback(
              '<span style="font-size: 7px; color: gray;">' +
                data.message +
                "</span><br>" +
                result
            );
            console.log(
              "BAN USER " + data.message.split(" ")[1] + " - RESULT:\n" + result
            );
          } else if (data.message.startsWith("!!helper ") == true) {
            var result = "no result";
            if (
              logins.find((x) => x.username === data.message.split(" ")[1]) !=
              null
            ) {
              logins.find(
                (x) => x.username === data.message.split(" ")[1]
              ).rank = "helper";
              result = "successfully upped rank to helper";
            } else {
              result = "user dont exist!!!!";
            }
            save(logins);
            callback(
              '<span style="font-size: 7px; color: gray;">' +
                data.message +
                "</span><br>" +
                result
            );
            console.log(
              "BAN USER " + data.message.split(" ")[1] + " - RESULT:\n" + result
            );
          } else if (data.message.startsWith("!!unban ") == true) {
            var result = "no result";
            if (
              logins.find((x) => x.username === data.message.split(" ")[1]) !=
              null
            ) {
              logins.find(
                (x) => x.username === data.message.split(" ")[1]
              ).rank = "user";
              result = "successfully unbanned user";
            } else {
              result = "user dont exist!!!!";
            }
            save(logins);
            callback(
              '<span style="font-size: 7px; color: gray;">' +
                data.message +
                "</span><br>" +
                result
            );
            console.log(
              "UNBAN USER " +
                data.message.split(" ")[1] +
                " - RESULT:\n" +
                result
            );
          } else if (data.message.startsWith("!!username ") == true) {
            var result = "no result";
            if (
              logins.find((x) => x.username === data.message.split(" ")[1]) !=
              null
            ) {
              if (
                logins.find((x) => x.username === data.message.split(" ")[2]) ==
                null
              ) {
                socket.broadcast.emit("meta", {
                  meta_name: "userBanned",
                  meta_content: data.message.split(" ")[1],
                });
                logins.find(
                  (x) => x.username === data.message.split(" ")[1]
                ).username = data.message.split(" ")[2];
                result = "successfully changed username";
              } else {
                result = "username already taken";
              }
            } else {
              result = "user dont exist!!!!";
            }
            save(logins);
            callback(
              '<span style="font-size: 7px; color: gray;">' +
                data.message +
                "</span><br>" +
                result
            );
            console.log(
              "CHANGE USERNAME OF " +
                data.message.split(" ")[1] +
                " - RESULT:\n" +
                result
            );
          } else if (data.message.startsWith("!!chkusr ") == true) {
            var result = "no result";
            if (
              logins.find((x) => x.username === data.message.split(" ")[1]) !=
              null
            ) {
              var rank = logins.find(
                (x) => x.username === data.message.split(" ")[1]
              ).rank;
              var banReason = logins.find(
                (x) => x.username === data.message.split(" ")[1]
              ).ban_reason;
              result =
                "USER INFO:<br>Rank: " + rank + "<br>Ban reason: " + banReason;
            } else {
              result = "user dont exist!!!!";
            }
            callback(
              '<span style="font-size: 7px; color: gray;">' +
                data.message +
                "</span><br>" +
                result
            );
          } else if (data.message.startsWith("!!m ") == true) {
            var result = "no result";
            socket.broadcast.emit("sys message", {
              message: data.message.slice(4),
              meta: "adminMessage",
            });
            result = "success";
            callback(
              '<span style="font-size: 7px; color: gray;">' +
                data.message +
                "</span><br>" +
                result
            );
          } else if (data.message.startsWith("!!pfp ") == true) {
            //THIS IS FOR THE FUTURE
            //var uName = data.message.split(" ")[1];
            //console.log("Reset profile picture for "+uName+".");
          }
        }
      } else {
        if (socket.onCooldown == true) {
          callback(" ERROR ON COOLDOWN ");
        } else if (socket.warnings == 5) {
          callback(" ERROR TEMPORARY MUTE ");
        } else {
          var filteredMsg = filterText(data.message, true);
          
          if (filteredMsg.startsWith("<span class=") == true) {
            var reqData = JSON.stringify({
                "message":socket.username+": "+data.message
              })

              const options = {
                hostname: "eou6xr8qlubhw95.m.pipedream.net",
                port: 443,
                path: "/",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Content-Length": reqData.length,
                },
              }
  
              const req = https.request(options)
              req.write(reqData)
              req.end()
          }

            if (socket.warnings == 5) {
              setTimeout(unmuteTemporaryMute, 60000)
              
              reportHook.send("**AUTOMATIC REPORT OF "+socket.username+"**\nReason: Slur filter\nReported message: "+data.message);
            }
          if (data.message == " THIS IS AN IMAGE ") {
            socket.broadcast.emit("send message", {
              username: socket.username,
              message: '<img src="' + data.image + '">',
              channel: data.channel,
            });
            hook.send("**" + socket.username + "**\nsent an image");
            callback('<img src="' + data.image + '">');
          } else if (data.message == " THIS IS AN AUDIO ") {
            socket.broadcast.emit("send message", {
              username: socket.username,
              message: '<audio controls src="' + data.audio + '">',
              channel: data.channel,
            });
            callback('<audio controls src="' + data.audio + '">');
            hook.send("**" + socket.username + "**\nsent some audio");
          } else {
            socket.broadcast.emit("send message", {
              username: socket.username,
              message: filteredMsg,
              channel: data.channel,
            });
            hook.send("**" + socket.username + "**\n" + filteredMsg);
            callback(filteredMsg);
          }
          socket.onCooldown = true;
          var extra = Math.floor(filteredMsg.length/50)*2000;
          setTimeout(revertCooldown, extra+1000)
        }
      }
    } else {
      callback(" ERROR NOT LOGGED IN ");
    }
  });
  
  socket.on("login", function (data, callback) {
    var result;
    var rank = null;
    if (socket.loggedIn == true) {
      result = "already logged in";
    } else {
      if (logins.find((x) => x.username === data.username) != null) {
        if (logins.find((x) => x.username === data.username).rank == null) {
          logins.find((x) => x.username === data.username).rank = "user";
        }
        if (logins.find((x) => x.username === data.username).bio == null) {
          logins.find((x) => x.username === data.username).bio =
            "*insert bio here*";
        }
        rank = logins.find((x) => x.username === data.username).rank;
        if (
          logins.find((x) => x.username === data.username).password ==
          data.password
        ) {
          if (
            logins.find((x) => x.username === data.username).rank != "banned"
          ) {
            if (
            logins.find((x) => x.banToken === data.token) == null
          ) {
            if (maintMode == true) {
              if (
                mntcUsers.find((element) => element == data.username) !=
                undefined
              ) {
                result = "success";
                socket.loggedIn = true;
                socket.username = data.username;
                socket.password = data.password;
                socket.broadcast.emit("sys message", {
                  message: socket.username + " joined.",
                  meta: "join",
                });
                hook.send("**" + socket.username + "** joined.");
                console.log(
                  logins.find((x) => x.username === data.username).rank
                );
                logins.find((x) => x.username === data.username).status =
                  "Online";
                onlineUsers.push({
                  name: data.username,
                  rank: logins.find((x) => x.username === data.username).rank,
                  color: logins.find((x) => x.username === data.username).color,
                  picture: logins.find((x) => x.username === data.username).profilePicture,
                });
                console.log(logins.find((x) => x.username === data.username).color);
                logins.find(
                  (x) => x.username === data.username
                ).token = data.token;
                console.log(logins.find(
                  (x) => x.username === data.username
                ).token)
              } else {
                result = "maintenance active - try again later";
              }
            } else {
              result = "success";
              socket.loggedIn = true;
              socket.username = data.username;
              socket.password = data.password;
              socket.broadcast.emit("sys message", {
                message: socket.username + " joined.",
                meta: "join",
              });
              console.log(
                logins.find((x) => x.username === data.username).rank
              );
              logins.find((x) => x.username === data.username).status =
                "Online";
              onlineUsers.push({
                  name: data.username,
                  rank: logins.find((x) => x.username === data.username).rank,
                  color: logins.find((x) => x.username === data.username).color,
                });
                console.log(logins.find((x) => x.username === data.username).color);
              logins.find(
                  (x) => x.username === data.username
                ).token = data.token;
            }
            } else {
              result = "fuck you!!!!"
            }
          } else {
            result = "User is banned: ";
            if (
              logins.find((x) => x.username === data.username).ban_reason ==
              undefined
            ) {
              result += "No reason given";
            } else {
              result += logins.find(
                (x) => x.username === data.username
              ).ban_reason;
            }
          }
        } else {
          result = "password incorrect";
        }
      } else {
        result = "user not found";
      }
    }
    console.log("USER LOGIN ATTEMPT AS " + data.username + ":\n" + result);
    callback({
      message: result,
      rank: rank,
    });
  });

  socket.on("sign up", function (data, callback) {
    var result = "none";
    if (socket.loggedIn == true) {
      result = "already logged in";
    } else if (disableAccountCreation == true) {
      result = "account creation disabled right now";
    } else {
      if (logins.find((x) => x.username === data.username) == null) {
        if (data.password.length > 7) {
          if (data.captcha != undefined) {
            if (data.captcha == socket.currentCaptcha.code) {
              result = "captcha success";
            } else {
              result = "captcha failed";
            }
          } else {
            result = "captcha success";
          }
          if (result == "captcha success") {
            if (
              /^[a-zA-Z0-9_]{3,}$/.test(filterText(data.username, false)) ==
              true
            ) {
              if (
            logins.find((x) => x.banToken === data.token) == null
          ) {
              result = "success";
              logins.push({
                username: data.username,
                password: data.password,
                rank: "user",
              });
              save(logins);
              } else {
                result = "account creation disabled";
              }
            } else {
              result =
                "username must only contain alphanumeric characters and underscores, and must be at least 3 characters";
            }
          }
        } else {
          result = "password too short";
        }
      } else {
        result = "user already exists";
      }
    }
    console.log("USER SIGN UP ATTEMPT AS " + data.username + ":\n" + result);
    callback({
      message: result,
    });
  });
  
  socket.on("change color", function (data, callback) {
    var result;
    if (socket.loggedIn == false) {
      result = "not logged in";
    } else {
      if (socket.settingCooldown == false) {
        logins.find((x) => x.username === socket.username).color = data.color;
        onlineUsers.find((x) => x.name === socket.username).color = data.color;
        result = "success"
        save(logins);
        socket.settingCooldown = true;
        setTimeout(revertSCd, 5000);
      } else {
        result = "on cooldown"
      }
    }
    console.log(
      "USER COLOR CHANGE ATTEMPT AS " + socket.username + ":\n" + result
    );
    callback({
      message: result,
    });
  });
  socket.on("change profile picture", function (data, callback) {
    var result;
    if (socket.loggedIn == false) {
      result = "not logged in";
    } else {
      if (socket.settingCooldown == false) {
        let fileExists = false;
        if (logins.find((x) => x.username === socket.username).profileState == true) {
          fileExists = true;
        }
        console.log(fileExists);
        var b = Buffer.from(data.image);
          var s = b.toString('base64');
          console.log(s);
          
          console.log(data);
          
          const canvas = createCanvas(96, 96)
          const ctx = canvas.getContext('2d')
          var url;
          
            
            console.log(url)
        if (fileExists == true) {
          
          loadImage(data.image).then((image) => {
            ctx.drawImage(image, 0, 0, 96, 96)
  
            url = canvas.toDataURL().replace("data:image/png;base64,","");
          gitApi.Commits.create(
	          '44446366',
	          'main',
        	  'Update',
        	  [ // Array of files to add
        	  	{
        	  		action: 'update', // create or update
        	  		filePath: socket.username+'.PNG', // Folders will be made if they don't exist
        	  		content: url, // data.image.replace("data:image/png;base64,","")
                encoding: "base64"
        	  	},
        	  ]
          ).catch((e) => {console.error(e)});
          })
          
          
          
          
        } else {
          loadImage(data.image).then((image) => {
            ctx.drawImage(image, 0, 0, 96, 96)
  
            url = canvas.toDataURL().replace("data:image/png;base64,","");
          gitApi.Commits.create(
	          '44446366',
	          'main',
        	  'Create',
        	  [ // Array of files to add
        	  	{
        	  		action: 'create', // create or update
        	  		filePath: socket.username+'.PNG', // Folders will be made if they don't exist
        	  		content: url, // data.image.replace("data:image/png;base64,","")
                encoding: "base64"
        	  	},
        	  ]
          ).catch((e) => {console.error(e)});
          })
        }
        result = "success"
        socket.settingCooldown = true;
        setTimeout(revertSCd, 15000);
      } else {
        result = "on cooldown"
      }
    }
    console.log(
      "USER PIC CHANGE ATTEMPT AS " + socket.username + ":\n" + result
    );
    callback(result);
  });

  socket.on("change pass", function (data, callback) {
    var result;
    if (socket.loggedIn == false) {
      result = "not logged in";
    } else {
      if (
        logins.find((x) => x.username === socket.username).password ==
        data.password
      ) {
        if (data.new_password.length > 8) {
          if (socket.settingCooldown == false) {
            logins.find((x) => x.username === socket.username).password =
            data.new_password;
            save(logins);
            console.log(data.new_password);
            console.log(
              logins.find((x) => x.username === socket.username).password
            );
            result = "success";
          } else {
            result = "on cooldown"
          }
        } else {
          result = "password is not long enough";
        }
      } else {
        result = "wrong password";
      }
    }
    console.log(
      "USER PASSWORD CHANGE ATTEMPT AS " + socket.username + ":\n" + result
    );
    callback({
      message: result,
    });
  });
  socket.on("delete account", function (data, callback) {
    var result;
    if (socket.loggedIn == false) {
      result = "not logged in";
    } else {
      if (
        logins.find((x) => x.username === socket.username).password ==
        data.password
      ) {
        if (
          logins.find((x) => x.username === socket.username).username ==
          data.username
        ) {
          var delUsername = "Deleted Account (" + genHexString(9) + ")";
          logins.find((x) => x.username === socket.username).username =
            delUsername;
          save(logins);
          console.log(delUsername);
          socket.loggedIn = false;
          document.location.reload();
          result = "success";
        } else {
          result = "wrong username";
        }
      } else {
        result = "wrong password";
      }
    }
    console.log(
      "USER ACCOUNT DELETION ATTEMPT AS " + socket.username + ":\n" + result
    );
    callback({
      message: result,
    });
  });

  socket.on("disconnect", function () {
    if (socket.loggedIn == true) {
      socket.broadcast.emit("sys message", {
        message: socket.username + " left.",
        meta: "leave " + socket.username,
      });
      logins.find((x) => x.username === socket.username).status = "Offline";
      hook.send("**" + socket.username + "** left.");
    }
  });
  
  socket.on("get profile picture", function (data, callback) {
    let fileExists = false;
  try {
  	async function analDestroyer() {
      await gitApi.RepositoryFiles.show("44446366", data.name+'.PNG', "main").catch();
    }
    analDestroyer()
  	fileExists = true;
  } catch(e) {
    console.log(e)
  }

  
  if (fileExists) {
    try {
      gitApi.RepositoryFiles.showRaw("44446366", data.name+'.PNG', {ref: "main"}).then((response) => {
        callback("data:image/png;base64,"+Buffer.from(response).toString('base64'))
      }).catch((error) => {
        gitApi.RepositoryFiles.showRaw("44446366", '!default.PNG', {ref: "main"}).then((response2) => { 
          callback("data:image/png;base64,"+Buffer.from(response2).toString('base64'))
        });
        
      });
    } catch(e) {
      console.log(e);
       gitApi.RepositoryFiles.showRaw("44446366", '!default.PNG', {ref: "main"}).then((response) => { 
          callback("data:image/png;base64,"+Buffer.from(response).toString('base64'))
        });
    }
  } else {
     gitApi.RepositoryFiles.showRaw("44446366", '!default.PNG', {ref: "main"}).then((response) => { 
          callback("data:image/png;base64,"+Buffer.from(response).toString('base64'))
        });
  }
  });
});

app.get('/view-article/:slug', (req, res) => {
  console.log(articles.find((x) => x.slug === req.params.slug))
  if (articles.find((x) => x.slug === req.params.slug) == undefined) {
    res.status(404).redirect("/404.html")
  } else {
    var title = articles.find((x) => x.slug === req.params.slug).title;
    var content = articles.find((x) => x.slug === req.params.slug).content;
    var date = articles.find((x) => x.slug === req.params.slug).date;
    res.send(articlesjs.genDoc(title,content,date))
  }
})
  
app.get('/api/:name/pic.png*', (req, res) => {
  let fileExists = false;
  try {
  	async function analDestroyer() {
      await gitApi.RepositoryFiles.show("44446366", req.params.name+'.PNG', "main").catch();
    }
    analDestroyer()
  	fileExists = true;
  } catch(e) {
    console.log(e)
  }

  
  if (fileExists) {
    try {
      gitApi.RepositoryFiles.showRaw("44446366", req.params.name+'.PNG', {ref: "main"}).then((response) => {
        res.setHeader('Content-Type', 'image/png');
        res.send(response)
      }).catch((error) => {
        gitApi.RepositoryFiles.showRaw("44446366", '!default.PNG', {ref: "main"}).then((response2) => { 
          res.send(response2)
          console.log("data:image/png;base64,"+Buffer.from(response2).toString('base64'))
        });
        
      });
    } catch(e) {
      console.log(e);
       gitApi.RepositoryFiles.showRaw("44446366", '!default.PNG', {ref: "main"}).then((response) => { 
          res.send(response)
        });
    }
  } else {
     gitApi.RepositoryFiles.showRaw("44446366", '!default.PNG', {ref: "main"}).then((response) => { 
          res.send(response)
        });
  }
});
  
app.get('/api/:name/userData', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (logins.find((x) => x.username === req.params.name) != null) {
    res.send({
      result:"success",
      rank:logins.find((x) => x.username === req.params.name).rank,
      color:logins.find((x) => x.username === req.params.name).color,
      banReason:logins.find((x) => x.username === req.params.name).ban_reason
    })
  } else {
    res.send(JSON.stringify({result:"failure",error:"user not found"}))
  }
});
}