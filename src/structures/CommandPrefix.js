class CommandPrefix {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.aliases = options.aliases
    }
}

module.exports = CommandPrefix