// Third Party Deps
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

// Custom
import responseFormatter from "./../../utils/responseFormatter";
import { playedSchema, playlist, playlistSchema } from "./../model/playlist";

const indexPlaylist = (req, res) => {
    res.status(StatusCodes.OK)
            .send(
                responseFormatter(
                    StatusCodes.OK,
                    '',
                    'Successfully get all playlist',
                    playlist
                ));
}

const storePlaylist = (req, res) => {
    const { error, value } = playlistSchema.validate(req.body);
    
        if (error === undefined) {
            const song = {
                id: uuidv4(),
                ...value,
                isPlayed: false,
            }
            playlist.push(song);
    
            res.status(StatusCodes.CREATED)
                .send(
                    responseFormatter(
                        StatusCodes.CREATED,
                        '',
                        'Successfully add new song into playlist',
                        song,
                    ));
        } else {
            res.status(StatusCodes.BAD_REQUEST)
                .send(
                    responseFormatter(
                        StatusCodes.BAD_REQUEST,
                        error.details[0].message,
                        ''
                    ));
        }
}

const showPlaylist = (req, res) => {
    const id = req.params.id
        const pl = playlist.find((p) => {
            return p.id == id
        })
    
        if (pl) {
            res.status(StatusCodes.OK)
                .send(
                    responseFormatter(
                        StatusCodes.OK,
                        '',
                        'Successfully get all playlist',
                        pl,
                    ));
        } else {
            res.status(StatusCodes.NOT_FOUND)
                .send(
                    responseFormatter(
                        StatusCodes.NOT_FOUND,
                        'Oops, data not found',
                        '',
                        [],
                    ));
        }
}

const updatePlaylist = (req, res) => {
    const id = req.params.id
        const plIndex = playlist.findIndex((p) => {
            return p.id == id
        })
        
        if (plIndex !== -1) {
            const { error, value } = playlistSchema.validate(req.body);
            
            if (error === undefined) {
                playlist[plIndex] = { ...playlist[plIndex], ...value }
    
                res.status(StatusCodes.OK)
                .send(
                    responseFormatter(
                        StatusCodes.OK,
                        '',
                        `Successfully update song`,
                        playlist[plIndex],
                    ));
            } else {
                res.status(StatusCodes.BAD_REQUEST)
                .send(
                    responseFormatter(
                        StatusCodes.BAD_REQUEST,
                        error.details[0].message,
                        ''
                    ));
            }
        } else {
            res.status(StatusCodes.NOT_FOUND)
                .send(
                    responseFormatter(
                        StatusCodes.NOT_FOUND,
                        'Oops, data not found',
                        '',
                        [],
                    ));
        }
}

const destroyPlaylist = (req, res) => {
    const id = req.params.id
        const plIndex = playlist.findIndex((p) => {
            return p.id == id
        })
        
        if (plIndex !== -1) {
            playlist.splice(plIndex, 1)[0];
            res.status(StatusCodes.OK)
                .send(
                    responseFormatter(
                        StatusCodes.OK,
                        '',
                        'Successfully remove song from playlist'
                    ));
        } else {
            res.status(StatusCodes.NOT_FOUND)
                .send(
                    responseFormatter(
                        StatusCodes.NOT_FOUND,
                        'Oops, data not found',
                        '',
                        [],
                    ));
        }
}

const playSong = (req, res) => {
    const id = req.params.id
        const pl = playlist.find((p) => {
            return p.id == id
        })
        
        if (pl) {
            const { error, value } = playedSchema.validate(req.query.state)
            
            if (error === undefined) {
                pl.isPlayed = value
    
                res.status(StatusCodes.OK)
                .send(
                    responseFormatter(
                        StatusCodes.OK,
                        '',
                        `Successfully ${value ? 'played' : 'pause'} ${pl.title}`,
                        pl,
                    ));
            } else {
                res.status(StatusCodes.BAD_REQUEST)
                .send(
                    responseFormatter(
                        StatusCodes.BAD_REQUEST,
                        "Param \"play\" must be a boolean",
                        ''
                    ));
            }
            
        } else {
            res.status(StatusCodes.NOT_FOUND)
                .send(
                    responseFormatter(
                        StatusCodes.NOT_FOUND,
                        'Oops, data not found',
                        '',
                        [],
                    ));
        }
}

export { indexPlaylist, storePlaylist, showPlaylist, updatePlaylist, destroyPlaylist, playSong }