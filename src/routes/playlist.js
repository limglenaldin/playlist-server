// Third Party Deps
import express from "express";

// Custom
import { PlaylistModel, playlistSchema } from "../model/playlist";
import PlaylistService from "../services/playlistService";
import PlaylistHandler from "../handler/playlistHandler";

const playlistRepository = new PlaylistModel();
const playlistService = new PlaylistService(playlistRepository);
const playlistHandler = new PlaylistHandler(playlistService, playlistSchema)

const playlistRouter = express.Router();

// Index
playlistRouter.get('/playlists', playlistHandler.index);

// Store
playlistRouter.post('/playlists', playlistHandler.store);

// Show
playlistRouter.get('/playlists/:id', playlistHandler.show)

// Update
playlistRouter.put('/playlists/:id', playlistHandler.update)
playlistRouter.patch('/playlists/:id/play', playlistHandler.play)
playlistRouter.patch('/playlists/:id/stop', playlistHandler.stop)

// Delete
playlistRouter.delete('/playlists/:id', playlistHandler.destroy)

export default playlistRouter;