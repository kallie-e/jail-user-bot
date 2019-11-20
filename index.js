// read env file
require('dotenv').config();

// create discord client
const Discord = require('discord.js');
const client = new Discord.Client();

// The fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions.
// in short, allows me to separate events into their own files in the events folder
const fs = require('fs');

// each file in the events folder represents actions taken on events
// the following will loops thru the events folder.  each file name
// is the event name, and the contents is the action taken on the event
fs.readdir("./events/", (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  });
});

// login, lez git dis started! XD
client.login(process.env.BOT_TOKEN);
