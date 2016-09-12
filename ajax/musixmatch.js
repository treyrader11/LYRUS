'use strict'

//makes an AJAX call to the restful musiXmatch api to retreive data

function searchTrack(searchTerm) {
    
    var params = {
      	apikey: "876a23160e89575e71ba5d7851842cb6",
      	q: searchTerm,
      	format: 'JSONP',
	}
    
    $.ajax({
		type: 'GET',
		url: "https://api.musixmatch.com/ws/1.1/track.search",
		data: params,
		dataType: 'jsonp',
		jsonp: 'callback', // jQuery automatically adds callback=someRandomFunctionName
		// to the API request GET parameters (params)
		success: function(data) {
			var trackList = data.message.body.track_list;
			//console.log(trackList);
			showTracks(trackList);
		},
		error: function() {
			$('#lyrics-list').text("Sorry, but we're having difficulties retrieving the data");
		}
	});
}

//a function to loop thru themusiXmatch track data

function showTracks(trackList) {
	var html = "";

  $.each(trackList, function(index, tracks){
  		//console.log("looping thru trackLyrics");
  		var artist = tracks.track.artist_name;
  		var trackId = tracks.track.track_id;
  		var trackName = tracks.track.track_name;

  		html += '<li><a href="#lyrics-modal" data-toggle="modal" data-track_name="' +trackName+ '" data-track_id="' +trackId+ '">' +artist+ ': ' +trackName+ '</a><img src="https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/erase_delete_remove_wipe_out-128.png" height="19" width="19" class="remove"></li><br/>';
  	}); 

  $('ul#lyrics-list').html(html); //this html is a <li> in which a link targets a modal window
  

}


function getTracks(track_id) {
    

    var params = {
      	apikey: "876a23160e89575e71ba5d7851842cb6",
      	//q: searchTerm,
      	track_id: track_id,
      	format: 'JSONP',
	}
    
    $.ajax({
		type: 'GET',
		url: "https://api.musixmatch.com/ws/1.1/track.get",
		data: params,
		dataType: 'jsonp',
		jsonp: 'callback',
		success: function(data) {
			
			var tracks = data.message.body;
		
			showMoreTracks(tracks);
		}
	});
}

function getLyrics(track_id) { //track_id is the parameter in order 
	//to get the specific json data listed on the musixmatch api doc.
	//So we pass it in getLyrics and define it in the params object.
    

    //We need to make a new ajax call because there's a 
    //different endpoint for obtaining the lyrics to tracks
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
			var copyright = data.message.body.lyrics.lyrics_copyright;
			//console.log('lyrics data', data);
			showLyrics(lyrics);
			showCopyright(copyright);
		},
		error: function() {
				console.log("could not retrieve wiki data", arguments);
			}
	});

//AJAX call to a different endpoint using same params.

}

function showMoreTracks(tracks) {
	var $header = $('#lyrics-modal .modal-header');
	var $footer = $('#lyrics-footer');
	var $body = $('#lyrics'); 

	$.each(tracks, function(index, track) {
		


		console.log(track)
		

		var trackURL = track.track_share_url;
		var album = track.album_name;
		var album_name = '<h4 class="height"><em>' +album+ '</em></h4>'
		var song = track.track_name;
		var lyricsNum = track.has_lyrics;
		var lyricsLink = '<br/><a href="' +trackURL+ '" target="_blank"><li id="full-lyrics" class="pull-left link">To see full lyrics, click here</li></a>'; 
		var track_name = '<h4 class="top">"' +song+ '"</h4><br/>';



		$header.html(track_name + '<h4 class="height">of</h4><br/>' +album_name);
		//$footer.prepend(lyricsLink);
			//added .link so that when btn is clicked, it'll remove the previous link since
			//the the markup is being appended.
		if (lyricsNum == 0) {
			$body.html("<li>Sorry, but we're unable to find the lyrics for " + '"' +song+ '".' + "</li>")
			$footer.prepend('<li class="pull-left link">Here are a few other sites for finding lyrics: </li><br/><li class="pull-left circle link"><a href="http://www.lyrics.com/" target="_blank">Lyrics.com</a></li><br/><li class="pull-left circle link"><a href="http://www.letssingit.com/" target="_blank">LetsSingIt.com</a></li><br/><li class="pull-left circle link"><a href="http://www.lyricsmode.com/" target="_blank">LyricsMode.com</a></li><br/>');
		}
		else {
			$footer.prepend(lyricsLink);
		}
	})
}




function showLyrics(lyrics) {
	var html = lyrics;


	$('ul#lyrics').html(html);
}

function showCopyright(copyright) {
	var html = '<p>' +copyright+ '</p><br/><br/>';
	$('#lyrics-modal .modal-footer').prepend(copyright);
}

$('ul#lyrics-list').on('click', 'a', function(e) {
    e.preventDefault();

    var track_id = $(this).data('track_id'); //this is how you transfer data 
    //that are contained within a variable of another function.
    //We're getting the value of 'data-track_id' from showTrackNames() and
    //passing it to getLyrics().

      
    getLyrics(track_id);
    getTracks(track_id);

})


$('#lyrics-footer .btn').click(function() {
	$('.link').remove(); //needs tobe removed when modal fades out
	//or find a better way of doing it.
})