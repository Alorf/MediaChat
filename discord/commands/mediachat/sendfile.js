const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { ENVURL } = require('../../vars.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendfile')
        .setDescription('Envoyer un fichier')
        .addAttachmentOption((option) => option
            .setRequired(true)
            .setName("file")
            .setDescription("File to send"))
        .addStringOption(option => option
            .setName('positionx')
            .setDescription('left / center / right'))
        .addStringOption(option => option
            .setName('positiony')
            .setDescription('top / center / bottom'))
        .addStringOption((option) => option
            .setName("text")
            .setDescription("add text"))
        .addStringOption(option => option
            .setName('text_positionx')
            .setDescription('left / center / right'))
        .addStringOption(option => option
            .setName('text_positiony')
            .setDescription('top / center / bottom'))
        .addStringOption(option => option
            .setName('text_font')
            .setDescription('font'))
        .addStringOption(option => option
            .setName('text_font_size')
            .setDescription('font size'))
        .addStringOption(option => option
            .setName('ratio')
            .setDescription('ratio du fichier'))
        .addStringOption(option => option
            .setName('fullscreen')
            .setDescription('true / false')),

    async execute(interaction) {
        const file = interaction.options.getAttachment('file');
        const positionx = interaction.options.getString('positionx') == null ? "center" : interaction.options.getString('positionx');
        const positiony = interaction.options.getString('positiony') == null ? "center" : interaction.options.getString('positiony');
        const text = interaction.options.getString('text');
        const text_positionx = interaction.options.getString('text_positionx') == null ? "center" : interaction.options.getString('text_positionx');
        const text_positiony = interaction.options.getString('text_positiony') == null ? "bottom" : interaction.options.getString('text_positiony');
        const ratio = interaction.options.getString('ratio') == null ? "1" : interaction.options.getString('ratio');
        const text_font = interaction.options.getString('text_font') ? interaction.options.getString('text_font') : "Arial";
        const text_font_size = interaction.options.getString('text_font_size') ? interaction.options.getString('text_font_size') : "56";
        const fullscreen = interaction.options.getString('fullscreen') == null ? "false" : interaction.options.getString('fullscreen');

        if (text != undefined || text != null) {
            const data2 = {
                "data": text, "left": text_positionx, "top": text_positiony, "font_size": text_font_size, "font_family": text_font,
                "font_color": "#FFFFFF",
                "haveFile": "true", "ratio": ratio
            }

            const req = await axios.post(ENVURL + "/sendText", data2, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const data = {
            "data": file.url,
            "width": fullscreen == "true" ? "1920" : file.width,
            "height": fullscreen == "true" ? "1080" : file.height,
            "left": positionx,
            "top": positiony,
            "timestamp": "0",
            "muted": "false",
            "ratio": ratio,
            "isLink": "true",
            "typeFile": file.contentType
        };

        const req = await axios.post(ENVURL + "/sendFile", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return interaction.reply(file.url);
    },
};
