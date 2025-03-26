class CheeseGuild {
    constructor(id, name) {
        if (!id || !name) {
            throw new Error("Guild ID and Name are required.");
        }
        this.id = id;
        this.name = name;
        this.members = new Map(); // Simplified member list
        console.log(`CheeseGuild "${this.name}" created with ID: ${this.id}`);
    }

    addMember(member) {
        this.members.set(member.id, member);
        console.log(`Member ${member.username} added to guild ${this.name}`);
    }

    getMember(memberId) {
        return this.members.get(memberId);
    }

    toString() {
        return `CheeseGuild: ${this.name} (ID: ${this.id})`;
    }
}

module.exports = CheeseGuild;