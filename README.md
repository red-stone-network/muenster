# Welcome to the Muenster source code!

PLEASE MAKE SURE YOU DON'T MAKE CHANGES IF THE DATABASE IS BEING WRITTEN TO - 
IF YOU DO YOU WILL CORRUPT THE ENTIRE DATABASE BEYOND REPAIR!

### To-do for when hosting Muenster:
- In a .env file, set the ReportWebhook, LogWebhook, and 
gittag (github access code). These are REQUIRED for Muenster to work.

### less important stuff you should do:
- Change the blocklist URL to your own blocklist. 
Our blocklists use Regex in text files, and will ignore new lines,
which allows you to format your regex.
- Replace the articles with your own (if desired). Specifically the news
ones will most likely apply way less on your own version of Muenster.

### NOTES
- Due to the nature of Muenster's login storage system, it may break
sometimes, this is the reason we have backups to a Gitlab repo. When it
breaks, set the enableBackupDatabase dev var to true, and the variable
under it to the location of the file in the Gitlab repo.