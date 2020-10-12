
/*    Yagami Client by Net#0001    */

const { Client, Collection } = require('discord.js');
const path = require('path');
const fse = require('fs-extra');

class Yagami extends Client {
    constructor(config = {}) {
        super(config);

        this.cunts = config.cunts;

        this.config = {
            token: config.token || '',
            prefix: config.prefix || '',
            protection: {
                channelDeleted: config.channelDeleted || 3,
                kickCount: config.kickCount || 3,
                banCount: config.banCount || 3,
                restore: config.restore || false,
                underTime: config.underTime * 60 * 1000 || 60 * 1000,
                resetTime: config.resetTime * 60 * 1000 || 60 * 1000
            },
            logID: config.logID || '',
            commands: './commands',
            events: './events'
        }
    }

    async Load() {
        let p = path.join(__dirname, '../../');
        let events = fse.readdirSync(p + this.config.events); 
        //let commands = fse.readdirSync(p + this.config.commands);
        
        for (let file of events) {
            const requireEvent = require(p + this.config.events + '/' + file);
            const newEvent = new requireEvent(this);
            const names = file.split('.')[0];

            super.on(names, (...args) => newEvent.run(...args));
        }
    }

    async Start() {
        await this.Load();

        await super.login(this.config.token).catch((e) => console.log(e));
    }
}

module.exports = Yagami;