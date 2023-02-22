const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Fornece informação sobre um usuário ou sobre o servidor')
		.addSubcommand(subcommand =>
			subcommand
				.setName('usuario')
				.setDescription('Informações sobre um usuário escolhido ou sobre você, caso nenhuma escolha seja feita')
				.addUserOption(option => option.setName('usuario').setDescription('Alvo do comando')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('servidor')
				.setDescription('Informações sobre o servidor atual')),
	async execute(interaction) {
		const command = interaction.options.getSubcommand();
		if (command === 'usuario') {
			const target = interaction.options.getUser('usuario') ?? interaction.user;

			await interaction.reply(`Nome: ${target.username}\nID: ${target.id}`);
		}
		else {
			await interaction.reply(`Nome do servidor: ${interaction.guild.name}\nNumero de membros: ${interaction.guild.memberCount}`);
		}
	},
};