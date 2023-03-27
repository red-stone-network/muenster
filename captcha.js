const { createCanvas, loadImage } = require("canvas");
const randClrs = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f", "#fff"];
const captchaTxt = "MmUuEeNnSsTtRr123456789";
const captchaFakeTxt = "~`';<>,./\|=+-_"

exports.captcha = function() {
  var canvas = createCanvas(200, 200);
  var ctx = canvas.getContext("2d");
  var rand1 = randClrs[Math.floor(Math.random() * randClrs.length)];
  var rand2 = randClrs[Math.floor(Math.random() * randClrs.length)];
  var rand3 = randClrs[Math.floor(Math.random() * randClrs.length)].replace(
    /f/g,
    "8"
  );
  var rand4 = randClrs[Math.floor(Math.random() * randClrs.length)].replace(
    /f/g,
    "8"
  );
  var rand5 = randClrs[Math.floor(Math.random() * randClrs.length)].replace(
    /f/g,
    "2"
  );
  var rand6 = randClrs[Math.floor(Math.random() * randClrs.length)].replace(
    /f/g,
    "2"
  );

  var code = "";
  code += captchaTxt[Math.floor(Math.random() * captchaTxt.length)];
  code += captchaTxt[Math.floor(Math.random() * captchaTxt.length)];
  code += captchaTxt[Math.floor(Math.random() * captchaTxt.length)];
  code += captchaTxt[Math.floor(Math.random() * captchaTxt.length)];
  code += captchaTxt[Math.floor(Math.random() * captchaTxt.length)];

  var grad = ctx.createLinearGradient(0, 0, 200, 200);
  grad.addColorStop(0, rand3);
  grad.addColorStop(1, rand4);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 200, 200);
  
  for (let step = 0; step < 16; step++) {
    var grad = ctx.createLinearGradient(0, 0, 200, 200);
    grad.addColorStop(0, rand5);
    grad.addColorStop(1, rand6);
    ctx.fillStyle = grad;
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    var rotate = (Math.random() - 0.5) * 0.25;
    ctx.rotate(rotate);
    ctx.shadowColor = randClrs[Math.floor(Math.random() * randClrs.length)];
    ctx.shadowBlur = 5;
    ctx.setTransform(1, (Math.random() - 0.5) * 0.55, (Math.random() - 0.5) * 0.35, 1, 0, 0);
    ctx.fillText(captchaFakeTxt[Math.floor(Math.random() * captchaFakeTxt.length)], 100 + ((Math.random() - 0.5) * 80), 100 + ((Math.random() - 0.5) * 80), 125);
  }

  var grad = ctx.createLinearGradient(0, 0, 200, 200);
  ctx.shadowColor = "white";
  ctx.shadowBlur = 5;
  grad.addColorStop(0, rand1);
  grad.addColorStop(1, rand2);
  ctx.fillStyle = grad;
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  var rotate = (Math.random() - 0.5) * 0.25;
  ctx.rotate(rotate);
  ctx.setTransform(1, (Math.random() - 0.5) * 0.55, (Math.random() - 0.5) * 0.35, 1, 0, 0);
  ctx.fillText(code, 100, 100, 125);

  return {
    image: canvas.toDataURL(),
    code: code,
  };
  
  ctx.resetTransform();
}