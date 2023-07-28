const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { ENVURL, role } = require('../../vars.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('flush')
        .setDescription('flush chat'),
    async execute(interaction) {

        if (role){
            if(!interaction.member.roles.cache.some(role => role.name === 'MediaChat')){
                return interaction.reply("```Vous n'avez pas la permission d'utiliser cette commande.```", { ephemeral: true });
            }
        }

        const req = await axios.post(ENVURL + "/flush", {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const user = interaction.member.user;
        return interaction.reply("```" + user.username + " à flush le chat !```");
    },
};
