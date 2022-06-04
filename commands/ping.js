module.exports = {
    name: 'ping',
    description: 'test ping command',
    execute(message, args){
        message.channel.send('pong!')
    }
}