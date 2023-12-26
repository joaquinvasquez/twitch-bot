const tmi = require("tmi.js");
require("dotenv").config();

const options = {
  identity: {
    username: "joaccovas",
    password: process.env.CLIENT_TOKEN,
  },
  channels: ["joaccovas"],
};

const onConnectHandler = (addr, port) => {
  console.log(`Connected to ${addr}:${port}`);
};

const onMessageHandler = (target, context, msg, self) => {
  // console.log(context);
  if (self) return;
  //COMANDOS CHAT

  //!bot
  if (msg === "!bot")
    client.say(target, `Hola @${context.username}! Pa los giles rafagazo 🔪`);

  //Mensaje bienvenida
  if (context["first-msg"])
    client.say(target, `Bienvenido al chat @${context.username} Hacete amigx!`);

  //Mensajes míos
  if (context.username === "joaccovas") {
    //Repetir mensaje x10
    if (msg.slice(-3) === "!10") {
      const text = msg.slice(0, -3);
      for (let i = 0; i < 10; i++) {
        client.say(target, text);
      }
    }

    //Repetir mensaje X veces
    if (msg.includes("reps:")) {
      const reps = parseInt(msg.substring(msg.indexOf("reps:") + 5));
      const text = msg.slice(0, msg.indexOf(" reps:"));
      for (let i = 0; i < reps; i++) {
        client.say(target, text);
      }
    }
  }
};

const client = new tmi.client(options);
client.on("connected", onConnectHandler);
client.on("message", onMessageHandler);

client.connect();
