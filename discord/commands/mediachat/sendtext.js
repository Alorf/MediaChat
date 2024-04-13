const {SlashCommandBuilder} = require('discord.js');
const axios = require('axios');
const { ENVURL } = require('../../vars.js');
const { roleCheck } = require("../../vars");
const {Text} = require("../../../entity/Text");
const {Author} = require("../../../entity/Author");
const {FileToSend} = require("../../../entity/FileToSend");
const {Position} = require("../../../entity/Position");


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
        .addNumberOption(option => option
            .setName('duration')
            .setDescription('durée d\'affichage du texte'))
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
        const duration = interaction.options.getNumber('duration') ?? 10;
        const font = interaction.options.getString('font') ? interaction.options.getString('font') : "Arial";
        const font_size = interaction.options.getInteger('font_size') ? interaction.options.getInteger('font_size') : "100";
        const user = interaction.options.getUser('user');

        const interactionUser = await interaction.guild.members.fetch(interaction.user.id)

        const author = interactionUser.nickname != null ? interactionUser.nickname : interaction.member.user.username;
        const avatar = interaction.member.user.avatarURL();

        const position = new Position(
            text_positiony,
            text_positionx,
            1,
        )

        const textData = new Text(
            text,
            font,
            text_color,
            font_size,
            duration,
            position
        );

        const authorData = new Author(
            author,
            avatar,
            true
        );

        const destinationData = new Author(
            user == null ? undefined : user.username,
            avatar
        );

        const fileToSend = new FileToSend(
            undefined,
            undefined,
            textData,
            authorData,
            destinationData
        );

        const req = await axios.post(ENVURL + "/sendFile", fileToSend, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return interaction.reply("<@" + interaction.user + "> à envoyé un texte à " + (user != null ? user.username : "tout le monde") + " : ```" + text + " ```");
    },
};
