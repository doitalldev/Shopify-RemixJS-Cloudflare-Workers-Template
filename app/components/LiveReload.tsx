export const LiveReload =
  process.env.NODE_ENV !== "development"
    ? () => null
    : function LiveReload({
        port = Number(process.env.REMIX_DEV_SERVER_WS_PORT || 8002),
      }: {
        port?: number;
      }) {
        let setupLiveReload = ((port: number) => {
          let protocol = location.protocol === "https:" ? "wss:" : "ws:";
          let host = location.hostname;
          let socketPath = `${protocol}//${host}:${port}/socket`;

          let ws = new WebSocket(socketPath);
          ws.onmessage = (message) => {
            let event = JSON.parse(message.data);
            if (event.type === "LOG") {
              console.log(event.message);
            }
            if (event.type === "RELOAD") {
              console.log("💿 Reloading window ...");
              window.location.reload();
            }
          };
          ws.onerror = (error) => {
            console.log("Remix dev asset server web socket error:");
            console.error(error);
          };
        }).toString();

        return (
          <script
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `(${setupLiveReload})(${JSON.stringify(port)})`,
            }}
          />
        );
      };
