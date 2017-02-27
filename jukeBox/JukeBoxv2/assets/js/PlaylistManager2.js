/*******************
    PLAYLIST MANAGEMENT
********************/

const PlaylistManager = {};

// this array will store the trackIds for all the
// chosen songs by user
PlaylistManager.tracks = [];

// this number will refer to the CURRENT song 
// since our tracks variable is an array, current song
// is really just an index of that array

PlaylistManager.currentSong = 0;

/*
    @func addTrack
    @param {string} track

    @desc - takes a trackId and 
    adds it to the end of the array
    @example - here's how you would use this code:
               PlaylistManager.addTrack('trackId');
*/
PlaylistManager.addTrack = (track = reqParam()) => {
    PlaylistManager.tracks.push(track);
}; // PlaylistManager.addTrack


PlaylistManager.removeById = (id) => {
    for (let i = 0; i < PlaylistManager.tracks.length; i++) {
        const track = PlaylistManager.tracks[i];
        if (track.id === id) {
            PlaylistManager.tracks.splice(i, 1);

            break;
        }
    }
}


PlaylistManager.getNextSong = () => {
    PlaylistManager.currentSong++;
    const {tracks, currentSong} = PlaylistManager;

    const len = tracks.length;
    if (currentSong === len) {
        PlaylistManager.currentSong = 0;
    }

    return tracks[PlaylistManager.currentSong].id;
}

