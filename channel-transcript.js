const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const emoji = require('../../emoji.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("channel-transcript")
    .setDescription("transcript channel!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addChannelOption((option) => {
        return option
          .setName("channel")
          .setDescription("channel to transcript.")
          .setRequired(true)
          .addChannelTypes(ChannelType.GuildText);
      }),
    async execute(interaction, client) {
        const channel = interaction.options.getChannel("channel");

        const attachment = await discordTranscripts.createTranscript(channel, {
            limit: -1, // Max amount of messages to fetch. `-1` recursively fetches.
            returnType: 'attachment', // Valid options: 'buffer' | 'string' | 'attachment' Default: 'attachment' OR use the enum ExportReturnType
            filename: `${channel}.html`, // Only valid with returnType is 'attachment'. Name of attachment.
            saveImages: false, // Download all images and include the image data in the HTML (allows viewing the image even after it has been deleted) (! WILL INCREASE FILE SIZE !)
            footerText: "Exported {number} message{s}", // Change text at footer, don't forget to put {number} to show how much messages got exported, and {s} for plural
            poweredBy: true, // Whether to include the "Powered by discord-html-transcripts" footer
            ssr: true // Whether to hydrate the html server-side
        });
        const embed = new EmbedBuilder()
        .setDescription(`${emoji.success}  successfully transcripts channel ${channel}`)
       interaction.reply({ embeds: [embed],
        files: [attachment],
      });    }
}