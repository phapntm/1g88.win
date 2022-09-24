const { WebSocketServer, WebSocket } = require("ws");
const HttpsProxyAgent = require("https-proxy-agent");
const proxy = "http://gate.smartproxy.com:10000";
const originDomain = "wss://chat.1g88.vin";
const WSS = new WebSocketServer({ port: 46578, path: "/chatHub" });
WSS.on("connection", function connection(ws, request) {
  console.log(request.url);
  let agent;
  //   agent = new HttpsProxyAgent(proxy);
  const messageSaveOnNotConnectYet = [];
  const clientWS = new WebSocket(originDomain + request.url, {
    agent,
  });
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
});
