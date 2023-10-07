import imagekitServer from "~/server/config/imageKit";

export default defineEventHandler( async (event ) => {
  const authenticationParameters = imagekitServer.getAuthenticationParameters();
  return authenticationParameters
})