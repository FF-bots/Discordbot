const Discord = require ('discord.js');
const Twit = require ('twit');
require('dotenv').config();

const client = new Discord.Client({
    partials:['MESSAGE','REACTION','USER'] 
});

const T = new Twit({
    consumer_key: process.env.API_key,
    consumer_secret: process.env.API_secretkey,
    access_token: process.env.Access_token,
    access_token_secret: process.env.Access_token_secret,
    bearer_token: process.env.Bearertoken,
    timeout_ms: 60*1000,
});

const canalTwitter = '819336004561141811';

const stream = T.stream('statuses/filter',{
    follow:'32771325',//StupidCounter
});

//[]

init();

function init(){
    client.on('ready', ()=>{
        console.log("Bot is ready");
    });
    
    client.login(process.env.BOT_TOKEN);
    
    client.on('message', (msg)=>{
        if(msg.content === 'Hello') msg.reply('Hi');
        if(msg.content === '-papielon'){
            activarTwitter();
        }
    });
    
    

}

function activarCambioRol(){
    client.on('messageReactionAdd', async (reaction, user)=>{
        try{
        if (reaction.message.partial) await reaction.message.fetch();
        if(reaction.partial) await reaction.fetch();
        if(user.bot) return;
        if(!reaction.message.guild) return;
    
    
        if(reaction.message.channel.id = '819317740556255242'){
    
            if (reaction.emoji.name === '🐝'){
                try{
               await  reaction.message.guild.members.cache
               .get(user.id)
               .roles.add('819315729400332319');
            }
            catch(error){
                console.log(error);
            }
            }
            
        }else return;
    }
        catch{}
        
    });


client.on('messageReactionRemove', async (reaction, user)=>{
    
    if (reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if(reaction.message.channel.id = '819317740556255242'){
        if (reaction.emoji.name === '🐝'){
        try{
            await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove('819315729400332319')
        }
        catch(error){

        }
    }
    }
});

}


function activarTwitter(){
    stream.on('tweet', (tweet)=>{
        const twitterMessage = `Leete este alto twit de ${tweet.user.name} de (@${tweet.user.screen_name}) aca: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
        client.channels.cache.get(canalTwitter).send(twitterMessage);
        return;
    })

}
