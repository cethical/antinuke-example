class newMember {
    constructor(client) {
        this.config = client.config;
        this.client = client;
    }

    async run(member) {
        this.client.user.setPresence({
            game: {
                name: `over ${this.client.users.size.toLocaleString()} users`,
                type: 'Watching'
            },

            status: 'dnd'
        })

        let guildOwner = member.guild.owner;
        let channel = this.client.guilds.get(member.guild.id).channels.get(this.config.logID);

        if (this.config.protection.kickBots == false) {
            let msg = `:warning: [BOT] **${member.user.tag} (${member.user.id})** just joined! :robot:`;

            if (!channel) {
                return guildOwner.send(msg)
                    .catch((e) => console.log(msg));
            } else {
                return channel.send(msg);
            }
        }

        if (member.user.bot) {
            await member.kick('Automated kick')
                .then(() => {
                    let msg = `:thumbsup: Kicked **${member.user.tag} (${member.user.id})** for being a bot!`;

                    if (!channel) {
                        return guildOwner.send(msg)
                            .catch((e) => console.log(msg));
                    } else {
                        return channel.send(msg);
                    }
                })
                .catch((e) => {
                    let msg = `:thumbsup: Couldn't kick **${member.user.tag} (${member.user.id})** for being a bot. \n\n> Why: Missing permissions to.`;

                    if (!channel) {
                        return guildOwner.send(msg)
                            .catch((e) => console.log(msg));
                    } else {
                        return channel.send(msg);
                    }
                });
        }
    }
}

module.exports = newMember;