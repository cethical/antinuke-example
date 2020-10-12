const fse = require('fs-extra');

const users = {};

class massbanProtection {
    constructor(client) {
        this.config = client.config;
        this.client = client;
    }

    async run(guild, user) {
        let maxBanned = this.config.protection.banCount;
        let resetTime = this.config.protection.resetTime;

        guild.fetchAuditLogs().then(async (audit) => {
            let executorID = audit.entries.first().executor.id;
            let bannedUser = audit.entries.first().target;

            if (!users[executorID]) {
                users[executorID] = {
                    count: 1,
                    users: [ bannedUser ]
                };
            } else {
                users[executorID].users.push(bannedUser);
            }

            setInterval(async () => {
                await delete users[executorID];
            }, resetTime);

            if (users[executorID]) {
                if (users[executorID].count > maxBanned) {
                    let susUser = guild.members.get(executorID);
                    let channel = guild.channels.get(this.config.logID);
                    let guildOwner = guild.owner;

                    guild.members.get(executorID).kick(`Suspiciously banned more than ${maxBanned} members under a short time.`)
                        .then(() => {
                            let msg = `:warning: Kicked **${susUser.user.tag} (${susUser.user.id})** \n\n> Reason: Suspiciously banned more than **${maxBanned}** members under a short time.`;

                            if (!channel) {
                                guildOwner.send(msg)
                                    .catch((err) => console.log(msg));
                            } else {
                                channel.send(msg);
                            }
                        })
                        .catch((e) => {
                            if (e) {
                                let msg = `:warning: WARNING! **${susUser.user.tag}** is above the ban amount limit (**${maxBanned}**) within the timestamp! \n\n> Problem: I am missing permissions to kick them.`;

                                if (!channel) {
                                    guildOwner.send(msg)
                                        .catch((err) => console.log(msg));
                                } else {
                                    channel.send(msg);
                                }
                            }
                        });

                    for (let user of users[executorID].users) {
                        try {
                            await guild.unban(user.id);
                        } catch(e) {
                            return;
                        }
                    }

                    let map = users[executorID].users.map(m => `${m.username}#${m.discriminator}`).join('**,** ');
                    let msg = `:broom: Clean up! Unbanned **${users[executorID].users.length}** members. :thumbsup: \n\n> Users: \n> ${map}`;
                    
                    if (!channel) {
                        return guildOwner.send(msg)
                            .catch((err) => console.log(msg));
                    } else {
                        return channel.send(msg);
                    }
                } else {
                    users[executorID].count++;
                }
            }
        });
    }
}

module.exports = massbanProtection;