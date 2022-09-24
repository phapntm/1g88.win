const { WebSocket } = require("ws");
const proxy = "";
const WSS = new WebSocket.Server({ port: 46578, path: "/chatHub" });
WSS.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
  console.log("connected");
  //   const clientWS = new WebSocket("ws://www.host.com/path");
});
