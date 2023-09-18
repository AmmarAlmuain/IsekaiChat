import User from "~/server/database/models/user"
import VUser from "~/server/database/validations/user"

export default defineEventHandler( async (event) => {
    const { username, password } = await readBody(event)
    let { email } = await readBody(event)
    email = email.toLowerCase();
    const { error } = VUser.validate({ username, email, password });
    if(error) {
        event.node.res.statusCode = 400
        return error.message
    } else {
        const checkUsername = await User.findOne({ username })
        const checkEmail = await User.findOne({ email })
        if(checkUsername || checkEmail) {
            event.node.res.statusCode = 409
            return 'User already exists. Please choose a different username or email address, or log in with your existing credentials.'
        }
        try {
            const user = new User({ username, email, password, profileImage: 'defaultProfileImage.jpg' })
            await user.save()
            event.node.res.statusCode = 200
            return 'Registration successful.'
        } catch(error) {
            event.node.res.statusCode = 500
            return 'Registration failed.'
        }
    }
  })