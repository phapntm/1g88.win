const { WebSocketServer, WebSocket } = require("ws");
const HttpsProxyAgent = require("https-proxy-agent");
const proxy = "http://gate.smartproxy.com:10000";
const originDomain = "wss://chat.1g88.vin";
const WSS = new WebSocketServer({ port: 46578, path: "/chatHub" });
WSS.on("connection", function connection(ws, request) {
  //   var agent = new HttpsProxyAgent(proxy);
  const messageSaveOnNotConnectYet = [];
  const clientWS = new WebSocket(originDomain + request.url);
  clientWS.on("message", (data) => {
    ws.send(data.toString());
  });
  clientWS.on("error", () => {
    ws.close();
  });
  clientWS.on("close", () => {
    ws.close();
  });
  clientWS.on("open", () => {
    while (messageSaveOnNotConnectYet.length > 0) {
      const message = messageSaveOnNotConnectYet.shift();
      clientWS.send(message);
    }
  });

  ws.on("message", (message) => {
    try {
      if (clientWS.readyState == 0) messageSaveOnNotConnectYet.push(message);
      else clientWS.send(message);
    } catch (error) {
      console.log("error", error);
    }
  });
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
