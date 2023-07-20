// Third Party Deps
import Joi from "joi";
import { v4 as uuidv4 } from 'uuid';

const playlist = [
    {
        "id": uuidv4(),
        "title": "Renegades - Japanese Version",
        "artists": ["ONE OK ROCK"],
        "url": "https://open.spotify.com/track/53ZeRtrxpxGSinpjFlaDfU?si=b64f7f5715ec4085",
        "isPlayed": true,
        "playCount": 10
    },
    {
        "id": uuidv4(),
        "title": "Heartache",
        "artists": ["ONE OK ROCK"],
        "url": "https://open.spotify.com/track/0OwEskGUqCMgkSY7JkJS7x?si=7d1200346a5c4164",
        "isPlayed": false,
        "playCount": 5
    },
    {
        "id": uuidv4(),
        "title": "The Beginning",
        "artists": ["ONE OK ROCK"],
        "url": "https://open.spotify.com/track/4f3nDjgqXurMryYBSp0TZD?si=527f92f4a949477b",
        "isPlayed": false,
        "playCount": 100
    },
    {
        "id": uuidv4(),
        "title": "from the edge",
        "artists": ["FictionJunction", "LiSA"],
        "url": "https://open.spotify.com/track/1acwOlcOCrr0AxdyMS8fEm?si=d05d472c653b4b0d",
        "isPlayed": false,
        "playCount": 100
    },
];

const playlistSchema = Joi.object({
    title: Joi.string()
        .required(),

    artists: Joi.array()
        .items(Joi.string().required()),

    url: Joi.string()
        .required(),

    playCount: Joi.number(),
});

class PlaylistModel {
    getAll = () => {
        return playlist;
    };

    save = (data) => {
        return playlist.push(data);
    };

    findById = (id) => {
        return playlist.find((p) => {
            return p.id == id
        })
    };

    findIndexById = (id) => {
        return playlist.findIndex((p) => {
            return p.id == id
        })
    };

    findIndexPlayedSong = () => {
        return playlist.findIndex((p) => {
            return p.isPlayed 
        })
    }

    update = (index, data) => {
        return playlist[index] = { ...playlist[index], ...data }
    }

    destroy = (index) => {
        return playlist.splice(index, 1)[0];
    }
}

export { playlistSchema, PlaylistModel};