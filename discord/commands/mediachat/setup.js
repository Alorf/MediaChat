const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { ENVURL, roleCheck } = require('../../vars.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Setup de la page stream')
        .addBooleanOption(option => option
            .setName('queue')
            .setDescription('Passer en mode queue')),
    async execute(interaction) {
        const queue = interaction.options.getBoolean('queue');


        if(roleCheck(interaction)) return;

        const data = {
            "queue": queue
        }

        const req = await axios.post(ENVURL + "/setup", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return interaction.reply("<@" + interaction.user + "> passe en mode " + (queue ? "queue" : "normal") + " pour tout le monde");
    },
};
