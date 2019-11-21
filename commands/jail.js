module.exports = message => {
  const Discord = require('discord.js');
  const Canvas  = require('canvas');

  // what member shall we shove down the rabbit hole today?
  const member = message.mentions.members.first();
  //console.log(member);

  // default command reminder
  const commandReminder = '!jail @<user>';

  // TODO put this in a utility file
  const DISCORD_INVITE = 'https://discord.gg/9RZXnJ3';

  // who are you trying to jail?  random ways to say this
  // TODO this const will need it's own file
  const putJailArray = [
    'put in the klink',
    'throw in the slammer',
    'toss in jail',
    'dungeonize'
  ];
  const randomPutJail = () => {
    return putJailArray[ Math.floor(Math.random() * putJailArray.length) ];
  };

  const getJailedCanvas = async (user) => {
    const userProfile = user.displayAvatarURL;
    const canvasSize  = 300;

    // Set a new canvas to the dimensions of 700x250 pixels
    const canvas = Canvas.createCanvas(canvasSize, canvasSize);
    const ctx    = canvas.getContext('2d');

    // Since the images takes time to load, you should await it
    // Wait for Canvas to load the images
    const avatar   = await Canvas.loadImage( userProfile );
    const jailBars = await Canvas.loadImage( './images/jailuser-default.png' );

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

    // Use helpful Attachment class structure to process the file for you
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'jailed-user-image.png');

    // send it (for now ... TODO need to put back in main area)
    message.channel.send( 'hello world', attachment );

    //return attachment;
  };

  // member check first.  make sure there is a member listed.
  // if pass, commence the jailing
  if (member === undefined) 
  {
    return message.reply( `Who are you trying to ${randomPutJail()}? You must mention a member of this server.\n${commandReminder}` );
  } 
  else if (!member) 
  {
    return message.reply( `I don't recognize that member. Who are you trying to ${randomPutJail()}?\n${commandReminder}` );    
  } 
  else 
  {
      const user = member.user;
      const userName = (user.nick) ? user.nick : user.username;
      const jailedCanvas = getJailedCanvas( user );

      //message.channel.send('Hello', jailedCanvas); 

      // send message with updated image
//       message.channel.send(`${userName} is very JAILED! XD
// Have an idea for a new image option?  Post it on our #jail-bot-suggestions channel on our Discord server, and we’ll look into it!`,
// jailedCanvas
//       )
//       .catch(`Error: ${console.error}`);
  }
};
