(function() {
    function AlbumCtrl() {
        this.albumData = angular.copy(albumPicasso);
        this.songs = this.albumData.songs;
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
