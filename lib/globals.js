module.exports = {
	// main command
	JailCmd : '!jail', 

	// default command reminder
	CmdRemind : `!jail @<user>`, 

	// default command reminder
	CmdRemindOption : `!jail @<user> <option>`, 

	// URLs
	DiscordInvite : 'https://discord.gg/9RZXnJ3', 

	// Non-Option, Non-Jailing Commands
	Commands : {
		'Help' : 'help', 
		'Default' : 'default', 
		'Random' : 'random', 
	}, 

	// internationalize
	i18n : require( '../i18n/en-US' ),  
};