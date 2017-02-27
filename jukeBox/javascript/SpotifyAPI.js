/*******************
    DATA TASKS
********************/

const SpotifyAPI = {};

// @param urlBase {string}
SpotifyAPI.urlBase = 'https://api.spotify.com';
// @param version {number}
SpotifyAPI.version = 1;

/*
    @func urlBuilder
    @returns {string}
*/

SpotifyAPI.getUrlBase = () => {
    const {urlBase, version} = SpotifyAPI;
    return urlBase + '/v' + version + '/';
    //     https://api.spotify.com/v1/
}; // getUrlBase

/*
    @func getUrlString
    @returns {string}
*/

SpotifyAPI.getUrlString = (endpoint) => {
    return SpotifyAPI.getUrlBase() + endpoint + '/?';
    // ^^^ https://api.spotify.com/v1search/?
}; // getUrlString

/*
    @func search
    @param {string} q
    @param {string} type
    @returns {Promise}
    @desc - takes a searchQuery and optional
    type arg, returns promise that makes
    call to Spotify API
*/
SpotifyAPI.search = (q = reqParam(), type = 'track') => {
    // search?q=adele&type=track
    return new Promise((resolve, reject) => {
        const url = SpotifyAPI.getUrlString('search') + 'q=' + q + '&type=' + type;
        
        const http = new XMLHttpRequest();
        http.open('GET', url);

        http.onload = () => {
            const data = JSON.parse(http.responseText);
            resolve(data);
        };

        http.send();
    });
}; // SpotifyAPI.search

