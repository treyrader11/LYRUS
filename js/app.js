'use strict'

$(function() {
	$('#search-term').submit(function (event) { //the <button> has to have a type="submit"
		event.preventDefault(); //need this to prevent the page from refreshing since that is the default functionality
    	var searchTerm = $('#query').val(); //define variable last
    	getRequest(searchTerm);
    	getVideos(searchTerm);
	})
})
	
	
	function getRequest(searchTerm) {
    
    	var params = {
      		
      		apikey: "876a23160e89575e71ba5d7851842cb6", //look at the output format on the API doc
      		q: searchTerm,
      		format: 'JSONP',
		}
    
    	$.ajax({
			type: 'GET',
			url: "https://api.musixmatch.com/ws/1.1/track.search",
			data: params,
			dataType: 'jsonp',// tells jQuery to make a jsonp request
			jsonp: 'callback', // jQuery automatically adds callback=someRandomFunctionName
			// to the API request GET parameters (params)
			success: function(data) {

				console.log(data);
				var trackList = data.message.body.track_list;
				//var track = trackList.track;
				showTracks(trackList);
				console.log("the tracklists are: " +trackList);
			},
			error: function() {
				$('#lyrics-list').text("couldn't retrieve data");
			}
		});
	}

function showTracks(trackList) {
	var html = "";

  $.each(trackList, function(index, tracks){
  		console.log("looping thru trackList");
  		var artist = tracks.track.artist_name;
  		html += '<li>' +artist+ '</li><br/>';
  	}); 

  $('#lyrics-list').html(html);
 
}








//you tube info below



function getVideos(searchTerm) {
    // query parameters the youtube api supports
    var params = {
      part: 'snippet',
      key: 'AIzaSyD52Xj44R7VjWXQZxGm-x3t2DjzZXfi288',
      q: searchTerm
    }
    var url ='https://www.googleapis.com/youtube/v3/search';

    
    $.getJSON(url, params, function(data) {
      console.log(data);
      showResults(data.items);
      $('#query').val('');
      
    })
  }



function showResults(videos) {
	var html = "";

  $.each(videos, function(index, video){

    var thumbnail = video.snippet.thumbnails.default.url; 
    var title = video.snippet.title;
    var videoId = video.id.videoId; 
    var videoURL = "https://www.youtube.com/watch?v=" + videoId;

  	html += '<li><h5>' +title+ '</h5><br/><a href="' +videoURL+ '" target="_blank"><img src="' +thumbnail+ ' /></a></li><br/>';
  }); //the 'target' attribute tells the browser to open the linked url in a different window.

  $('#videos-list').html(html);

}

	

	//mediawiki api below

	/*function getArtistInfo(searchTerm) {
		var params = {
			url: "https://en.wikipedia.org/w/api.php",
			format: "JSONP",
			q: searchTerm,
			action: "query",
			maxlag: "",
			prop: "info"
		}

		$.ajax({
			type: 'GET',
			//url: "https://en.wikipedia.org/w/api.php",
			data: params,
			dataType: 'jsonp',
			jsonp: 'callback',
			success: function(data) {
				console.log("wiki data is: " +data);
			}
		})
	}

*/
