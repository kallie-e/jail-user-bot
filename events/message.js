const globals    = require('../lib/globals');
const jail       = require("../commands/jail");
const jailMsg    = require('../lib/JailRandomPutList');
const options    = require('../lib/JailBarOptions');

module.exports = (client, message) => {
	// !TODO internationalize
	if (message.content.startsWith( globals.JAIL_CMD )) {		
		// what member shall we shove down the rabbit hole today?
		const member   = message.mentions.members.first();
		const msgArray = message.content.split(' ');

		// member check first.  make sure there is a member listed.
		if (member === undefined) 
		{
			// asking for help maybe?
			if(msgArray[1] === 'help') 
			{
				let msg = `Option list...\n${globals.CMD_REMIND}: ${options.default.description}\n`;

				for (const key in options) {
				  if( !options[key].hidden ) msg += `${globals.CMD_REMIND} ${key}: ${options[key].description}\n`;
				}

				return message.channel.send( msg );
			} 
			else 
			{
				// if not asking for help, and didn't list a member ... like ... at all .... 
				return message.channel.send( `Who are you trying to ${jailMsg.randomJailMessage(jailMsg.PRESENT)}? You must mention a member of this server.\n${globals.CMD_REMIND_OPTION}` );				
			}
		} 
		else if (!member) 
		{
			// tried to list a member, but no idea who ya talkin' about
			return message.channel.send( `I don't recognize that member. Who are you trying to ${jailMsg.randomJailMessage(jailMsg.PRESENT)}?\n${globals.CMD_REMIND_OPTION}` );    
		} 
		else 
		{
			// ok, we got this far.  now let's check the order.  
			// did they put any member name after the cmd? (member name is returned as hash eg. <@0123456789>
			if(msgArray[1].indexOf('@') < 0 ) 
			{
				return message.channel.send( `Please use the following format: ${globals.CMD_REMIND_OPTION}` );    
			}

			// if the parameter list is empty, assume 'default'
			const jailOption = (msgArray.length < 3) ? 'default' : msgArray[2];

			// is this a valid command?
			if(!options[jailOption]) 
			{
				return message.channel.send( `This option current doesn't exists. Option list is coming soon.....` );    
			}

			// if pass, commence the jailing
			jail.displayJailedCanvas( message, member.user, options[jailOption] );
		}
	}
}; 
 