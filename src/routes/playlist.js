// Third Party Deps
import express from "express";

// Handler
import { destroyPlaylist, indexPlaylist, playSong, showPlaylist, storePlaylist, updatePlaylist } from '../handler/playlistHandler';

const playlistRouter = express.Router();

// Index
playlistRouter.get('/playlists', indexPlaylist)

// Store
playlistRouter.post('/playlists', storePlaylist)

// Show
playlistRouter.get('/playlists/:id', showPlaylist)

// Update
playlistRouter.put('/playlists/:id', updatePlaylist)
playlistRouter.patch('/playlists/:id/play', playSong)

// Delete
playlistRouter.delete('/playlists/:id', destroyPlaylist)

export default playlistRouter;