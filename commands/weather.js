const Discord = require('discord.js');
const weather = require('weather-js');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {
  weather.find({
    search: args.join(" "),
    degreeType: 'C'
  }, function(err, result) {
    if (err) console.log(err);
    if (result === undefined || result.length === 0) {
      message.channel.send({
        embed: {
          "description": "**Insira uma cidade**",
          "title": "Erro",
          "color": 0xff2222
        }
      }).then(msg => {
        if (conf[message.guild.id].delete == 'true') {
          msg.delete(conf[message.guild.id].deleteTime);
        }
      });
      return;
    }
    var current = result[0].current;
    var location = result[0].location;
    const embed = new Discord.RichEmbed()
      .setDescription(`**${current.skytext}**`)
      .setAuthor(`Weather for ${current.observationpoint}`)
      .setThumbnail(current.imageUrl)
      .setColor(0x00AE86)
      .addField('Timezone', `UTC${location.timezone}`, true)
      .addField('Tipo de graus', location.degreetype, true)
      .addField('Temperatura', `${current.temperature} Degrees`, true)
      .addField('Sente-se', `${current.feelslike} Degrees`, true)
      .addField('Vento', current.winddisplay, true)
      .addField('Humidade', `${current.humidity}%`, true)
    message.channel.send({
      embed
    });
  })
}