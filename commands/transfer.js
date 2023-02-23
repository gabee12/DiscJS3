const { SlashCommandBuilder } = require('discord.js');
const { getBalance } = require('../getBalance');
const { addBalance } = require('../addBalance');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pix')
		.setDescription('Transfere dinheiro pra um outro usuário')
		.addIntegerOption(option =>
			option
				.setName('quantidade')
				.setDescription('Quantia a ser transferida')
				.setRequired(true))
		.addUserOption(option =>
			option
				.setName('usuario')
				.setDescription('Pessoa para quem o PIX sera feito')
				.setRequired(true)),
	async execute(interaction) {
		const currentAmount = getBalance(interaction.user.id);
		const transferAmount = interaction.options.getInteger('quantidade');
		const transferTarget = interaction.options.getUser('usuario');

		if (transferAmount > currentAmount) return interaction.reply(`Seu saldo é muito baixo para fazer o PIX de ${transferAmount} dinheiros`);
		if (transferAmount <= 0) return interaction.reply('Não da pra fazer um PIX negativo ou nulo, por favor insira um valor maior que 0 dinheiros');

		addBalance(interaction.user.id, -transferAmount);
		addBalance(transferTarget.id, transferAmount);

		return interaction.reply(`PIX de ${transferAmount} dinheiros feito para ${transferTarget.tag}. Seu saldo atual é de ${getBalance(interaction.user.id)} dinheiros`);
	},
};