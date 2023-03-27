exports.articles = [
  {
    title:"Getting started on Muenster",
    slug:"getting-started",
    date:"March 19, 2023",
    content:
`We would like to welcome you to Muenster! We're very glad
to have you here. However, there are some things you should
know when you use us to chat with others.<br><br>

<h3>Direct Messaging</h3>
Muenster is one of the only chat apps on Glitch to have
Direct Messages, private messages between you and another
person. <br><br>
To create a Direct Message conversation, click the
<img 
src="https://cdn.glitch.global/3758b37a-5fff-4595-b604-762ee951816d/chat.png?v=1678746184189"
style="width: 21px;height: 21px;vertical-align: top;">
Direct Messages button in the sidebar. Then, in the textbox at the top of
the sidebar, type the name of the user you would like to send a Direct
Message to. Finally, press Enter to start a Direct Message conversation.<br><br>
To open an already-existing Direct Message conversation, click the
<img 
src="https://cdn.glitch.global/3758b37a-5fff-4595-b604-762ee951816d/chat.png?v=1678746184189"
style="width: 21px;height: 21px;vertical-align: top;">
Direct Messages button in the sidebar. Then, click on the name of the other
user in the Direct Message conversation that you want to see.<br><br>

<h3>Image & Audio Uploading</h3>
Muenster is also one of the few chat apps on Glitch to allow you to
upload images and audio!<br><br>
To upload images or audio, click the
<img 
src="https://cdn.glitch.global/3758b37a-5fff-4595-b604-762ee951816d/upload.png?v=1676909352639"
style="width: 21px;height: 21px;vertical-align: top;">
Upload button, next to the message box, then select a file.<br><br>

<h3>Please read the rules!!!</h3>
We have a list of guidelines that you must follow to be allowed to use Muenster. Please
read them <a href="/rules/index.html">here</a>.<br><br>
With all that being said, we hope you have a good time on Muenster!`,
  },
  {
    title:"#1 - We now have an articles page!",
    slug:"1-welcome-to-muenster-articles",
    date:"March 20, 2023",
    content:
`Hello there! We've created a new articles page, where we'll post 
news about new features. You'll also be able to find support pages 
of all kinds (once we finish them!) and other small useful things.<br><br>

Now to the actual news - if you haven't noticed yet, there is now a 
new setting in the Profile Settings section of the Settings tab, which 
allows you to set your username color! We plan to add other customization 
features soon, like profile pictures and user bios!<br><br>

We've also added a feature that will redirect you through our website 
first when you visit a website through a link. This will allow us to filter
out bad websites and keep our community safe.<br><br>

<span class="footnote">Written by LukasExists</span>`,
  },
  {
    title:"#2 - Filter upgrades (and a bit about Terminal)",
    slug:"2-filter-upgrades",
    date:"March 23, 2023",
    content:
`Hello there! Some of you may have been around when the whole incident
with Terminal happened. If you weren't, here's a rundown of what happened:<br><br>

- Terminal joined<br>
- Started bypassing the filters, saying racist and homophobic slurs<br>
- Terminal got banned<br><br>

We'd like to say that we have upgraded our filters, have plans to upgrade 
them further, and are planning to add more moderators to help keep things 
nice and clean.<br><br>

Our new filtering system will now temporarily mute you (and alert admins) 
if you keep saying things that get censored. It'll also redact the whole 
message if a part of it gets censored. We plan to add an NSFW image detection 
system using NSFW.js, as well as more slur filters.<br><br>

We also plan to add token bans - bans that use things like your cookies, 
browser, and IP to identify a single user. This will allow us to ban people 
who have created accounts just to break the rules.<br><br>

Thank you!<br><br>

<span class="footnote">Written by LukasExists</span>`,
  },
  {
    title:"#3 - Profile Pictures!",
    slug:"3-profile-pics",
    date:"March 24, 2023",
    content:
`Hello there! This article will mostly be documenting updates.<br><br>

If you haven't noticed yet, we now have profile pictures! You can
upload a profile picture in Settings > Profile Settings, and it'll
update for everyone in a few seconds. (I totally didn't stay up until
12AM working on this when we had a big school-wide test the next
day what are you talking about?)<br><br>

We're also working on mobile support! We've started with a
Collapse button on the sidebar that will hide the sidebar when
pressed.<br><br>

We also have increased the image size limit to 20MB - if you need
more space (which you won't,) you can upload to Google Drive / another file storage service
and send the link to it in chat.<br><br>

Thank you!<br><br>

<span class="footnote">Written by LukasExists</span>`,
    // ADD ME BACK TO THE PROJECT
  },
]

exports.genDoc = function(title,content,date) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="https://cdn.glitch.global/3758b37a-5fff-4595-b604-762ee951816d/muenster.png?v=1676838646502" />

    <title>Muenster - $title$</title>

    <!-- import the webpage's stylesheet -->
    <link rel="stylesheet" href="/assets/display-style.css" />
    <script src="/assets/tohttps.js"></script>
  </head>
  <body>
    <h1>
      Muenster Articles 
      <a style="font-size: 12px;" href="/articles/index.html">All Articles</a> 
      <a style="font-size: 12px;" href="/index.html">Back to Home</a>
    </h1>
    <h2>
      $title$
      <span style="font-size: 9px;">$date$</span>
    </h2>
    <content>
    $content$
    </content>
  </body>
</html>`.replace("$content$",content).replace(/\$title\$/g,title)
  .replace("$date$",date)
} 
