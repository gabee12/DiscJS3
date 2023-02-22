const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roundtripping')
		.setDescription('Full trip API Call ping'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		interaction.editReply(`Roundtrip Latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};