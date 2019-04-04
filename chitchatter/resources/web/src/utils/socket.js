export const connect = (dispatch, channels) => {
  // PROD
  //const socket = new WebSocket("ws://" + window.location.host + "/ws/" + state.channel);

  const sockets = [];

  for (const channel of channels) {
    const socket = new WebSocket("ws://localhost:8080/ws/" + channel);

    socket.onopen = () => {
      console.log("Succesfully connected to channel: " + channel);
    };

    socket.onclose = () => {
      console.dir("Connection to chat server closed, attempting to reconnect...");
      connect(
        dispatch,
        channels
      );
    };

    socket.onerror = () => {
      console.log("Uh oh... there was an error connected to the chat server");
    };

    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      console.warn(data);
      let message = JSON.parse(event.data);
      console.dir("MESSAGE", message);
    };

    const socketInfo = {
      name: channel,
      socket: socket
    };

    sockets.push(socketInfo);
  }
  return sockets;
};
