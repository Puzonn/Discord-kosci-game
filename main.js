const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const fs = require('fs');
var bones = require('./bgame');

 // When ready tell me 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`); 
  client.user.setActivity("yo yo yo");
});
let voiceChannel;
let dispatcher;
var repeat = false;

class Player{
  constructor(name,money){
    this.name=name;
    this.money=money;

  }
}
class DiceGame
{
  constructor(playername,n1,n2)///*,n3,one,two,three,four,five,six,xxx,xxxx,chance,full,smallstrit,bigstrit,capitan*/)
  {
  this.playername = playername;
   this.n1=n1;
   this.n2=n2;
 /*  this.n3=n3;
   this.one = one;
   this.two = two;
   this.three = three;
   this.four = four;
   this.five= five;
   this.six = six;
   this.chance = chance;
   this.xxx= xxx;
   this.xxxx = xxxx;
   this.full = full;
   this.smallstrit = smallstrit;
   this.bigstrit = bigstrit;
   this.captian = capitan;*/
  }
}
const _player = [];
var P1Player;
var P2Player;
var GamePlayersCount =0;
var order = 0;
client.on('message', async msg => { // Send message
  if(msg.content === "r i")
  {
    if(GamePlayersCount ==0){
      P1Player = new DiceGame(msg.author.username,0,0);
      GamePlayersCount ++;
      msg.reply(" Joinned to the game")
    }
    else if (GamePlayersCount ==1){ GamePlayersCount++; P2Player = new DiceGame(msg.author.username,0,0);msg.reply(" Joined, Game is ready") }
    else {return msg.channel.send("Max players joinned to the game already!");}
 
  }

 if(msg.content.startsWith(">j"))
 {
    voiceChannel = msg.member.voice.channel;
    msg.delete();
    var path = msg.content.substring(3);
    if(path == "rushia"){path="https://www.youtube.com/watch?v=CdnjygHpi-Q&ab_channel=AnJing";}
    if(!msg.member.voice.channel) {return msg.reply("Join voice channel first !") }
      PlayAudio(path);
      path = null;
    }
if(msg.content === ">pause" || msg.content ==="p")
{
  return dispatcher.pause();
}
if(msg.content ===">resume" || msg.content ==="r")
{
  return dispatcher.resume();
}
if(msg.content === ">repeat on"|| msg.content === "r on")
{
  repeat = true;
  return msg.channel.send("Repeat on" || msg.content === "r off")
}

if(msg.content.includes(">roll"))
{
  if(order == 0 && P1Player.playername == msg.author.username)
  {
    let array = []
    for(var i=0;i<3;i++)
    {
      array.push(rnd(1,6));
    }
    msg.reply(" Rolled: "+array[0]+" "+array[1]+" "+array[2])
    order++;
    return;
  }
  if(order == 1 && P2Player.playername == msg.author.username)
  {
    let array = []
    for(var i=0;i<3;i++)
    {
      array.push(rnd(1,6));
    }
    msg.reply(" Rolled: "+array[0]+" "+array[1]+" "+array[2])
    order--;
    return;
  }

  else{return msg.reply(" Its not your turn!")}
    
}


if(msg.content ==="em"){EmbedDice();}
function EmbedDice()
{
  var Embed = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle(msg.author.username)
  .addFields
  (
    {name: "Jedynki",inline:true},
    {name: "Dwójki", inline:true},
    {name: "Trójki", inline:true},
    {name: "Czwrórki", inline:true},
    {name: "Piątki", inline:true},
    {name: "Szóstki", inline:true},
    {name:"============================", value:"\u200B"}, // '\u200B' make space
    {name:"3 jednakowe ",inline:true},
    {name:"4 jednakowe ",inline:true},
    {name:"Mały strit ",inline:true},
    {name:"Duży strit ",inline:true},
    {name:"Generał ",inline:true},
    {name:"Szansa ",inline:true}

  );

  return msg.channel.send(Embed)
}



if(msg.content ==="y con")  // Make an api to yande.re 
{
  var request = new XMLHttpRequest()
  request.open('GET', 'https://yande.re/post.xml?limit=1', true)
  request.onload = function () {
    console.log("yaa");
  }
}

else if (msg.content ===">repeat off"){ repeat =false; return msg.channel.send("Repeat off")}

function Send(Data){
  msg.channel.send(Data);
}
});
client.login('Nzk1NzU1NzIxOTExNTY2MzY2.X_N_RA.ngqL-I1LZU7AxBQZSJmbuHvuwJs');

function PlayAudio(path)    // Play audio using ffmpg and @optus
{
  var fixedpath = path;
    voiceChannel.join().then(connection => 
   { 
      dispatcher = connection.play(ytdl(path, {volume: 0.001}));
      if(repeat == true){
        dispatcher.on('finish', end => {PlayAudio(fixedpath)});
        console.log("r true");
      }
      else{console.log("r false");}
    })
}
function Save()                             // Still shit not working
{
  let a=0;
  try
  {
    for(var i=0;i<_player.length;i++)
    {
      console.log(_player[a].name)
      fs.writev("data.txt", _player[a].name, function(err){
        if(err) console.log(err);
       
      });
      
    }
  }
  catch(err){console.log(err);}
}
function rnd(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}