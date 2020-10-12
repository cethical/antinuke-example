![anime trees](http://dailyhdwallpaper.com/wp-content/uploads/3D-Panoramic-Landscape-Multi-4.3-Wallpaper-1920x720.jpg)

<h1 align="center">Yagami</h1>

## Privacy
Once getting hand of this code you cannot share it with anyone! Or you will not be included to get any future updates. All credits featuring this rep goes to me, Net#0001

## Installation
You'll need NodeJS & Git, click following links to download.  
If you already got them, go to 'Cloning and Installing'.

- [NodeJS](https://nodejs.org/en/)
- [Git](https://git-scm.com/download)

Then if you wanna check if you have downloaded them correctly:  
Open Terminal
```
$ git --version
$ node -v
```

### Cloning and Installing
Open your Terminal to pursue following instructions:
```
$ git clone https://github.com/tights/Yagami
$ cd Yagami
$ npm i
```

## Config (edit src/main.js)
```js 
const Client = new Yagami({
    token: '', // The bot token
    prefix: '', // The bot prefix
    banCount: 5, // Keep this as default, you can change it however. If a member bans more than 5 members it'll kick him/her.
    resetTime: 1, // Resets the user bans every MINUTE, so this will reset every 1 minute.
    logID: '', // Channel to log all bot msgs, if there's no channel it'll log msgs in server owners DM (MUST HAVE DMS OPEN IN THAT CASE)
    kickBots: false // Disable/Enable if the bot should kick bots on-join, if this is disabled it'll still say a bot joined but won't kick it.
});
```

## Start/Run
```
$ npm start
```
