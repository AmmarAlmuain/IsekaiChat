import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../database/models/user";

const authPaths = ["/login", "/register"]
const apiAuthPaths = ["/api/auth/login", "/api/auth/register"];

export default defineEventHandler( async (event) => {
  if(authPaths.includes(event.path)) {
    const cookie = parseCookies(event)
    if(cookie.token) {
      event.node.res.statusCode = 302
      event.node.res.setHeader('Location', '/')
      event.node.res.end()
    }
  } else if (apiAuthPaths.includes(event.path)) {
  } else if(event.path.substring(0, 4) == "/api") {
    const token = event.headers.get("token")
    if(token) {
      const user: any = jwt.verify(String(token), String(process.env.jwtSecret))
      if(user) {
        const checkUsername = await User.findOne( { username: user.username } )
        const checkEmail = await User.findOne( { email: user.email } )
        if(checkUsername && checkEmail) {
          event.context.user = user
        } else {
            event.node.res.statusCode = 401
            return "Jwt is outdated!"
        }
      }
    } else {
      event.node.res.statusCode = 401
      return "JWT token is missing or invalid."
    }
  } else {
    const cookie = parseCookies(event)
    if(!cookie.token) {
      event.node.res.statusCode = 302
      event.node.res.setHeader('Location', '/login')
      event.node.res.end()
    }
  }
});
