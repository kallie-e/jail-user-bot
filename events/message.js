const globals    = require('../lib/globals');
const jail       = require("../commands/jail");
const jailMsg    = require('../lib/JailRandomPutList');
const options    = require('../lib/JailBarOptions');

function getOptionList() {
	let msg = 
`${globals.i18n.Message.Commands}...
${globals.CmdRemind}
${globals.CmdRemindOption}
${globals.JailCmd} ${globals.Commands.Help}

${globals.i18n.Message.OptionList}...
`;

	for (const key in options) {
	  if( !options[key].hidden ) msg += `${key} - ${options[key].description}\n`;
	}

	return `${msg}${globals.Commands.Random} - ${globals.i18n.Options.Random_Desc}`;
;
}

module.exports = (client, message) => {
	if (message.content.startsWith( globals.JailCmd )) {		
		// what member shall we shove down the rabbit hole today?
		const member   = message.mentions.members.first();
		const msgArray = message.content.split(' ');

		// member check first.  make sure there is a member listed.
		if (member === undefined) 
		{
			// asking for help maybe?
			if(msgArray[1] === globals.Commands.Help) 
			{

				return message.channel.send( getOptionList() );
			} 
			else 
			{
				// if not asking for help, and didn't list a member ... like ... at all .... 

				return message.channel.send( `${globals.i18n.Message.WhoTryingToJail} ${jailMsg.randomJailMessage(jailMsg.PRESENT)}?\n${globals.CmdRemindOption}` );				
			}
		} 
		else if (!member) 
		{
			// tried to list a member, but no idea who ya talkin' about
			return message.channel.send( `${globals.i18n.Message.DontRecognizeMember} ${jailMsg.randomJailMessage(jailMsg.PRESENT)}?\n${globals.CmdRemindOption}` );    
		} 
		else 
		{
			// ok, we got this far.  now let's check the order.  
			// did they put any member name after the cmd? (member name is returned as hash eg. <@0123456789>
			if(msgArray[1].indexOf('@') < 0 ) 
			{
				return message.channel.send( `${globals.i18n.Message.PleaseUseFormat}: ${globals.CmdRemindOption}` );    
			}

			// if the parameter list is empty, assume 'default'
			let jailOption = (msgArray.length < 3) ? globals.Commands.Default : msgArray[2];

			// is this a specilized option?
			if(jailOption === globals.Commands.Random)   
			{
				// convert object to array
				const optionsArray = Object.keys(options);

				// pick a random number based on length
				// use that value to reset the jail option
				jailOption = optionsArray[ Math.floor( Math.random() * optionsArray.length ) ];
			}
			// is this even a valid command?
			else if(!options[jailOption]) 
			{
				return message.channel.send( `${globals.i18n.Message.OptionDoesNotExist}.\n\n${getOptionList()}` );    
			}

			// if pass, commence the jailing
			jail.displayJailedCanvas( message, member.user, options[jailOption] );
		}
	}
}; 
 