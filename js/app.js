'use strict'

$(function() {
	$('#search-term').submit(function (event) { //the <button> has to have a type="submit"
		event.preventDefault(); //need this to prevent the page from refreshing since that is the default functionality
    	var searchTerm = $('#query').val(); //define variable last
    	getTracks(searchTerm);
    	getVideos(searchTerm);
	})
})
	
	
	function getTracks(searchTerm) {
    
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

				
				var trackList = data.message.body.track_list;
				//console.log(data);
				showTracks(trackList);
			},
			error: function() {
				$('#lyrics-list').text("couldn't retrieve data");
			}
		});
	}

function showTracks(trackList) {
	var html = "";

  $.each(trackList, function(index, tracks){
  		//console.log("looping thru trackLyrics");
  		var artist = tracks.track.artist_name;
  		var trackId = tracks.track.track_id;
  		var trackName = tracks.track.track_name;
  		html += '<li><a href="#lyrics-modal" data-toggle="modal" data-track_id="' +trackId+ '">' +artist+ ': ' +trackName+ '</a></li><br/>';
  	}); 

  $('#lyrics-list').html(html);

 
}


function getLyrics(track_id) {
    
    	var params = {
      		
      		apikey: "876a23160e89575e71ba5d7851842cb6", //look at the output format on the API doc
      		format: 'JSONP',
      		track_id: track_id,
		}
    
    	$.ajax({
			type: 'GET',
			url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get",
			data: params,
			dataType: 'jsonp',// tells jQuery to make a jsonp request
			jsonp: 'callback', // jQuery automatically adds callback=someRandomFunctionName
			// to the API request GET parameters (params)
			success: function(data) {

				
				var lyrics = data.message.body.lyrics.lyrics_body;
				//console.log(data);
				showLyrics(lyrics);
			},
			error: function() {
				$('#lyrics-list').text("couldn't retrieve data");
			}
		});
	}

function showLyrics(trackLyrics) {
	var html = trackLyrics;



  $('#lyrics').html(html);

 
}


$('#lyrics-list').on('click', 'a', function(e) {
    e.preventDefault();

    var track_id = $(this).data('track_id');
    getLyrics(track_id);

})







//you tube info below



function getVideos(searchTerm) {
    // query parameters the youtube api supports
    var params = {
      part: 'snippet',
      key: 'AIzaSyD52Xj44R7VjWXQZxGm-x3t2DjzZXfi288',
      q: searchTerm
    }
    var url ='https://www.googleapis.com/youtube/v3/search';

    
    $.getJSON(url, params, function(data) { //another way to make a ajax GETrequest with jQuery
      //console.log(data);
      showVideos(data.items);
      $('#query').val('');
      
    })
  }



function showVideos(videos) {
	var html = "";

  $.each(videos, function(index, video){

    var thumbnail = video.snippet.thumbnails.default.url; 
    var title = video.snippet.title;
    var videoId = video.id.videoId; 
    var videoURL = "https://www.youtube.com/watch?v=" + videoId;

  	html += '<li><h5>' +title+ '</h5><br/><a href="' +videoURL+ '" target="_blank"><img src="' +thumbnail+ '"/></a></li><br/>';
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
