import Joi from "joi";

const VUser = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    email: Joi.string().max(256).email().required(),
    password: Joi.string().min(8).max(32).pattern(new RegExp('^[a-zA-Z0-9.!@#]{8,32}$')).message('Your password is too weak.').required()
})

export default VUser