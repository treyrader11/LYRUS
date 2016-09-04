'use strict'

$(function() {
	$('#search-term').submit(function (event) { //the <button> has to have a type="submit"
		event.preventDefault(); //need this to prevent the page from refreshing since that is the default functionality

		//var searchTerm = $('#query').val();
    $('#query').val(function() {
      $(this).focus('');
    })

    	var searchTerm = $('#query').val();
    
    
		getRequest(searchTerm);
	})
})
	
	
	function getRequest(searchTerm) {
    
    	var params = {
      		
      		apikey: "876a23160e89575e71ba5d7851842cb6", //look at the output format on the API doc
      		q: searchTerm,
      		format: 'JSONP',
      		// callback parameter is required by the API. However 
       		// jQuery automatically adds this with the "jsonp: 'callback'" property passed to the ajax call
       		// callback: callbackFunction 
 		}
    
    	$.ajax({
			type: 'GET',
			url: "https://api.musixmatch.com/ws/1.1/track.lryics.get",
			data: params,
			dataType: 'jsonp',// tells jQuery to make a jsonp request
			jsonp: 'callback', // jQuery automatically adds callback=someRandomFunctionName
			// to the API request GET parameters (params)
			success: function(data) {

				console.log(data);
				var trackLyrics = data.message.header;
				//var track = trackList.track;
				showLyrics(trackLyrics);
				console.log("the track info " +trackLyrics);
			},
			error: function() {
				$('#lyrics-list').text("couldn't retrieve data");
			}
		});
	}

function showLyrics(trackLyrics) {
	var html = "";

  $.each(trackLyrics, function(index, lyrics){
  		console.log("looping... " + lyrics);
  		//var trackName = track.track.track_name;
  		var songLyrics = lyrics.lyrics_body;
  		html += '<li>' +songLyrics+ '</li><br/>';
  	}); //the 'target' attribute tells the browser to open the linked url in a different window.

  $('#lyrics-list').html(html);
 
}








//you tube info below


$(function() {
	$('#search-term').submit(function (event) {
		event.preventDefault(); //need this to prevent the page from refreshing since that is the default functionality

		var searchTerm = $('#query').val();
    $('#query').val(function() {
      $(this).focus('');
    })
    
    
		getVideos(searchTerm);
	})
})



function getVideos(searchTerm) {
    // query parameters the youtube api supports
    var params = {
      part: 'snippet',
      // my api developer key has to be included
      key: 'AIzaSyD52Xj44R7VjWXQZxGm-x3t2DjzZXfi288',
      //
      q: searchTerm
    }
    // the url (endpoint). AN endpoint is just a special kind of url
    var url ='https://www.googleapis.com/youtube/v3/search';

    
    $.getJSON(url, params, function(data) {
      console.log(data);
      showResults(data.items);
    })
  }



function showResults(videos) {
	var html = "";

  $.each(videos, function(index, video){
//must include 'value' inside variables, becaue 'value', in this context, is equal to 'results', which = 'data.items'

    var thumbnail = video.snippet.thumbnails.default.url; //same as saying data.items.snippet....
    var title = video.snippet.title; 
    var videoURL = "https://www.youtube.com/watch?v=" + video.id.videoId;

  	html += '<li><a href="' +videoURL+ '" target="_blank"><h5>' +title+ '</h5></a><br/><img src="' +thumbnail+ ' /></li><br/>';
  }); //the 'target' attribute tells the browser to open the linked url in a different window.

  $('#videos-list').html(html);

}

	


