const { Events } = require('discord.js');
const { Users } = require('../dbObjects.js');
const { currency } = require('../currency.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const storedBalances = await Users.findAll();
		storedBalances.forEach(b => currency.set(b.user_id, b));

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};