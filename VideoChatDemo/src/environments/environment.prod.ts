export const environment = {
  production: true,
  wsEndpoint: 'wss://www.chop.click:4444/ws/',
  RTCPeerConfiguration: {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302'
      }
    ]
  }
};
