module.exports = {
	// main command
	JailCmd : '!jail', 

	// default command reminder
	CmdRemind : `!jail @<user>`, 

	// default command reminder
	CmdRemindOption : `!jail @<user> <option>`, 

	// image folder location
	// NOTE: use the "notes-to-me" in KE server channel to upload
	ImageFolder : 'https://cdn.discordapp.com/attachments/', 

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