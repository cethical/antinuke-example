/* 

 /$$     /$$                                          /$$
|  $$   /$$/                                         |__/
 \  $$ /$$//$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$/$$$$  /$$
  \  $$$$/|____  $$ /$$__  $$ |____  $$| $$_  $$_  $$| $$
   \  $$/  /$$$$$$$| $$  \ $$  /$$$$$$$| $$ \ $$ \ $$| $$
    | $$  /$$__  $$| $$  | $$ /$$__  $$| $$ | $$ | $$| $$
    | $$ |  $$$$$$$|  $$$$$$$|  $$$$$$$| $$ | $$ | $$| $$
    |__/  \_______/ \____  $$ \_______/|__/ |__/ |__/|__/
                    /$$  \ $$                            
                   |  $$$$$$/                            
                    \______/                             
                    
*/

const Yagami = require('./lib/struct/Yagami');

const Client = new Yagami({
    cunts: ['id 1', 'id 2', 'id 3'], // aka whitelisted ids to bypass
    token: 'token here retard',
    prefix: '/',
    kickCount: 5,
    banCount: 2,
    resetTime: 1, // minutes
    logID: '696969696969', // channel to log in
    kickBots: true 
});

Client.Start();