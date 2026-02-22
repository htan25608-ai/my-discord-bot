import { Client, GatewayIntentBits } from 'discord.js';
import { DisTube } from 'distube';
import { YouTubePlugin } from '@distube/youtube';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ],
});

const distube = new DisTube(client, {
    plugins: [new YouTubePlugin()],
});

client.once('ready', () => {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift()?.toLowerCase();

    if (command === 'play') {
        const voiceChannel = message.member?.voice.channel;
        if (!voiceChannel) return message.reply('Bạn cần vào phòng voice trước!');
        distube.play(voiceChannel, args.join(' '), {
            message,
            textChannel: message.channel as any,
        });
    }
});

client.login(process.env.TOKEN);
