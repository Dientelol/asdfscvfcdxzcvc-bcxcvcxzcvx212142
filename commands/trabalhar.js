const discord = require('discord.js')
const db = require('quick.db')
const send = require('quick.hook')
var currencyFormatter = require('currency-formatter')
var ms = require('parse-ms');

module.exports.run= async (bot, message, args) => {
  
  try {
    let worklog = bot.channels.get('566363281757831178') // MODIFY - This is used to log any work processed & if failed logged as well.
    let cooldown = 0; //8 Hours in ms
    let amount = Math.floor((Math.random() * 100) + 100); // Cost
    let workplace = ["Carteiro", "", "Restaurant", "Market", "Security", "ICT"] // Different outputs match below, from 0 to 5 with an included error system.
    let workDaily = await db.fetch(`workDaily_${message.author.id}`) // Used for fetching the time on when work is available.
    let result = Math.floor((Math.random() * workplace.length))
    let timeObj = ms(cooldown - (Date.now() - workDaily))
    
    let workEmbed = new discord.RichEmbed()
    .setDescription(`**${message.author.tag}** Started working and got payed ${currencyFormatter.format(amount, { code: 'EURO' })}`)
    .setColor(`GREEN`)

    let dailytEmbed = new discord.RichEmbed()
    .setDescription(`${message.author.tag} Trying to work but it's on cooldown! Time Left: **${timeObj.hours}h, ${timeObj.minutes}m, and ${timeObj.seconds}s**`)
    .setColor(`RED`)

    
    try {
    db.fetch(`userBalance_${message.author.id}`).then(rm => { // MODIFY - This checks your account to see if your account has a valid amount
    if(rm == null || 0){
        db.set(`userBalance_${message.author.id}`, 50)} // MODIFY - This wipes any data & updates the account if it isn't a valid number

    else if (workDaily !== null && cooldown - (Date.now() - workDaily) > 0) {
        

        let workDailyEmbed = new discord.RichEmbed()
        .setAuthor(`Você ainda não pode trabalhar!`, message.author.displayAvatarURL)
        .setColor(`BLUE`)
        .setDescription(`**${message.author.username}**, você já trabalhou durante 6 horas!\nVocê precisa descançar durante **${timeObj.hours}h, ${timeObj.minutes}m**`)
        message.channel.send(workDailyEmbed)
      send(worklog, dailytEmbed, {
          name: "Manager",
          icon: "https://pbs.twimg.com/profile_images/518086933218467840/aMuhHjnl_400x400.jpeg"
      })
    } else if (`${result}` == "0"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`userBalance_${message.author.id}`, amount).then(i => { // Primeiro trabalho -> Carteiro
            var discord = require('discord.js')
            let dailyEmbed = new discord.RichEmbed()
            .setAuthor(`${message.author.tag} Finished Accounting`, message.author.displayAvatarURL)
            .setColor(`ORANGE`)
            .addField(`You've been payed for your shift,`, `The Manager Paid You: ${currencyFormatter.format(amount, { code: 'USD' })}`)
            message.channel.send(dailyEmbed)
            send(worklog, workEmbed, {
                name: "Manager",
                icon: "https://pbs.twimg.com/profile_images/518086933218467840/aMuhHjnl_400x400.jpeg"
            })
        })}
    else if (`${result}` == "1"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`userBalance_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            let dailyEmbed = new discord.RichEmbed()
            .setAuthor(`${message.author.tag} Sold A Lot Of Clothes`, message.author.displayAvatarURL)
            .setColor(`#FFFFCC`)
            .addField(`You've been payed for your shift,`, `The Manager Paid You: ${currencyFormatter.format(amount, { code: 'USD' })}`)
            message.channel.send(dailyEmbed)
            send(worklog, workEmbed, {
                name: "Manager",
                icon: "https://pbs.twimg.com/profile_images/518086933218467840/aMuhHjnl_400x400.jpeg"
            })
        })}
    else if (`${result}` == "2"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`userBalance_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            let dailyEmbed = new discord.RichEmbed()
            .setAuthor(`${message.author.tag} Finished Cooking & Cleaning`, message.author.displayAvatarURL)
            .setColor(`RED`)
            .addField(`You've been payed for your shift,`, `The Manager Paid You: ${currencyFormatter.format(amount, { code: 'USD' })}`)
            message.channel.send(dailyEmbed)
            send(worklog, workEmbed, {
                name: "Manager",
                icon: "https://pbs.twimg.com/profile_images/518086933218467840/aMuhHjnl_400x400.jpeg"
            })
        })}
    else if (`${result}` == "3"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`userBalance_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            let dailyEmbed = new discord.RichEmbed()
            .setAuthor(`${message.author.tag} Sold A Few Melons`, message.author.displayAvatarURL)
            .setColor(`RED`)
            .addField(`You've been payed for your shift,`, `The Manager Paid You: ${currencyFormatter.format(amount, { code: 'USD' })}`)
            message.channel.send(dailyEmbed)
            send(worklog, workEmbed, {
                name: "Manager",
                icon: "https://pbs.twimg.com/profile_images/518086933218467840/aMuhHjnl_400x400.jpeg"
            })
        })}
    else if (`${result}` == "4"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`userBalance_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            let dailyEmbed = new discord.RichEmbed()
            .setAuthor(`${message.author.tag} Finshed Protecting People`, message.author.displayAvatarURL)
            .setColor(`BLACK`)
            .addField(`You've been payed for your shift,`, `The Manager Paid You: ${currencyFormatter.format(amount, { code: 'USD' })}`)
            message.channel.send(dailyEmbed)
            send(worklog, workEmbed, {
                name: "Manager",
                icon: "https://pbs.twimg.com/profile_images/518086933218467840/aMuhHjnl_400x400.jpeg"
            })
        })}
    else if (`${result}` == "5"){
        db.set(`workDaily_${message.author.id}`, Date.now());
        db.add(`userBalance_${message.author.id}`, amount).then(i => { // MODIFY - This updates your account to add the amount earned
            var discord = require('discord.js')
            let dailyEmbed = new discord.RichEmbed()
            .setAuthor(`${message.author.tag} Just Crushed Some Coding Bugs`, message.author.displayAvatarURL)
            .setColor(`AQUA`)
            .addField(`You've been payed for your shift,`, `The Manager Paid You: ${currencyFormatter.format(amount, { code: 'USD' })}`)
            message.channel.send(dailyEmbed)
          send(worklog, workEmbed, {
              name: "Manager",
              icon: "https://pbs.twimg.com/profile_images/518086933218467840/aMuhHjnl_400x400.jpeg"
          })
        })}
    else {
        message.channel.send(`Oof.. you've hit a massive error. Please send a report in, \`-!support <work> <error>\``)
        console.log(result)
    }
    })} catch(err) {console.log(err)}
    } catch(err) {console.log(`Error with work \n${err}`)}
}