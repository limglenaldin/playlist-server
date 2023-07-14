// Third Party Deps
import Joi from "joi";

const playlist = [];

const playlistSchema = Joi.object({
    title: Joi.string()
        .required(),

    artists: Joi.array()
        .items(Joi.string().required()),

    url: Joi.string()
        .required()
})

const playedSchema = Joi.boolean()

export { playlist, playlistSchema, playedSchema };