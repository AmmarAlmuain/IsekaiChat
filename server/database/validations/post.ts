import Joi from "joi";

const VAdmire = Joi.object({
    userId: Joi.string().required()
})

const VReject = Joi.object({
    userId: Joi.string().required()
})

const VComment = Joi.object({
    userId: Joi.string().required(),
    content: Joi.string().min(3).max(500).required()
})

const VPost = Joi.object({
    userId: Joi.string().required(),
    content: Joi.string().min(3).max(2000).required(),
    media: Joi.string(),
    admires: Joi.array().items(VAdmire),
    reject: Joi.array().items(VReject),
    comments: Joi.array().items(VComment)
})

export default VPost;