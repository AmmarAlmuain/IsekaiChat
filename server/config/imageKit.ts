import ImageKit from "imagekit";

const config = useRuntimeConfig()

const imagekitServer = new ImageKit({
  publicKey: config.imageKitPublicKey,
  privateKey: config.imageKitPrivateKey,
  urlEndpoint: config.imageKitUrlEndpoint
});

export default imagekitServer
