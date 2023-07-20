// Third Party Deps
import {
	StatusCodes,
} from 'http-status-codes';

// Custom
import responseFormatter from "./../../utils/responseFormatter";

class PlaylistHandler {
    constructor (playlistSvc, playlistSchema) {
        this.playlistSvc = playlistSvc;
        this.playlistSchema = playlistSchema;
    }

    index = (req, res) => {
        const mostPlayed = req.query.mostPlayed ? req.query.mostPlayed : null;
    
        const { errors, result } = this.playlistSvc.index(mostPlayed);
    
        if (errors.length < 1) {
            return res.status(StatusCodes.OK)
                .send(responseFormatter(
                    StatusCodes.OK,
                    '',
                    'Successfully get all playlist',
                    result
                ));
        }
    
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(responseFormatter(
                StatusCodes.INTERNAL_SERVER_ERROR,
                'Internal Server Error',
            ));
    }

    store = (req, res) => {
        const data = req.body;
        const { error, value } = this.playlistSchema.validate(data);
    
        if (error === undefined) {
            const { errors, result } = this.playlistSvc.store(value)
    
            if (errors.length < 1) {
                return res.status(StatusCodes.CREATED)
                    .send(responseFormatter(
                        StatusCodes.CREATED,
                        '',
                        'Successfully add new song into playlist',
                        result,
                    ));
            }
        } else {
            return res.status(StatusCodes.BAD_REQUEST)
                .send(responseFormatter(
                        StatusCodes.BAD_REQUEST,
                        error.details[0].message,
                        ''
                    ));
        }
    
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(responseFormatter(
                StatusCodes.INTERNAL_SERVER_ERROR,
                'Internal Server Error',
            ));
    }

    show = (req, res) => {
        const id = req.params.id;
    
        const { errors, result } = this.playlistSvc.show(id);
    
        if (errors.length < 1) {
            return result
                ? res.status(StatusCodes.OK)
                    .send(responseFormatter(
                        StatusCodes.OK,
                        '',
                        'Successfully get playlist',
                        result
                    ))
                : res.status(StatusCodes.NOT_FOUND)
                    .send(responseFormatter(
                            StatusCodes.NOT_FOUND,
                            'Oops, data not found',
                            '',
                            {},
                        ));
        }
    
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(responseFormatter(
                StatusCodes.INTERNAL_SERVER_ERROR,
                'Internal Server Error',
            ));
    }

    update = (req, res) => {
        const id = req.params.id;
        const body = req.body
    
        const { error, value } = this.playlistSchema.validate(body);
    
        if (error === undefined) {
            const { errors, result } = this.playlistSvc.update(id, value);
    
            if (errors.length < 1) {
                return result
                    ? res.status(StatusCodes.OK)
                        .send(responseFormatter(
                            StatusCodes.OK,
                            '',
                            'Successfully update song',
                            result
                        ))
                    : res.status(StatusCodes.NOT_FOUND)
                        .send(responseFormatter(
                                StatusCodes.NOT_FOUND,
                                'Oops, data not found',
                                '',
                                {},
                            ));
            }
        } else {
            return res.status(StatusCodes.BAD_REQUEST)
                .send(responseFormatter(
                        StatusCodes.BAD_REQUEST,
                        error.details[0].message,
                        ''
                    ));
        }
    
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(responseFormatter(
                StatusCodes.INTERNAL_SERVER_ERROR,
                'Internal Server Error',
            ));
    }

    destroy = (req, res) => {
        const id = req.params.id
    
        const { errors, result } = this.playlistSvc.destroy(id);
    
        if (errors.length < 1) {
            return result
                ? res.status(StatusCodes.OK)
                    .send(responseFormatter(
                        StatusCodes.OK,
                        '',
                        'Successfully remove song from playlist',
                        {}
                    ))
                : res.status(StatusCodes.NOT_FOUND)
                    .send(responseFormatter(
                            StatusCodes.NOT_FOUND,
                            'Oops, data not found',
                            '',
                            {},
                        ));
        }
    
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(responseFormatter(
                StatusCodes.INTERNAL_SERVER_ERROR,
                'Internal Server Error',
            ));
    }

    play = (req, res) => {
        const id = req.params.id;

        const { errors, result } = this.playlistSvc.play(id);

        if (errors.length < 1) {
            return result
                ? res.status(StatusCodes.OK)
                    .send(responseFormatter(
                        StatusCodes.OK,
                        '',
                        `Successfully played ${result.title}`,
                        result
                    ))
                : res.status(StatusCodes.NOT_FOUND)
                    .send(responseFormatter(
                            StatusCodes.NOT_FOUND,
                            'Oops, data not found',
                            '',
                            {},
                        ));
        }
    
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(responseFormatter(
                StatusCodes.INTERNAL_SERVER_ERROR,
                'Internal Server Error',
            ));
    }

    stop = (req, res) => {
        const id = req.params.id;

        const { errors, result } = this.playlistSvc.stop(id);

        if (errors.length < 1) {
            return result
                ? res.status(StatusCodes.OK)
                    .send(responseFormatter(
                        StatusCodes.OK,
                        '',
                        `Successfully stop ${result.title}`,
                        result
                    ))
                : res.status(StatusCodes.NOT_FOUND)
                    .send(responseFormatter(
                            StatusCodes.NOT_FOUND,
                            'Oops, data not found',
                            '',
                            {},
                        ));
        }
    
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(responseFormatter(
                StatusCodes.INTERNAL_SERVER_ERROR,
                'Internal Server Error',
            ));
    }
}

export default PlaylistHandler