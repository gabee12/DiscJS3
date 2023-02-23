const { SlashCommandBuilder, codeBlock } = require('discord.js');
const { currency } = require('../currency');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ricaços')
		.setDescription('Os top 10 mais ricos do servidor'),
	async execute(interaction) {
		return interaction.reply(
			codeBlock(
				currency.sort((a, b) => b.balance - a.balance)
					.filter(user => interaction.client.users.cache.has(user.user_id))
					.first(10)
					.map((user, position) => `(${position + 1}) ${(interaction.client.users.cache.get(user.user_id).tag)}: ${user.balance} dinheiros`)
					.join('\n'),
			),
		);
	},
};