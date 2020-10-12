class Ready {
    constructor(client) {
        this.client = client;
    }

    run() {
      this.client.user.setPresence({
      game: {
        name: `over ${this.client.users.size.toLocaleString()} users!`,
        type: 'Watching'
      },

      status: 'dnd'
    })

        console.log(`Connected as ${this.client.user.username}`);
    }
}

module.exports = Ready;