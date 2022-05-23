exports.run = (client, msg, args) => {
  msg.reply(`${client.ws.ping}ms`);
};

exports.name = "ping";
