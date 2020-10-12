module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(oldMember, newMember) {
        const guild = newMember.guild;
        const auditFetch = await guild.fetchAuditLogs({ limit: 1 });
        const changes = auditFetch.entries.first().changes[0]
        const target = auditFetch.entries.first().target;
        const executor = auditFetch.entries.first().executor;
        
        if (executor.id == guild.owner.user.id) return;
        if (this.client.cunts.includes(executor.id)) return;
        if (target.id == executor.id) return;
        if (changes.key != '$add') return;
        
        const audit = auditFetch.entries.first();
        const appliedRole = changes.new[0];
        const foundRole = guild.roles.find(x => x.id == appliedRole.id);
        const rolePerms = foundRole.serialize(foundRole.permissions);

        if (rolePerms.ADMINISTRATOR) {
            const foundTarget = guild.members.find(x => x.id == target.id);
            const foundExecutor = guild.members.find(x => x.id == executor.id);

            await foundTarget.removeRoles(foundTarget.roles.map(x => x.id));
            await foundExecutor.removeRoles(foundExecutor.roles.map(x => x.id));

            guild.owner.send(`:warning: **${executor.tag}** (**${executor.id}**) gave **${target.tag}** (**${target.id}**) admin role, so I removed **${executor.username}**'s & **${target.username}**'s roles.`);
        }
    }
}