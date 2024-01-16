const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping-owner')
        .setDescription('Pings Server Owner.'),
    async execute(interaction, client) {
        const owner = process.env.OWNER_USER_ID;
        if (owner) {
            interaction.reply(`<@${owner}> turn on server please!`);
        } else {
            interaction.reply('Server owner not specified in .env!');
        }
        
    },
};