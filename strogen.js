const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("ODEyNzM0OTY3NDE4MTkxOTIz.YDFEbA.DJcj2pJ3IAogRTHXRJORhFZZJX4");
const fetch = require("node-fetch");
const fs = require("fs");
require("express")().listen(1343);

//UPTİME

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log("Pinglenmedi.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//OYNUYOR KISMI

client.on("ready", () => {
  console.log("Star Code - Bot Aktif");
  let playing = client.voice.connections.size;

  client.user.setPresence({
    activity: {
      name: "Star Uptime",
      type: "WATCHING",
      url: "URL"
    }
  });
});

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pinglendi.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});



const help = new discord.MessageEmbed()
.setFooter("Star Code - Uptime Altyapısı v12")
.setColor("Blue")
.setDescription(`
**Merhaba dostum botunu 7/24 aktif tutmak için doğru yerdesin.**

\`!ekle\` : **Projenizi 7/24 Aktif Tutar.**

\`!göster\` : **Sistemde Kaç Tane Bot Aktif Tuttuğunu Gösterir.**

**__Not : Lütfen \`!ekle\` Komutunu Dm'den Kullanınız.__**
**__Aksi Taktirde Botunuzun Tokeni Çalınmasından Biz Sorumlu Değiliz.__**

**Youtube :** \`Strogen\` `)








client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!ekle") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
             return message.channel.send(new discord.MessageEmbed().setFooter("Star Code - Uptime").setColor("RED").setDescription("Projeniz Sistemimizde Zaten Var"));
        message.channel.send(new discord.MessageEmbed().setFooter("Star Code - Uptime").setColor("RED").setDescription("Projeniz Sistemimize Başarıyla Eklendi."));
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        return message.channel.send(new discord.MessageEmbed().setFooter("Star Code - Uptime").setColor("RED").setDescription("Lütfen Bir Link Giriniz"));
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!göster") {
    var link = spl[1];
    message.channel.send(new discord.MessageEmbed().setFooter("Star Code - Uptime").setColor("RED").setDescription(`${db.get("linkler").length} Proje Aktif Tutuluyor!`));
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "-yardım") {
    var link = spl[1];
    message.channel.send(help);
  }
});
