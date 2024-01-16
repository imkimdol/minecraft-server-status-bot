const { Events, ActivityType } = require('discord.js');
const util = require('minecraft-server-util');
const cron = require('node-cron');

const options = { timeout: 1000 * 5 };
const checkServer = async () => {
    let activity

    try {
        const data = await util.status(process.env.SERVER_IP, 25565, options);
        activity = `Server on! ${data.players.online}/${data.players.max} online`;
    } catch (e) {
        activity = 'Server off!';
    }

    return activity;
};
const checkAndSet = async (client) => {
    const activity = await checkServer();
    client.user.setActivity(activity, { type: ActivityType.Custom });
}

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        cron.schedule('* * * * *', () => checkAndSet(client));

        checkAndSet(client);
    },
};