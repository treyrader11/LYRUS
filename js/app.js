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
				//showLyrics(trackLyrics);
				console.log(trackLyrics);
			},
			error: function() {
				$('#feed').text("couldn't retrieve data");
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

  $('#search-results').html(html);
 
}


	


