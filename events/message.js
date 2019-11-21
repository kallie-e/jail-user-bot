const globals    = require('../lib/globals');
const jail       = require("../commands/jail");
const jailMsg    = require('../lib/JailRandomPutList');

module.exports = (client, message) => {
	if (message.content.startsWith( globals.JAIL_CMD )) {		
		// what member shall we shove down the rabbit hole today?
		// TODO .. errrrr .... nm on [1]user thing .... so .. uh .... look at message and what all avaialbe. how da heck do i find options????
		// or enforce order for that maater......
		const member = message.mentions.members.first();
		
		// member check first.  make sure there is a member listed.
		if (member === undefined) 
		{
			// didn't list a member ... like ... at all .... 
			return message.reply( `Who are you trying to ${jailMsg.randomJailMessage(jailMsg.PRESENT)}? You must mention a member of this server.\n${globals.CMD_REMIND}` );
		} 
		else if (!member) 
		{
			// tried to list a member, but no idea who ya talkin' about
			return message.reply( `I don't recognize that member. Who are you trying to ${jailMsg.randomJailMessage(jailMsg.PRESENT)}?\n${globals.CMD_REMIND}` );    
		} 
		else 
		{
			// if pass, commence the jailing
			jail.displayJailedCanvas( message, member.user, 'jailuser-default.png' );
		}
	}
}; 
 