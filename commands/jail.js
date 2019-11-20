module.exports = message => {
  //const Discord = require('discord.js');
  //const imageManager = Discord.GetImageManager;

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
      const userImage = { "embed": { "image": { "url" : user.displayAvatarURL } } };
      //const userImage = { "code" : "html" };

      // send message with updated image
      message.channel.send(`${userName} is very JAILED! XD
Have an idea for a new image option?  Post it on our #jail-bot-suggestions channel on our Discord server, and we’ll look into it!`,
userImage
      )
      .catch(`Error: ${console.error}`);

    /*return member
      .kick()
      .then(() => message.reply(`${member.user.tag} was kicked.`))
      .catch(error => message.reply(`Sorry, an error occured.`)); */
  }
};
