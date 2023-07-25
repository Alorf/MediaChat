const {SlashCommandBuilder} = require('discord.js');
const axios = require('axios');
const { ENVURL } = require('../../vars.js');


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
            .setName('font')
            .setDescription('font'))
        .addStringOption(option => option
            .setName('font_size')
            .setDescription('font size')),

    async execute(interaction) {
        const text = interaction.options.getString('text');
        const text_positionx = interaction.options.getString('positionx') ? interaction.options.getString('positionx') : "center";
        const text_positiony = interaction.options.getString('positiony') ? interaction.options.getString('positiony') : "bottom";
        const font = interaction.options.getString('font') ? interaction.options.getString('font') : "Arial";
        const font_size = interaction.options.getString('font_size') ? interaction.options.getString('font_size') : "56";

        const data2 = {
            "data": text, "left": text_positionx, "top": text_positiony, "font_size": font_size, "font_family": font,
            "font_color": "#FFFFFF",
            "haveFile": "false", "ratio": "1"
        }

        const req = await axios.post(ENVURL + "/sendText", data2, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return interaction.reply('Texte envoyé !');
    },
};
