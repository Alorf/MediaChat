const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { ENVURL, roleCheck } = require('../../vars.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('skip current media')
        .addUserOption(option => option
            .setName('user')
            .setDescription('Envoyer à un utilisateur')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');


        if(roleCheck(interaction)) return;

        const data = {
            "user": user != null ? user.username : null
        }

        const req = await axios.post(ENVURL + "/skip", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return interaction.reply("<@" + interaction.user + "> à skip le média dans la scene de " + (user != null ? user.username : "tout le monde"));
    },
};
