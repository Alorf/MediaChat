const {SlashCommandBuilder} = require('discord.js');
const axios = require('axios');
const { ENVURL } = require('../../vars.js');
const { roleCheck } = require("../../vars");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendtext')
        .setDescription('Envoyer un texte')
        .addStringOption((option) => option
            .setRequired(true)
            .setName("text")
            .setDescription("add text"))
        .addStringOption(option => option
            .setName('positionx')
            .setDescription('left / center / right'))
        .addStringOption(option => option
            .setName('positiony')
            .setDescription('top / center / bottom'))
        .addStringOption(option => option
            .setName('color')
            .setDescription('Code hexa de la couleur'))
        .addStringOption(option => option
            .setName('font')
            .setDescription('font'))
        .addIntegerOption(option => option
            .setName('font_size')
            .setDescription('font size'))
        .addUserOption(option => option
            .setName('user')
            .setDescription('Envoyer à un utilisateur')),

    async execute(interaction) {
        
        if(roleCheck(interaction)) return;

        const text = interaction.options.getString('text');
        const text_positionx = interaction.options.getString('positionx') ? interaction.options.getString('positionx') : "center";
        const text_positiony = interaction.options.getString('positiony') ? interaction.options.getString('positiony') : "bottom";
        const text_color = interaction.options.getString('color') == null ? "#FFFFFF" : interaction.options.getString('color');
        const font = interaction.options.getString('font') ? interaction.options.getString('font') : "Arial";
        const font_size = interaction.options.getInteger('font_size') ? interaction.options.getInteger('font_size') : "56";
        const user = interaction.options.getUser('user');


        const data2 = {
            "data": text, "left": text_positionx, "top": text_positiony, "font_size": font_size, "font_family": font,
            "font_color": text_color,
            "haveFile": "false", "ratio": "1",
            "user": user != null ? user.username : null
        }

        const req = await axios.post(ENVURL + "/sendText", data2, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return interaction.reply("<@" + interaction.user + "> à envoyé un texte à " + (user != null ? user.username : "tout le monde") + " : ```" + text + " ```");
    },
};
