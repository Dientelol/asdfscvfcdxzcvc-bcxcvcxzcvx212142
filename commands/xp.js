const Discord = require('discord.js');
var db = require('quick.db'); //Database lib
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {
  
  const points = new db.table('POINTS');
  const levels = new db.table('LEVELS');
  const xp = new db.table('TOTAL_POINTS');
  
  points.fetch(`${message.guild.id}_${message.author.id}`, {"target": ".data"}).then(pnts => {
    levels.fetch(`${message.guild.id}_${message.author.id}`, {"target": ".data"}).then(lvl => {
      xp.fetch(`${message.guild.id}_${message.author.id}`, {"target": ".data"}).then(x => {
      var xpReq = lvl * 300 - pnts;
      
      if (xpReq <= 0) xpReq = 0; 
  
      var embed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTitle("XP | Nível")
        .addField("XP", pnts, true)
        .addField("Nível", lvl, true)
        .addField("Pontos necessários para o próximo nível: ", xpReq, false)
        .setFooter("XP total: " + x);
  
        message.channel.send(embed).then(msg => {
        if (conf[message.guild.id].delete == 'true') {
          msg.delete(conf[message.guild.id].deleteTime);
        }
      });
    });
  });
  });
  
}