const WebSocket = require("ws");
const proxy = "";
const WSS = new WebSocket({ port: 46578, pathname: "/chatHub" });
WSS.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");

  //   const clientWS = new WebSocket("ws://www.host.com/path");
});
