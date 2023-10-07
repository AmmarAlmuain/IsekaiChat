import jwt from "jsonwebtoken"
import User from "~/server/database/models/user"

export default defineEventHandler( async (event) => {
  const config = useRuntimeConfig()
  const { password } = await readBody(event)
  let { email } = await readBody(event)
  email = email.toLowerCase();
  if (!email || !password) {
    setResponseStatus(event, 400)
    return "You must provide an email and password to log in."
  }
  const user: any = await User.findOne({ email });
  if (!user) {
    setResponseStatus(event, 401)
    return "Invalid credentials. Please enter a valid email and password."
  }
  const isPasswordValid = await user.verifyPasswordSync(password);
  if(!isPasswordValid) {
    setResponseStatus(event, 401)
    return "Invalid credentials. Please enter a valid email and password."
  }
  return jwt.sign({ userId: user._id}, config.jwtSecret)
})