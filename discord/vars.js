const PORT = process.env.PORT || 3000;
const ENVURL = process.env.ENVURL || 'http://localhost:' + PORT;
const { role } = require('./config.json') || false;

function roleCheck(interaction) {
    if (role){
        if(!interaction.member.roles.cache.some(role => role.name.toLowerCase() === 'mediachat')){
            return interaction.reply("```Vous n'avez pas la permission d'utiliser cette commande.```", { ephemeral: true });
        }
    }
}

module.exports = { PORT, ENVURL, role, roleCheck };
