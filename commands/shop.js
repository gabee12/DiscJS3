const { SlashCommandBuilder, codeBlock } = require('discord.js');
const { CurrencyShop } = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loja')
		.setDescription('Mostrar a loja'),
	async execute(interaction) {
		const items = await CurrencyShop.findAll();
		return interaction.reply(codeBlock(items.map(i => `${i.name}: ${i.cost} dinheiros`).join('\n')));
	},
};