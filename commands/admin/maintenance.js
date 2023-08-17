const { SlashCommandBuilder, Activity } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
    guildOnly: false, // サーバー専用コマンドかどうか
    adminGuildOnly: true,
    data: new SlashCommandBuilder() // スラッシュコマンド登録のため
        .setName("maintenance")
        .setDescription("メンテモード")
        .addStringOption(option => option.setName('enablet')
            .setDescription('on/off')
            .setChoices(
                { name: 'on', value: 'on' },
                { name: 'off', value: 'off' }
            )
            .setRequired(true))
        .addStringOption(option =>
            option.setName('playing')
                .setDescription('プレイ中に表示するやつ'))
        .addStringOption(option =>
            option.setName('status')
                .setDescription('すてーたす')
                .setChoices(
                    { name: 'オンライン', value: 'online' },
                    { name: '取り込み中', value: 'dnd' },
                    { name: 'スリープ', value: 'idle' },
                    //{ name: 'スマホでオンライン', value: 'Discord Android' },
                    { name: 'オンライン隠し', value: 'invisible' }
                    ))
        .addStringOption(option =>
            option.setName('activity')
                .setDescription('あくてぃびてぃ')
                .setChoices(
                    { name: '視聴中', value: 'WATCHING' },
                    { name: 'プレイ中', value: 'PLAYING' },
                    { name: '競争する？', value: 'COMPETING' },
                    { name: '再生中(聞く)', value: 'LISTENING' },
                    { name: '配信中？', value: 'STREAMING' })),

    async execute(i, client, command) {
        try {
            const onoff = i.options.getString('enablet');
            if (onoff == 'on') {
                const status = i.options.getString('status');
                const playing = i.options.getString('playing');
                const activity = i.options.getString('activity');
                /*
                if (status == 'Discord Android') {
                    client.ws = { properties: { "$os": "Untitled OS", "$browser": "Discord Android", "$device": "Replit Container" } };
                    client.user.setStatus('online');
                } else {*/
                //    client.ws = () => { return { properties: { "$os": "Untitled OS", "$browser": "Untitled Browser", "$device": "Replit Container" } }; }
                    client.user.setStatus(status);
                //}

                client.user.setActivity(playing, { type: activity });

                const embed = new Discord.EmbedBuilder()
                    .setTitle("ok")
                    .setColor(client.conf.color.s)
                    .setTimestamp();

                i.reply({ embeds: [embed] });
                client.func.loging({ onoff: "on", status: status, playing: playing }, "v1/conf/status");
                return `{ "onoff":"on","status": "${status}", "playing": "${playing}", "activity": "${activity}" }`;
            } else {
                client.shard.fetchClientValues('guilds.cache.size')
                    .then(result => {
                        client.user.setActivity(`Servers: ${result}`);
                    });
                //client.ws = { properties: { "$os": "Untitled OS", "$browser": "Untitled Browser", "$device": "Replit Container" } };
                client.user.setStatus("online");
                const embed = new Discord.EmbedBuilder()
                    .setTitle("ok")
                    .setColor(client.conf.color.s)
                    .setTimestamp();

                i.reply({ embeds: [embed] });
                client.func.loging({ onoff: "off" }, "v1/conf/status");
                return `{ "onoff":"off"}`;
            }
        } catch (e) {
            throw e;
        }

    },
}