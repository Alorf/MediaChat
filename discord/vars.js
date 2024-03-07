const { PORT, ENVURL, clientId, guildId, token, role } = require('../vars.js');

function roleCheck(interaction) {
    if (role === true){
        if(!interaction.member.roles.cache.some(role => role.name.toLowerCase() === 'mediachat')){
            return interaction.reply("```Vous n'avez pas la permission d'utiliser cette commande.```", { ephemeral: true });
        }
    }
}

module.exports = { PORT, ENVURL, role, roleCheck, clientId, guildId, token };
