(function (){
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};

        /*
        * @desc get, and store, the album information
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

        /*
        * @desc Buzz object audio file
        * @type {Object}
        */

        var currentBuzzObject = null;

        // @desc volume used for songs
        // @type {Number}
        SongPlayer.volume = 80;

         /*
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */

        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;

        };

        /*
        * @function playSong
        * @desc Plays current selection with audio file as currentBuzzObject
        * @param {Object} song
        */

        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };

        /*
        *  @function stopSong
        *  @desc stops current song selection
        *  @param {Object} song
        */

        var stopSong = function(){
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };

        /*
        *  @function getSongIndex
        *  @desc get the index of a song
        *  @param {Object} song
        */

        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        };

        /*
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        /*
        * @function play
        * @desc Play current or new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song){
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song){
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
         /*
         * @function pause
         * @desc Pause current song
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /*
        * @desc method to go to the previous song
        * use getSongIndex to get current playing song and then decrease by one
        */

        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0){
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /*
        * @desc method to go to the next song
        * use getSongIndex to get current playing song and then increase by one
        */

        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if (currentSongIndex > currentSongIndex.length) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /*
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
        */

        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject){
                currentBuzzObject.setTime(time);
            }
        };

        SongPlayer.setVolume = function(volume){
            if (currentBuzzObject){
                currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
