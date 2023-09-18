import User from "~/server/database/models/user"
import jwt from "jsonwebtoken"

export default defineEventHandler( async (event) => {
  const config = useRuntimeConfig()
  const { password } = await readBody(event)
  let { email } = await readBody(event)
  email = email.toLowerCase();
  if (!email) {
    event.node.res.statusCode = 400
    return "You must provide an email address to log in."
  } else if (!password) {
    event.node.res.statusCode = 400
    return "You must provide a password to log in."
  }
  const user: any = await User.findOne({ email });
  if (user) {
    const isPasswordValid = await user.verifyPasswordSync(password);
    if(isPasswordValid) {
      return jwt.sign({ username: user.username, email: user.email, profileImage: user.profileImage || 'defaultProfileImage.jpg' }, config.jwtSecret)
    } else {
      event.node.res.statusCode = 401
      return "Invalid credentials. Please enter a valid email and password."
    }
  } else {
    event.node.res.statusCode = 404
    return "Invalid credentials. Please enter a valid email and password."
  }
})