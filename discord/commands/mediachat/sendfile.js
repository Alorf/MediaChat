const {SlashCommandBuilder} = require('discord.js');
const axios = require('axios');
const {ENVURL} = require('../../vars.js');
const {roleCheck} = require("../../vars");
const {Video} = require("../../../entity/Video");
const {FileToSend} = require("../../../entity/FileToSend");
const {Position} = require("../../../entity/Position");
const {Text} = require("../../../entity/Text");
const {Image} = require("../../../entity/Image");
const {Author} = require("../../../entity/Author");


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
            .setDescription('center'))
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
        .addNumberOption(option => option
            .setName('duration')
            .setDescription('durée d\'affichage de l\'image'))
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
            .setDescription('Envoyer à un utilisateur')
        ),
    async execute(interaction) {

        if (roleCheck(interaction)) return;

        const file = interaction.options.getAttachment('file');
        const positionx = interaction.options.getString('positionx') == null ? "center" : interaction.options.getString('positionx');
        const positiony = interaction.options.getString('positiony') == null ? "center" : interaction.options.getString('positiony');
        const text = interaction.options.getString('text');
        const text_positionx = interaction.options.getString('text_positionx') == null ? "center" : interaction.options.getString('text_positionx');
        const text_positiony = interaction.options.getString('text_positiony') == null ? "bottom" : interaction.options.getString('text_positiony');
        const text_color = interaction.options.getString('text_color') == null ? "#FFFFFF" : interaction.options.getString('text_color');
        const duration = interaction.options.getNumber('duration') ?? 10;
        const ratio = interaction.options.getString('ratio') == null ? 1 : parseFloat(interaction.options.getString('ratio').replace(",", "."));
        const text_font = interaction.options.getString('text_font') == null ? "Arial" : interaction.options.getString('text_font');
        const text_font_size = interaction.options.getInteger('text_font_size') ? interaction.options.getInteger('text_font_size') : "100";
        const fullscreen = interaction.options.getBoolean('fullscreen') ? interaction.options.getBoolean('fullscreen') : false;
        const anonymous = interaction.options.getBoolean('anonymous') ? interaction.options.getBoolean('anonymous') : false;
        const timestamp = interaction.options.getInteger('timestamp') == null ? 0 : interaction.options.getInteger('timestamp');
        const muted = interaction.options.getBoolean('muted') ? interaction.options.getBoolean('muted') : false;
        const greenScreen = interaction.options.getBoolean('greenscreen') ? interaction.options.getBoolean('greenscreen') : false;
        const user = interaction.options.getUser('user');

        const interactionUser = await interaction.guild.members.fetch(interaction.user.id)

        const author = interactionUser.nickname != null ? interactionUser.nickname : interaction.member.user.username;
        const avatar = interaction.member.user.avatarURL();

        const haveText = text != undefined || text != null;

        const position = new Position(
            positiony,
            positionx,
            ratio,
        )

        let video = undefined

        let image = undefined

        if (file.contentType.includes("video")) {
            video = new Video(
                file.url,
                file.height < 720 ? "auto" : file.width,
                file.height > 1080 ? 1080 : file.height < 720 ? 720 : file.height,
                muted,
                greenScreen,
                fullscreen,
                timestamp,
                position,
                false
            );
        } else {
            image = new Image(
                file.url,
                file.height < 720 ? "auto" : file.width,
                file.height > 1080 ? 1080 : file.height < 720 ? 720 : file.height,
                fullscreen,
                duration,
                position,
                false
            );
        }

        const textPosition = new Position(
            text_positiony,
            text_positionx,
            1,
        )

        const textData = new Text(
            text,
            text_font,
            text_color,
            text_font_size,
            duration,
            textPosition
        );

        const authorData = new Author(
            author,
            avatar,
            anonymous
        );

        const destinationData = new Author(
            user == null ? undefined : user.username,
            avatar
        );

        const fileToSend = new FileToSend(
            video,
            image,
            textData,
            authorData,
            destinationData
        );

        const req = await axios.post(ENVURL + "/sendFile", fileToSend, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        try {
            return interaction.reply("<@" + interaction.user + "> à envoyé le fichier " + file.url + " à " + (user != null ? user.username : "tout le monde") + (text != null ? " avec le texte : ```" + text + " ```" : ""));

        } catch (Error) {
            return interaction.reply("Erreur lors de l'envoi du fichier");
        }
    },
};
