const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { ENVURL } = require('../../vars.js');
const { roleCheck } = require("../../vars");


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
            .setName('text_color')
            .setDescription('Code hexa de la couleur'))
        .addStringOption(option => option
            .setName('text_font')
            .setDescription('font'))
        .addIntegerOption(option => option
            .setName('text_font_size')
            .setDescription('font size'))
        .addStringOption(option => option
            .setName('ratio')
            .setDescription('ratio du fichier'))
        .addBooleanOption(option => option
            .setName('fullscreen')
            .setDescription('true / false'))
        .addBooleanOption(option => option
            .setName('anonymous')
            .setDescription('true / false'))
        .addIntegerOption(option => option
            .setName('timestamp')
            .setDescription('A partir de quand la vidéo doit être jouée'))
        .addBooleanOption(option => option
            .setName('muted')
            .setDescription('true / false'))
        .addBooleanOption(option => option
            .setName('greenscreen')
            .setDescription('true / false'))
        .addUserOption(option => option
            .setName('user')
            .setDescription('Envoyer à un utilisateur')),
    async execute(interaction) {

        if(roleCheck(interaction)) return;

        const file = interaction.options.getAttachment('file');
        const positionx = interaction.options.getString('positionx') == null ? "center" : interaction.options.getString('positionx');
        const positiony = interaction.options.getString('positiony') == null ? "center" : interaction.options.getString('positiony');
        const text = interaction.options.getString('text');
        const text_positionx = interaction.options.getString('text_positionx') == null ? "center" : interaction.options.getString('text_positionx');
        const text_positiony = interaction.options.getString('text_positiony') == null ? "bottom" : interaction.options.getString('text_positiony');
        const text_color = interaction.options.getString('text_color') == null ? "#FFFFFF" : interaction.options.getString('text_color');
        const ratio = interaction.options.getString('ratio') == null ? 1 : parseFloat(interaction.options.getString('ratio').replace(",", "."));
        const text_font = interaction.options.getString('text_font') == null ? "Arial" : interaction.options.getString('text_font');
        const text_font_size = interaction.options.getInteger('text_font_size') ? interaction.options.getInteger('text_font_size') : "56";
        const fullscreen = interaction.options.getBoolean('fullscreen') ? interaction.options.getBoolean('fullscreen') : false;
        const anonymous = interaction.options.getBoolean('anonymous') ? interaction.options.getBoolean('anonymous') : false;
        const timestamp = interaction.options.getInteger('timestamp') == null ? 0 : interaction.options.getInteger('timestamp');
        const muted = interaction.options.getBoolean('muted') ? interaction.options.getBoolean('muted') : false;
        const greenScreen = interaction.options.getBoolean('greenscreen') ? interaction.options.getBoolean('greenscreen') : false;
        const user = interaction.options.getUser('user');

        const interactionUser = await interaction.guild.members.fetch(interaction.user.id)

        const author = interactionUser.nickname != null ? interactionUser.nickname : interaction.member.user.username;
        const avatar = interaction.member.user.avatarURL();

        if (text != undefined || text != null) {
            const data2 = {
                "data": text, "left": text_positionx, "top": text_positiony, "font_size": text_font_size, "font_family": text_font,
                "font_color": text_color,
                "haveFile": "true", "ratio": ratio
            }

            const req = await axios.post(ENVURL + "/sendText", data2, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const haveText = text != undefined || text != null;

        const data = {
            "data": file.url,
            "width": fullscreen ? "auto" : file.width,
            "height": fullscreen || file.height > 1080 ? 1080 : file.height,
            "left": positionx,
            "top": positiony,
            "timestamp": timestamp,
            "muted": muted,
            "ratio": ratio,
            "isLink": "true",
            "haveText": haveText,
            "typeFile": file.contentType,
            "anonymous": !greenScreen ? anonymous : true,
            "authorName": author,
            "authorAvatar": avatar,
            "greenscreen": greenScreen,
            "user": user != null ? user.username : null
        };

        const req = await axios.post(ENVURL + "/sendFile", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return interaction.reply("<@" + interaction.user + "> à envoyé le fichier " + file.url + " à " + (user != null ? user.username : "tout le monde") + (text != null ? " avec le texte : ```" + text + " ```" : ""));
    },
};
