

module.exports = {
    name: 'ticket',
    aliases: [],
    permissions: [],
    description: 'open a ticket!',
    async execute(message, args, cmd, client, discord){
        const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`)
        channel.setParent('982722517192036402')

        channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
        });

        channel.permissionOverwrites.edit(message.author, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        });

        const reactMessage = await channel.send('Thanks for reaching out :)')

        try{
            await reactMessage.react(':lock:')
            await reactMessage.react(':octagonal_sign:')
        }catch(err){
            channel.send('Errort sending emojis')
            throw err;
        }

        const collector = reactMessage.createReactionCollector(
            (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermissions('ADMINISTRATOR'),
            { dispose: true}
        );

        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name){
                case ':lock:':
                    channel.permissionOverwrites.edit(message.author, {SEND_MESSAGES: false})
                    break;
                case ':octagonal_sign:':
                    channel.send('Deleting this channel shortly')
                    setTimeout(() => channel.delete(), 5000)
                    break;
            }
        });

        message.channel.send(`We will reach out to you shortly ${channel}`).then((msg) => {
            setTimeout(() => msg.delete(), 7000)
            setTimeout(() => message.delete(), 3000);
        }).catch((err) => {
            throw err;
        })
    }
}