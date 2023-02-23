const { SlashCommandBuilder } = require('discord.js');
const { Users, CurrencyShop } = require('../dbObjects');
const { Op } = require('sequelize');
const { getBalance } = require('../getBalance');
const { addBalance } = require('../addBalance');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('comprar')
		.setDescription('Compra um item da loja')
		.addStringOption(option =>
			option
				.setName('item')
				.setDescription('Item a ser comprado')
				.setRequired(true),
		),
	async execute(interaction) {
		const itemName = interaction.options.getString('item');
		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: itemName } } });

		if (!item) return interaction.reply('Esse item não esta em estoque no momento');
		if (item.cost > getBalance(interaction.user.id)) {
			return interaction.reply(`Você tem ${getBalance(interaction.user.id)} dinheiros, mas o item custa ${item.cost} dinheiros`);
		}

		const user = await Users.findOne({ where: { user_id: interaction.user.id } });
		addBalance(interaction.user.id, -item.cost);
		await user.addItem(item);

		return interaction.reply(`Voce comprou ${item.name}`);
	},
};