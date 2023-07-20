// Third Party Deps
import { v4 as uuidv4 } from 'uuid';

// Custom

class PlaylistService {
    constructor(playlistRepo) {
        this.playlistRepo = playlistRepo
    }

    index = (queryParam) => {
        try {
            const playlists = this.playlistRepo.getAll();

            if (queryParam !== null) {
                const sortedPlaylist = playlists.sort((pl1, pl2) => {
                    if (queryParam === "desc") {
                        return (pl1.playCount < pl2.playCount) ? 1 : (pl1.playCount > pl2.playCount) ? -1 : 0;
                    }
                    return (pl1.playCount > pl2.playCount) ? 1 : (pl1.playCount < pl2.playCount) ? -1 : 0;
                });
    
                return { errors: [], result: sortedPlaylist};
            }
        
            return { errors: [], result: playlists};;
        } catch (error) {
            return { errors: error, result: null};
        }
    }

    store = (data) => {
        try {
            const song = {
                id: uuidv4(),
                ...data,
                isPlayed: false,
                playCount: 0
            };

            this.playlistRepo.save(song)

            return { errors: [], result: song};
        } catch (error) {
            return { errors: error, result: null};
        }
    }

    show = (id) => {
        try {
            const playlist = this.playlistRepo.findById(id);

            return playlist !== undefined ? { errors: [], result: playlist} : { errors: [], result: null};
        } catch (error) {
            return { errors: error, result: null};
        }
    }

    update = (id, data) => {
        try {
            const index = this.playlistRepo.findIndexById(id);

            if (index !== -1) {
                const playlist = this.playlistRepo.update(index, data);

                return { errors: [], result: playlist};
            }

            return { errors: [], result: null};
        } catch (error) {
            return { errors: error, result: null};
        }
    }

    destroy = (id) => {
        try {
            const index = this.playlistRepo.findIndexById(id)

            if (index !== -1) {
                this.playlistRepo.destroy(index);

                return { errors: [], result: index};
            }

            return { errors: [], result: null};
        } catch (error) {
            return { errors: error, result: null};
        }
    }

    play = (id) => {
        try {
            const playedIndex = this.playlistRepo.findIndexPlayedSong();
            if (playedIndex !== -1) {
                this.playlistRepo.update(playedIndex, {
                    isPlayed: false
                });
            }

            const index = this.playlistRepo.findIndexById(id);
            if (index !== -1) {
                const pl = this.playlistRepo.findById(id);
                const data = {
                    isPlayed: true,
                    playCount: pl.playCount + 1
                }
                const playlist  = this.playlistRepo.update(index, data);

                return { errors: [], result: playlist};
            }

            return { errors: [], result: null};
        } catch (error) {
            return { errors: error, result: null};
        }
    }

    stop = (id) => {
        try {
            const index = this.playlistRepo.findIndexById(id);
            if (index !== -1) {
                const playlist  = this.playlistRepo.update(index, {
                    isPlayed: false
                });

                return { errors: [], result: playlist};
            }

            return { errors: [], result: null};
        } catch (error) {
            return { errors: error, result: null};
        }
    }
}

export default PlaylistService