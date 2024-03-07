const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { ENVURL, roleCheck } = require('../../vars.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flush')
        .setDescription('flush chat')
        .addUserOption(option => option
            .setName('user')
            .setDescription('Envoyer à un utilisateur')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');


        if(roleCheck(interaction)) return;

        const data = {
            "user": user != null ? user.username : undefined
        }


        await axios.post(ENVURL + "/flush", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return interaction.reply("<@" + interaction.user + "> à flush le chat de " + (user != null ? user.username : "tout le monde"));
    },
};
