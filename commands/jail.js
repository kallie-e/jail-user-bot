const Discord    = require('discord.js');
const Canvas     = require('canvas');
const globals    = require('../lib/globals');
const jailMsg    = require('../lib/JailRandomPutList');
const options    = require('../lib/JailBarOptions');

module.exports = {
  // message.js looks for command. here, the message needs to be split into array.  [0]command [1]user [2+] options
  displayJailedCanvas: async (message, user, jailOptions) => {
    const canvasSize  = 300;
    const userProfile = user.displayAvatarURL;  // avatar pic
    const userName    = (user.nick) ? user.nick : user.username;

    // Set a new canvas to the dimensions pixels
    const canvas = Canvas.createCanvas(canvasSize, canvasSize);
    const ctx    = canvas.getContext('2d');

    // Since the images takes time to load, you should await it
    // Wait for Canvas to load the images
    const avatar   = await Canvas.loadImage( userProfile );
    const jailBars = await Canvas.loadImage( './images/' + jailOptions.imageBars );

    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.globalAlpha = 0.4;      // set transparency value
    ctx.drawImage(avatar, 0, 0, canvasSize, canvasSize); 

    // Overlay gradient darkening circle
    const mid = canvasSize / 2;
    const gradient = ctx.createRadialGradient(mid, mid, 70, mid, mid, 175);
    gradient.addColorStop(0.0, 'rgba(16, 16, 16, 0)');
    gradient.addColorStop(0.3, 'rgba(16, 16, 16, 0.3)');
    gradient.addColorStop(0.6, 'rgba(16, 16, 16, 0.7)');
    gradient.addColorStop(0.9, '#111111');
    gradient.addColorStop(1.0, '#000000');
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 1.0;      // set transparency value
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // draw the bars
    ctx.drawImage(jailBars, 0, 0, canvas.width, canvas.height);

    // Use helpful Attachment class structure to process the file for you (using generic name)
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'jailed-user-image.png');

    // send message with updated image
    const msg     = (jailOptions.announcement.trim().length > 0) ? jailOptions.announcement : `${userName} ${jailMsg.randomJailMessage(jailMsg.PAST)}!`;
    const msgIdea = globals.i18n.Jail.MsgIdea;

    message.channel.send( `${msg}\n\n${msgIdea}`, attachment ).catch(`Error: ${console.error}`);
  }
};
