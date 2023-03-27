const socket = io();

const version = "2.8.1";

var colorPicker = new iro.ColorPicker("#picker", {
  // Set the size of the color picker
  width: 125,
  // Set the initial color to pure red
  color: "#f00",
});

var username = null;

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

var lastMsg = {
  _main: "no one",
};

var onCooldown = false;

var lastMessageUser = null;

var currentChannel = "_main";

console.log(
  "%cSTOP!",
  "color:red;font-size:48px;font-family:Rubik, Roboto, Arial, sans-serif;"
);
console.log(
  "%cDo NOT paste ANY CODE given to you into this console, even if you believe it's from an admin, developer, or other important person! You could get your account hacked!",
  "font-size: 24px;font-family:Rubik, Roboto, Arial, sans-serif;"
);
console.log(
  "We do not need you to run code in your browser to verify you or do anything else."
);

function genHexString(len) {
  const hex =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
  let output = "";
  for (let i = 0; i < len; ++i) {
    output += hex.charAt(Math.floor(Math.random() * hex.length));
  }
  return output;
}

function getUsernameColor(username) {
  var type = 0;
  if (onlineUsers.find((x) => x.name === username)) {
    if (onlineUsers.find((x) => x.name === username).color != undefined) {
      type = 1;
      return onlineUsers.find((x) => x.name === username).color;
    }
  }
  console.log(type);
  if (type == 0) {
    if (username) {
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
}

var loggedIn = false;
var notifId = 0;
const nw = document.getElementById("notifWindow");

function finishNotifHide(id) {
  if (id == notifId) {
    nw.style = "display: none; opacity: 0;";
  }
}

function notifHide(id) {
  if (id == notifId) {
    nw.style = "-moz-animation: fadeout 0.3s ease-out; opacity: 0;";
    setTimeout(finishNotifHide, 300, id);
  }
}

function notifDisplay(text, timeMs) {
  ++notifId;
  nw.innerHTML = text;
  nw.style = "";
  var notifIdCur = notifId;
  setTimeout(notifHide, timeMs, notifIdCur);
}

/* tags */
if (localStorage.getItem("token") == null) {
  localStorage.setItem("token", genHexString(32));
}

function aClick(t) {
  event.preventDefault();
  window.open("https://mnstr.glitch.me/?url=" + t.href, "_blank");
}
// https://gitlab.com/muenster-backup-automated/muenster-logins-backups/-/raw/main/profile/!defaultprofile.PNG
function setChannel(name) {
  var children = document.getElementById("dms").children;
  for (var i = 0; i < children.length; i++) {
    var tableChild = children[i];
    tableChild.style = "display: none;";
  }
  document.getElementById("chat__main").style = "display: none;";
  if (name.startsWith("_") == true) {
    document.getElementById("chat_" + name).style = "";
  } else {
    document.getElementById("dms_" + name).style = "";
  }
  currentChannel = name;
}

function createDMs(user, origin) {
  if (origin == "you") {
    origin = user.split("|")[1];
    lastMsg[user.split("|")[1]] = "no user";
  } else {
    origin = user.split("|")[0];
    lastMsg[user.split("|")[0]] = "no user";
  }
  var div =
    '<div id="dms_' +
    user +
    '"><div class="message sysmsg">This is the start of your conversation with ' +
    user.split("|")[1] +
    ".</div></div>";
  document.getElementById("dms").innerHTML += div;
  var btn =
    '<input type="button" class="button2" value="' +
    origin +
    '" onclick="setChannel(`' +
    user +
    '`);" style="width: 170px; color: ' +
    getUsernameColor(origin) +
    ';"><br>';
  document.getElementById("dm-list").innerHTML += btn;
  createSysMessageElement(
    'A new conversation with <span style="color: ' +
    getUsernameColor(origin) +
    ';">' +
    origin +
    '</span> just started. <a href="javascript:setChannel(`' +
    user +
    '`);">Check it out.</a>'
  );
  setChannel(user);
}

function settingsMenu(set, tab) {
  console.log(tab);
  if (set == true) {
    document.getElementById("settingsmenu").style = "";
    var children = document.getElementById("settingsmenu").children;
    for (var i = 0; i < children.length; i++) {
      var tableChild = children[i];
      tableChild.style = "display: none;";
    }
    document.getElementById(tab).style = "";
  } else {
    document.getElementById("settingsmenu").style = "display: none;";
    setChannel(currentChannel);
  }
}

function shitSignup(data) {
  if (data.message == "success") {
    alert("ACCOUNT CREATED:\nYou may now log in.");
    document.location.reload();
  } else {
    notifDisplay("ERROR! " + data.message, 1700);
  }
}

function shitLogin(data, uname) {
  if (data.message == "success") {
    loggedIn = true;
    document.getElementById("start").className = "page";
    document.getElementById("login").className = "page";
    document.getElementById("signup").className = "page";
    document.getElementById("app").className =
      "page apppage page-open page-fade";
    username = uname;
    document.getElementById("luser").value = "";
    document.getElementById("lpass").value = "";
    reloadDProfilePic();
  } else {
    if (/User is banned: ([\s\S]+)/.test(data.message) == true) {
      document.getElementById("app").className = "page";
      document.getElementById("banpage").className =
        "page apppage page-open page-fade";
      document.getElementById("bannote").innerHTML = data.message.replace(
        /User is banned: ([\s\S]+)/,
        "$1"
      );
    } else {
      notifDisplay("ERROR! " + data.message, 1700);
    }
  }
}

function signup(uname, password) {
  var returnal = null;
  socket.emit(
    "sign up", {
      username: uname,
      password: password,
      captcha: document.getElementById("captext1").value,
      token: localStorage.getItem("token"),
    },
    (status) => {
      shitSignup(status);
    }
  );
}

function resetPassword() {
  if (
    document.getElementById("cpnew").value ==
    document.getElementById("cpnew2").value
  ) {
    socket.emit(
      "change pass", {
        password: document.getElementById("cpcur").value,
        new_password: document.getElementById("cpnew").value,
      },
      (status) => {
        if (status.message == "success") {
          notifDisplay("Password changed successfully!", 1700);
        } else {
          notifDisplay("ERROR! " + status.message, 1700);
        }
      }
    );
  } else {
    notifDisplay("ERROR! Passwords do not match!", 1700);
  }
}

function deleteAccount() {
  if (document.getElementById("dacfm").value == "Delete my account") {
    socket.emit(
      "delete account", {
        username: document.getElementById("dausr").value,
        password: document.getElementById("dapwd").value,
      },
      (status) => {
        if (status.message == "success") {
          alert(
            "Account deleted. Thank you for using Muenster and we hope to see you again soon."
          );
        } else {
          notifDisplay("ERROR! " + status.message, 1700);
        }
      }
    );
  } else {
    notifDisplay("ERROR! Confirmation text incorrect!", 1700);
  }
}

function login(username, password) {
  socket.emit(
    "login", {
      username: username,
      password: password,
      token: localStorage.getItem("token"),
    },
    (status) => {
      shitLogin(status, username);
    }
  );
}

function signupFromNorm() {
  signup(
    document.getElementById("suser").value,
    document.getElementById("spass").value
  );
}

function loginFromNorm() {
  login(
    document.getElementById("luser").value,
    document.getElementById("lpass").value
  );
}

function loginScreen() {
  document.getElementById("start").className = "page";
  document.getElementById("login").className = "page page-open";
  document.getElementById("signup").className = "page";
}

function signupScreen() {
  document.getElementById("start").className = "page";
  document.getElementById("login").className = "page";
  document.getElementById("signup").className = "page page-open";
}

function errorOut(errorCode) {
  document.getElementById("start").className = "page";
  document.getElementById("login").className = "page";
  document.getElementById("app").className = "page";
  document.getElementById("errorpage").className = "page page-open";
  if (errorCode == "notLoggedIn") {
    document.getElementById("errortext").innerHTML =
      "You aren't logged in, and you attempted to perform an action that requires you log in. This can sometimes be caused by Muenster updating.";
  } else if (errorCode == "banned") {
    document.getElementById("errortext").innerHTML =
      "You've either been banned, or your username was changed.";
  } else {
    document.getElementById("errortext").innerHTML =
      `Even we don't know what happened here. Here's the error that was returned: "` +
      errorCode +
      '"';
  }
}

function existsFile(url) {
  try {
    var http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send();
    return http.status != 404;
  } catch {
    return false;
  }
}

function createMessageElement(user, mess, channel) {
  if (mess == " ERROR NOT LOGGED IN ") {
    errorOut("notLoggedIn");
  } else if (mess == " ERROR ON COOLDOWN ") {
    notifDisplay("Slow down, you're sending messages too fast!", 2000);
  } else if (mess == " ERROR TEMPORARY MUTE ") {
    notifDisplay(
      "You've been temporarialy muted for repeated message redactions.",
      5000
    );
  } else {
    socket.emit(
      "get profile picture", {
        name: user
      },
      (status) => {
        var newPic = status
        if (lastMsg[channel] == user) {
          var html =
            '<div class="message"><div class="profilePicBox"></div><div class="messageBox">' +
            mess +
            "</div></div>";
        } else {
          var html =
            '<div class="message firstmessage"><div class="profilePicBox"><img src="' +
            newPic +
            '"></div><div class="messageBox"><b style="color: ' +
            getUsernameColor(user) +
            '">' +
            user +
            "</b><br>" +
            mess +
            "</div></div>";
        }
        if (channel.startsWith("_") == false) {
          console.log(channel);
          if (
            channel.split("|")[0] == username ||
            channel.split("|")[1] == username
          ) {
            var oldChannel = currentChannel;
            if (document.getElementById("dms_" + channel) == null) {
              createDMs(channel, "other");
            }
            setChannel(oldChannel);
            document.getElementById("dms_" + channel).innerHTML += html;
            setTimeout(() => {
              document
                .getElementById("dms_" + channel)
                .scrollTo(
                  0,
                  document.getElementById("dms_" + channel).scrollHeight
                );
            }, 50);
            var audio = new Audio(
              "https://cdn.glitch.global/3758b37a-5fff-4595-b604-762ee951816d/big-notify.wav?v=1678925453229"
            );
            audio.play();
          }
        } else {
          document.getElementById("chat_" + channel).innerHTML += html;
          setTimeout(() => {
            document
              .getElementById("chat_" + channel)
              .scrollTo(0, document.getElementById("chat_" + channel).scrollHeight);
          }, 50);
          var audio = new Audio(
            "https://cdn.glitch.global/3758b37a-5fff-4595-b604-762ee951816d/notify.wav?v=1678925450132"
          );
          audio.play();
        }
        lastMsg[channel] = user;
        var channel2 = channel;
        if (/|/g.test(channel2) == true) {
          channel2 = "DMs";
        }
        var mess2 = mess;
        if (/data:/g.test(mess2) == true) {
          mess2 = "Image";
        }
        if (channel != currentChannel) {
          if (
            document.getElementById("settingsmenu").className !=
            "page apppage page-open page-fade"
          ) {
            if (loggedIn == true) {
              if (channel2 == "DMs" && typeof channel == "string") {
                if (
                  channel.split("|")[0] == username ||
                  channel.split("|")[1] == username
                ) {
                  notifDisplay(
                    "<b>Message from " +
                    user +
                    " in " +
                    channel2 +
                    "</b><br>" +
                    mess,
                    1700
                  );
                }
              } else {
                notifDisplay(
                  "<b>Message from " + user + " in " + channel2 + "</b><br>" + mess,
                  1700
                );
              }
            }
          }
        }
      }
    );
  }
}

function createSysMessageElement(mess) {
  var html = '<div class="message sysmsg">' + mess + "</div>";
  document.getElementById("chat__main").innerHTML += html;
  document
    .getElementById("chat__main")
    .scrollTo(0, document.getElementById("chat__main").scrollHeight);
  lastMsg["_main"] = "SYSTEM MESSAGES";
}

function sendMessage() {
  if (document.getElementById("messagetext").value != "") {
    var message = document.getElementById("messagetext").value;
    socket.emit(
      "new message", {
        message: message,
        channel: currentChannel,
      },
      (filtered) => {
        createMessageElement(username, filtered, currentChannel);
      }
    );
    document.getElementById("messagetext").value = "";
  }
}

function openSBarTab(tab) {
  document.getElementById("settingsmenu").style = "display: none;";
  document.getElementById("online").style = "display: none;";
  document.getElementById("directmsgs").style = "display: none;";
  document.getElementById("discover").style = "display: none;";
  document.getElementById("settingsside").style = "display: none;";
  document.getElementById(tab).style = "display: block;";
  if (tab == "online") {
    setChannel("_main");
  } else if (tab == "settingsside") {
    var children = document.getElementById("dms").children;
    for (var i = 0; i < children.length; i++) {
      var tableChild = children[i];
      tableChild.style = "display: none;";
    }
    document.getElementById("chat__main").style = "display: none;";
    settingsMenu(true, "settings_account");
  }
}

$(window).keydown(function(event) {
  if (event.which === 13 && event.shiftKey == false) {
    if (document.activeElement.id == "messagetext") {
      event.preventDefault();
      sendMessage();
    }
    if (document.activeElement.id == "dms-textbox") {
      event.preventDefault();
      if (
        document.getElementById("dms_" + document.activeElement.value) == null
      ) {
        createDMs(username + "|" + document.activeElement.value, "you");
      }
      setChannel(username + "|" + document.activeElement.value);
    }
  }
});

$("#imgupload").change(function() {
  const file = document.getElementById("imgupload").files[0];
  if (file.size < 20000000) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (
        document
        .getElementById("imgupload")
        .value.split(".")[1]
        .toLowerCase() == "mp3"
      ) {
        socket.emit(
          "new message", {
            message: " THIS IS AN AUDIO ",
            audio: reader.result,
            channel: currentChannel,
          },
          (filtered) => {
            createMessageElement(username, filtered, currentChannel);
          }
        );
      } else {
        socket.emit(
          "new message", {
            message: " THIS IS AN IMAGE ",
            image: reader.result,
            channel: currentChannel,
          },
          (filtered) => {
            createMessageElement(username, filtered, currentChannel);
          }
        );
      }
    });

    reader.readAsDataURL(file);
  } else {
    notifDisplay("File size too large! Must be under 20MB", 1700);
  }
});

function reloadDProfilePic() {
  $("#displaypic")[0].src =
    "/api/" + username + "/pic.png?" + new Date().getTime();
}
var thingTick = 0;
$("#profileupload").change(function() {
  const file = document.getElementById("profileupload").files[0];
  if (file.size < 500000) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (
        document
        .getElementById("profileupload")
        .value.split(".")[1]
        .toLowerCase() == "png"
      ) {
        socket.emit(
          "change profile picture", {
            image: reader.result,
          },
          (response) => {
            if (response == "success") {
              notifDisplay("Success!", 1000);
            } else {
              notifDisplay(response, 1000);
            }
          }
        );

        setTimeout(reloadDProfilePic, 1500);
      } else {
        alert("failed - wrong image format");
      }
    });

    reader.readAsDataURL(file);
  } else {
    notifDisplay("File size too large! Must be under 500KB", 1700);
  }
});

socket.on("send message", function(data) {
  createMessageElement(data.username, data.message, data.channel);
});

var onlineUsers;
socket.on("meta", function(data) {
  if (data.meta_name == "onlineUsers") {
    document.getElementById("online").innerHTML = "";

    onlineUsers = data.meta_content;

    let i = 0;

    let result = "";

    while (i < data.meta_content.length) {
      var badge = "";
      if (data.meta_content[i].rank == "admin") {
        badge =
          '<img src="https://cdn.glitch.global/3758b37a-5fff-4595-b604-762ee951816d/admin-icon.png?v=1678744460493" class="nameicon">';
      }
      if (data.meta_content[i].rank == "helper") {
        badge =
          '<img src="https://cdn.glitch.global/3758b37a-5fff-4595-b604-762ee951816d/helper.png?v=1678829820989" class="nameicon">';
      }
      result += `
        <b style="color: ${getUsernameColor(data.meta_content[i].name)}">
  <img src="https://muenster.glitch.me/api/${data.meta_content[i].name}/pic.png?${thingTick}" style="width: 48px;height: 48px;border-radius: 10px;display: inline-block;">
  <span style="display: inline-block;position: relative;top: -32px;">
    ${data.meta_content[i].name}${badge}
  </span>
  <br>
</b>`
      '<b style="color: ' +
      getUsernameColor(data.meta_content[i].name) +
        '">' +
        data.meta_content[i].name;

      result += "\n";
      i++;
    }
    document.getElementById("online").innerHTML = result;
    document.getElementById("aboutmuenster").innerHTML =
      "Muenster v" +
      version +
      " - " +
      data.meta_content.length +
      " users online.";
  }
  if (data.meta_name == "userBanned") {
    if (data.meta_content == username) {
      errorOut("banned");
    }
  }
});

socket.on("sys message", function(data) {
  createSysMessageElement(data.message);
  if (data.meta.startsWith("leave") == true) {
    var userMeta = data.meta.split()[1];
    var audio = new Audio(
      "https://cdn.glitch.global/3758b37a-5fff-4595-b604-762ee951816d/leave.wav?v=1678925447479"
    );
    audio.play();
    if (userMeta == username) {
      errorOut("You've lost connection with the server.");
    }
  } else if (data.meta == "join") {
    var audio = new Audio(
      "https://cdn.glitch.global/3758b37a-5fff-4595-b604-762ee951816d/join.wav?v=1678925443251"
    );
    audio.play();
  } else {
    var audio = new Audio(
      "https://cdn.glitch.global/3758b37a-5fff-4595-b604-762ee951816d/big-notify.wav?v=1678925453229"
    );
    audio.play();
  }
});

function loadCap() {
  socket.emit("get captcha", {}, (cap) => {
    document.getElementById("cap1").src = cap;
  });
}

function changeColor() {
  socket.emit(
    "change color", {
      color: colorPicker.color.hexString,
    },
    (status) => {
      if (status.message == "success") {
        notifDisplay("Color changed successfully!", 1700);
      } else {
        notifDisplay("ERROR! " + status.message, 1700);
      }
    }
  );
}

function compressSide() {
  const elemt = document.getElementById("cArrow");
  const sideBar = document.getElementById("sidebar");
  let channel = "_main";
  if (
    document.getElementById("cArrow").innerHTML !=
    '<img src="https://cdn.glitch.global/3758b37a-5fff-4595-b604-762ee951816d/icons8-right-50.png?v=1679615427261">'
  ) {
    elemt.style.height = "12px";
    elemt.style.left = "240px";
    elemt.style.bottom = "3px";
    elemt.style.borderTopRightRadius = "10px";
    elemt.style.borderBottomRightRadius = "10px";
    elemt.style.borderTopLeftRadius = "0";
    elemt.style.borderBottomLeftRadius = "0";
    elemt.innerHTML =
      '<img src="https://cdn.glitch.global/3758b37a-5fff-4595-b604-762ee951816d/icons8-right-50.png?v=1679615427261">';
    sideBar.style.left = "-240px";
    document.getElementById("chat__main").style.width = "100%";
    document.getElementById("msgbar").style.width = "100%";
    document.getElementById("messagetext").style.width = "calc(100% - 112px)";
    elemt.title = "Expand Sidebar";
  } else {
    elemt.style.height = "30px";
    elemt.style.left = "210px";
    elemt.style.bottom = "15px";
    elemt.style.borderTopRightRadius = "0";
    elemt.style.borderBottomRightRadius = "0";
    elemt.style.borderTopLeftRadius = "10px";
    elemt.style.borderBottomLeftRadius = "10px";
    elemt.innerHTML =
      '<img src="https://cdn.glitch.global/3758b37a-5fff-4595-b604-762ee951816d/menu.png?v=1679611817257">';
    sideBar.style.left = "0";
    document.getElementById("chat__main").style.width = "calc(100% - 240px)";
    document.getElementById("msgbar").style.width = "calc(100% - 240px)";
    document.getElementById("messagetext").style.width =
      "calc(100% - 176px - 176px)";
    elemt.title = "Compress Sidebar";
    document
      .getElementById("chat_" + channel)
      .scrollTo(0, document.getElementById("chat_" + channel).scrollHeight);
  }
}

if (
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i) ||
  navigator.userAgent.match(/Windows Phone/i)
) {
  compressSide();
}

loadCap();