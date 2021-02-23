const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const fs = require('fs');
var bones = require('./bgame');
const { send } = require('process');
const { FORMERR } = require('dns');

 // When ready tell me 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`); 
  client.user.setActivity("yo yo yo");
});
let voiceChannel;
let dispatcher;
var repeat = false;
class DiceGame
{
  constructor(playername,n1,n2,n3,n4,n5,one,two,three,four,five,six,score,chance,xxx,xxxx,full,small,big,general)///*,n3,onexxx,xxxx,chance,full,smallstrit,bigstrit,capitan*/)
  {
   this.playername = playername;
   this.n1=n1;
   this.n2=n2;
   this.n3=n3;
   this.n4=n4;
   this.n5=n5;
   this.one = one;
   this.two = two;
   this.three = three;
   this.four = four;
   this.five= five;
   this.six = six;
   this.score = score;
   this.chance = chance;
   this.xxx = xxx;
   this.xxxx = xxxx;
   this.full= full;
   this.small = small;
   this.big = big;
   this.general = general;
  }
}
var _PlayerCount = 0;
var order = -1;
var player = [];
let rd=0;
client.on('message', async msg =>
{ 
function Send(Data){msg.channel.send(Data)}
var command = msg.content;                                        
function AddPlayer(){player.push(new DiceGame(msg.author.username,0,0,0,0,0,false,false,false,false,false,false,0,false,false,false,false,false,false,false));}
function NextTurn()
{
  if(rd ==13){return Restart();}
  order++;
  if(order == 2){order= 0}
  roll();
  EmbedDice();
  rd++;
}
function roll()
{
  player[order].n1 = rnd(1,6); player[order].n2 = rnd(1,6); player[order].n3 = rnd(1,6); player[order].n4 = rnd(1,6); player[order].n5 = rnd(1,6);
}
function EmbedDice()
{
  var Embed = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle("**"+player[order].playername+"**"+" Score: "+player[order].score)
  .addFields
  (
    {name: "Jedynki",value: player[order].one ,inline:true},
    {name: "Dwójki",value: player[order].two , inline:true},
    {name: "Trójki",value: player[order].three , inline:true},
    {name: "Czwrórki",value: player[order].four , inline:true},
    {name: "Piątki",value: player[order].five , inline:true},
    {name: "Szóstki",value: player[order].six , inline:true},
    {name:"============================", value:"\u200B"}, // '\u200B' make space
    {name:"3 jednakowe ",value: player[order].xxx,inline:true},
    {name:"4 jednakowe ",value: player[order].xxxx ,inline:true},
    {name:"Mały strit ",value: player[order].small ,inline:true},
    {name:"Duży strit ",value: player[order].big ,inline:true},
    {name:"Generał ",value: player[order].general ,inline:true},
    {name:"Szansa ",value: player[order].chance ,inline:true},
    {name:"============================", value:"\u200B"},
    {name:player[0].playername+" Points: " +player[0].score, value:"\u200B"},
    {name:player[1].playername+" Points: " +player[1].score, value:"\u200B"},
  )
  .addFields(
    {name:"============================", value:"\u200B"},
    {name: "          ** It's "+player[order].playername+" turn! **", value: "\u200B"},
    {name: "            **"+player[order].playername +
    " Rolled: "+player[order].n1+" "+player[order].n2+" "+player[order].n3+" "+player[order].n4+" "+player[order].n5+" "+"**", value: "\u200B"},);
  return msg.channel.send(Embed)
}
function Restart()
{
  player = [];
  _PlayerCount=0;
  order = -1;
  rd=0;
}
function CheckNumer(x) // Check if the same 
{
  let b=0;
   if(player[order].n1== x)
   {
    b++;
   }
   if(player[order].n2== x)
   {
    b++;
   }
   if(player[order].n3== x)
   {
    b++;
   }
   if(player[order].n4== x)
   {
    b++;
   }
   if(player[order].n5== x)
   {
    b++;
   }
   return b;
}
if(command == 'r')
{
  if(_PlayerCount == 0) {AddPlayer(); Send(msg.author.username+" Joined to the game")}
  if(_PlayerCount == 1) {AddPlayer(); Send(msg.author.username+" Joined to the game. All players ready !"); NextTurn();}
  if(_PlayerCount == 2) {return Send("Max players" + player.length)}
  _PlayerCount++;
}
if(command.includes("k"))
{
 
  let fixed = command.substring(2);
  if(msg.author.username != player[order].playername) { return Send("Its not your turn!")}
  let ns = false;
  switch(fixed)
  {
    case 'one':
      {
        if(player[order].one ==true){return ns = true;}
        player[order].one = true;
        player[order].score +=  CheckNumer(1) * 1;
        break;
      }
    case 'two':
      {
        if(player[order].two ==true){return ns = true;}
        player[order].two = true;
        player[order].score +=  CheckNumer(2) *2;
        break;
      }
    case 'three':
      {
        if(player[order].three ==true){return ns = true;}
        player[order].three = true;
        player[order].score +=  CheckNumer(3) *3;
        break;
      }
    case 'four':
      {
        if(player[order].four ==true){return ns = true;}
        player[order].four = true;
        player[order].score +=  CheckNumer(4) *4;
        break;
      }
     case 'five':
       {
        if(player[order].five ==true){return ns = true;}
        player[order].five = true;
        player[order].score +=  CheckNumer(5) *5;
        break;
       }
     case 'six':
       {
        if(player[order].six ==true){return ns = true;}
        player[order].six = true;
        player[order].score +=  CheckNumer(6) *6;
        break;
       }
    case 'xxx':
       {
        if(player[order].xxx ==true){return ns = true;}
        player[order].xxx = true;
          for(var i =1;i<7;i++)
          {
            let x = CheckNumer(i)
            if(x >= 3)
            {
              player[order].score += parseInt(player[order].n1+player[order].n2+player[order].n3+player[order].n4+player[order].n5) ;
              break;
            }
            else{ }
          }
          break;
       }
     case 'xxxx':
       {
        if(player[order].xxxx ==true){return ns = true;}
        player[order].xxxx = true;
          for(var i =1;i<7;i++)
          {
            let x = CheckNumer(i)
            if(x >= 4)
            {
              player[order].score += parseInt(player[order].n1+player[order].n2+player[order].n3+player[order].n4+player[order].n5) ;
              break;
            }
            else{ }
          }
          break;
       }
      case 'full':
        {
          if(player[order].full ==true){return ns = true;}
          player[order].full = true;
          let NumberX =0;
          let NumberY =0;
          for(var i =1;i<7;i++)
          {
            let x = CheckNumer(i)
            console.log("x"+i);
            if(x == 3)
            {
                NumberX = i
                console.log("x pass")
                break;
            }
          }
          for(var i=1;i<7;i++)
          {
            if (i == NumberX){i++}
            let y = CheckNumer(i)
            console.log("y"+i);
            if(y ==2)
            {
              NumberY = i;
              console.log("y pass")
              break;
            }
          }
          if(NumberX >0 && NumberY >0){ player[order].score += 25;}
          break;
        }
      case 'small':
        {
          if(player[order].small ==true){return ns = true;}
          player[order].small =true
          let y=0;
          let x=1;
          for(var i =1;i<7;i++)
          {
            let a = CheckNumer(i);
            if(a >0)
            {
              y++;
            }
          }
          if(y >= 4)
          {
            player[order].score +=30;
          }
          console.log(y);
          break;          
        }
      case 'big':
        {
          if(player[order].big ==true){return ns = true;}
          player[order].big =true
          let y=0;
          let x=1;
          for(var i =1;i<7;i++)
          {
            let a = CheckNumer(i);
            if(a >0)
            {
              y++;
            }
          }
          if(y > 4)
          {
            player[order].score +=40;
          }
          console.log(y);
          break;          
        }
      case 'chance':
        {
          if(player[order].chance ==true){return ns = true;}
          player[order].chance =true;
          player[order].score +=  50;
        }
      case 'general':
        {
          if(player[order].general ==true){return ns = true;}
          player[order].general =true;
          for(var i =1;i<7;i++)
          {
            let x = CheckNumer(i);
            if(x ==5)
            {
              player[order].score +=  player[order].n1+player[order].n2+player[order].n3+player[order].n4+player[order].n5;
            }
          }
        }
      default: ns = true; break;
  }
  
  if(ns == false){return NextTurn();}
}

if(command =='full')
{
  player[order].n1 = 1;
  player[order].n2 = 2;
  player[order].n3 = 3;
  player[order].n4 = 4;
  player[order].n5 = 5;

}
});
client.login('');

function rnd(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
