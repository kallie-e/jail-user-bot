const jail = require("../commands/jail");

module.exports = (client, message) => {
	if (message.content.startsWith('!jail')) {
		return jail(message);
	}
}; 
 