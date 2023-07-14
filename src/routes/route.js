// Custom
import { destroyPlaylist, indexPlaylist, playSong, showPlaylist, storePlaylist, updatePlaylist } from '../handler/playlistHandler';

const Route = (app) => {
    app.get('/v1/playlists', indexPlaylist)
    
    app.post('/v1/playlists', storePlaylist)
    
    app.get('/v1/playlists/:id', showPlaylist)
    
    app.put('/v1/playlists/:id', updatePlaylist)
    
    app.patch('/v1/playlists/:id/play', playSong)
    
    app.delete('/v1/playlists/:id', destroyPlaylist)
}

export default Route;