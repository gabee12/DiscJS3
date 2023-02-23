const { SlashCommandBuilder } = require('discord.js');
const { getBalance } = require('../getBalance');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('saldo')
		.setDescription('Mostra o saldo de um usuário')
		.addUserOption(option =>
			option
				.setName('alvo')
				.setDescription('Alvo do comando')),
	async execute(interaction) {
		const target = interaction.options.getUser('alvo') ?? interaction.user;
		return interaction.reply(`${target.tag} tem ${getBalance(target.id)} dinheiros`);
	},
};