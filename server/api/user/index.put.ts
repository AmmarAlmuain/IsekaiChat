import User from "~/server/database/models/user";
import Joi from "joi";
import _ from "lodash";
import jwt from "jsonwebtoken";

const VUser = Joi.object({
  username: Joi.string().min(3).max(15),
  email: Joi.string().max(256).email(),
  password: Joi.string().min(8).max(32).pattern(new RegExp('^[a-zA-Z0-9.!@#]{8,32}$')).message('Your password is too weak.')
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event);
  if(body.email) {
    body.email = body.email.toLowerCase()
  }
  const bodyForValidation = _.omit(body, "profileImage");
  const { error } = VUser.validate( bodyForValidation );
  if(error) {
      event.node.res.statusCode = 400
      return error.message
  } else {
    if(body.username) {
      const checkUsername = await User.findOne({ username: body.username })
      if(checkUsername && checkUsername.username != event.context.user.username) {
        event.node.res.statusCode = 400
        return "This username is already taken."
      }
    }
    if(body.email) {
      const checkEmail = await User.findOne({ email: body.email })
      if(checkEmail && checkEmail.email != event.context.user.email) {
        event.node.res.statusCode = 400
        return "This email is already taken."
      }
    }
    const updatedUser = await User.updateOne(
      { email: event.context.user.email },
      { $set: body },
      { new: true }
    );
    if(updatedUser && !body.email) {
      const user = await User.findOne( { email: event.context.user.email } )
      const userForJwt = {
        username: user?.username,
        email: user?.email,
        profileImage: user?.profileImage
      }
      event.node.res.statusCode = 200
      return { token: jwt.sign(userForJwt, config.jwtSecret), user: userForJwt }
    } else if(updatedUser && body.email) {
      const user = await User.findOne( { email: body.email } )
      const userForJwt = {
        username: user?.username,
        email: user?.email,
        profileImage: user?.profileImage
      }
      event.node.res.statusCode = 200
      return { token: jwt.sign(userForJwt, config.jwtSecret), user: userForJwt }
    } else {
      event.node.res.statusCode = 500
      return "Yikes! Something broke.";
    }
  }
});
