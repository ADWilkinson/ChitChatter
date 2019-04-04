export const connect = (dispatch, channels) => {
  // PROD
  //const socket = new WebSocket("ws://" + window.location.host + "/ws/" + state.channel);

  const sockets = [];

  for (const channel of channels) {
    const socket = new WebSocket("ws://" + "localhost:8080" + "/ws/" + channel);

    socket.onopen = () => {
      console.log("Succesfully connected to chat server at ws://localhost:8080/ws/" + channel);
    };

    socket.onclose = () => {
      connect(
        dispatch,
        channels
      );
    };

    socket.onerror = () => {
      console.log("Uh oh...");
    };

    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      console.warn(event);
      console.warn(data);
    };

    const socketInfo = {
      name: channel,
      socket: socket
    }

    sockets.push(socketInfo);
  }

  console.warn(sockets);
  return sockets;
};
