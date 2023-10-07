import jwt from "jsonwebtoken"
import User from "~/server/database/models/user"
import VUser from "~/server/database/validations/user"

export default defineEventHandler( async (event) => {
    const config = useRuntimeConfig()
    const { username, password } = await readBody(event)
    let { email } = await readBody(event)
    email = email.toLowerCase();
    const { error } = VUser.validate({ username, email, password });
    if(error) {
        setResponseStatus(event, 400)
        return error.message
    }
    const checkUsername = await User.findOne({ username })
    const checkEmail = await User.findOne({ email })
    if(checkUsername || checkEmail) {
        setResponseStatus(event, 409)
        return 'User already exists. Please choose a different username or email, or log in with your existing credentials.'
    }
    try {
        const user = new User({ username, email, password, profileImage: 'defaultProfileImage.jpg' })
        await user.save()
        return jwt.sign({ userId: user._id}, config.jwtSecret)
    } catch(error) {
        setResponseStatus(event, 500)
        return 'Registration failed.'
    }
  })