const Discord = require('discord.js');
const client = new Discord.Client();
const file  = require('fs');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var PlayerCount = -1;
var Players = [];

client.on('message', async msg => {

  if(msg.content === "k"){
    //  const connection = await message.member.voice.channel.join();
    //  const dispatcher = connection.play('test.mp3');
     await msg.member.voice.channel.leave();
      
    }
  if(msg.content === "j"){
    msg.member.voice.channel.join().then(connection => {
      connection.play('C:/Users/PuzoNN/Desktop/cpnode/test.mp3', { volume: 0.5 })
});
  }

  if(msg.content === "pass"){
    PlayerCount ++;
    var pp = {name:msg.author.username, health: 100};
    Players.push(pp);
    msg.channel.send(Players[PlayerCount].name + Players[PlayerCount].health);
  }
  if(msg.content === "ss")
  {
    for(var i=0;i<PlayerCount;i++)
    {
     file.write("datas.txt",Players[i].name);
    }
  }
  function rnd(max, min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});

client.login('Nzk1NzU1NzIxOTExNTY2MzY2.X_N_RA.ngqL-I1LZU7AxBQZSJmbuHvuwJs');