const { WebSocketServer, WebSocket } = require("ws");
const proxy = "";
const WSS = new WebSocketServer({ port: 46578, path: "/chatHub" });
// WSS.on("connection", function connection(ws, request) {
//   ws.on("message", function message(data) {
//     console.log("received: %s", data);
//   });

//   ws.send("something");
//   console.log("url: ", request.url);
//   //   const clientWS = new WebSocket("ws://www.host.com/path");
// });
const url = require("url");
WSS.on("connection", function connection(ws, request) {
  //   var agent = new HttpsProxyAgent("http://gate.smartproxy.com:10000");
  const accessToken = request.url.split("=")[1];
  console.log(accessToken);
  //   const urlWs = `wss://chat.herransmap.info/chatHub?access_token=${accessToken}`;
  //   const messageSub = `{"protocol":"json","version":1}`;
  //   let   messageDelay =[];
  //   const wsClient = new WebSocket(urlWs, {agent });
  //   wsClient.on("open", function open() {
  //     console.log("Socket Connected");
  //     console.log("messageDelay", messageDelay.length);
  //     wsClient.send(messageSub);
  //   });
  //   wsClient.on("message", function message(data) {
  //     //console.log(data.toString());
  //     ws.send(
  //       data
  //         .toString()
  //         .replace("tai88vin.link", "88vin.in")
  //         .replace("tai88vin.link", "88vin.in")
  //     );
  //   });

  //   // on error
  //   wsClient.on("error", (error) => {
  //     console.log('wsClientError',error)
  //     ws.terminate();
  //   });

  //   // on client diss connect
  //   ws.on("close", () => {
  //     wsClient.close();
  //   });

  //   // wsClient error

  //   // on user client send message

  //   ws.on("message", (message) => {
  //     try {
  //       wsClient.send(message.toString());
  //     } catch (error) {
  //       console.log('error',error);
  //       messageDelay.push([message.toString()]);
  //     }
  //   });
});
