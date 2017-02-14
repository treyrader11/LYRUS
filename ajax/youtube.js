'use strict'

function getVideos(searchTerm) {
    var params = {
      part: 'snippet',
      key: 'AIzaSyD52Xj44R7VjWXQZxGm-x3t2DjzZXfi288',
      q: searchTerm,
      maxResults: 5,
    }
    var url ='https://www.googleapis.com/youtube/v3/search';

    
    $.ajax({
    	type: 'GET',
    	url: "https://www.googleapis.com/youtube/v3/search",
    	data: params,
    	dataType: 'jsonp',
    	success: function(data) {
    		//console.log(data.items);
    		var itemsArr = data.items;
    		showVideos(itemsArr);
    		$('#query').val(''); //best practice to clear
    		//form input after search results have displayed.
    	},
    	error: function() {
    		$('#videos-list').text("Sorry, but we're having difficulties with retrieving the data");
    	}
    });

  }

  function showVideos(itemsArr) {
	var html = "";

  	$.each(itemsArr, function(index, item){

    	var thumbnail = item.snippet.thumbnails.default.url; 
    	var title = item.snippet.title;
    	var videoId = item.id.videoId; 
    	var videoURL = "https://www.youtube.com/watch?v=" + videoId;
   		// var lightBox = '<iframe width="300" height="230" src="https://www.youtube.com/embed/' +videoId+ '" frameborder="0" allowfullscreen></iframe>';
   		var embedURL = "https://www.youtube.com/embed/" +videoId;

  		html += '<li><h5>' +title+ '<img src="https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/erase_delete_remove_wipe_out-128.png" height="19" width="19" class="remove"></h5><br/><a href="#video-modal" data-toggle="modal" data-title="' +title+ '" data-embed="' +embedURL+ '"><img src="' +thumbnail+ '"/></a></li><br/>';
  
	});

  	$('#videos-list').html(html)

}

$('#videos-list').on('click', 'a', function(e) {
    e.preventDefault();

    var URL = $(this).data('embed'); //getting the data from 'embedVideo'
    //that is contained within the 'a' (link).
    var title = $(this).data('title');
    showLightbox(URL, title);
    //now passing the data to the showLightbox function.
 })

function showLightbox(URL, title) {
	var html = '<li><iframe width="300" height="230" src="' +URL+ '" frameborder="0" allowfullscreen></iframe></li>';
	$('ul#video').html(html);

	var title = '<h4>' +title+ '</h4>';
	$('#video-modal .modal-header').html(title);
	//giving the modal-box <ul> all of this new html that has some store data from our ajax call
}
