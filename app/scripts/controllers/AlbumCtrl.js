(function() {
    function AlbumCtrl(Fixtures) {
        this.albumData = Fixtures.getAlbum();
        this.songs = this.albumData.songs;
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
