import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../database/models/user";
import { useState } from "nuxt/app";

export default defineEventHandler( async (event) => {
  const path = event.path.substring(0, 4),
        clientSide = path != "/api",
        serverSide = path == "/api"

  if(clientSide) {
    const authPaths = ["/login", "/register"],
          authPages = authPaths.includes(event.path),
          token = parseCookies(event).token
    if(authPages && token) {
      setResponseStatus(event, 301)
      setResponseHeader(event, "Location", "/")
      event.node.res.end() 
    }
    if(!authPages && !token) {
      setResponseStatus(event, 301)
      setResponseHeader(event, "Location", "/login")
      event.node.res.end() 
    }

  }

  if(serverSide) {
    const apiAuthPaths = ["/api/auth/login", "/api/auth/register"],
          apiUnsecuredPath = ["/api/post/entirely"],
          authApis = apiAuthPaths.includes(event.path),
          unsecuredApis = apiUnsecuredPath.includes(event.path)
    if(!authApis && !unsecuredApis) {
      const token = getRequestHeader(event, "token")
      if(!token) {
        setResponseStatus(event, 401)
        return "JWT token is missing or invalid."
      }
      try {
        const { userId } = jwt.verify(String(token), String(process.env.jwtSecret)) as JwtPayload
        const user = await User.findOne( { _id: userId } ).select('-password');
        if(!user) {
          setResponseStatus(event, 401)
          return "Jwt is outdated!"
        }
        event.context.user = user
      } catch(error) {
        return error
      }
    }

  }

});
