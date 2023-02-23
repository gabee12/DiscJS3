const { SlashCommandBuilder } = require('discord.js');
const { Users } = require('../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inventario')
		.setDescription('Mostra o inventario de um usuario')
		.addUserOption(option =>
			option
				.setName('alvo')
				.setDescription('Alvo do comando')),
	async execute(interaction) {
		const target = interaction.options.getUser('alvo') ?? interaction.user;
		const user = await Users.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();

		if (!items.length) return interaction.reply(`${target.tag} não tem nada!`);

		return interaction.reply(`${target.tag} atualmente possui ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
	},
};