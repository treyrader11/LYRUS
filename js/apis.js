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


function getLyrics(track_id, track_name) { //track_id is the parameter in order 
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
			//console.log(copyright);
			showLyrics(lyrics);
			showCopyright(copyright);
		},
	});
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

function getVideos(searchTerm) {
    var params = {
      part: 'snippet',
      key: 'AIzaSyD52Xj44R7VjWXQZxGm-x3t2DjzZXfi288',
      q: searchTerm
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
			var trackURL = data.message.body.track.track_share_url;
			var trackName = data.message.body.track.track_name;
			console.log('the name of the track is ' +trackName); 
			var lyricsLink = '<br/><a href="' +trackURL+ '" target="_blank"><li id="full-lyrics" class="pull-left link">To see full lyrics, click here</li></a>'; 
			var track_name = '<h4>"' +trackName+ '"</h4>';
			$('#lyrics-modal .modal-header').html(track_name);
			$('#lyrics-footer').prepend(lyricsLink);
			//added .link so that when btn is clicked, it'll remove the previous link since
			//the the markup is being appended.
		}
	});
}



$('#lyrics-footer .btn').click(function() {
	$('.link').remove(); //needs tobe removed when modal fades out
	//or find a better way of doing it.
})



//mediawiki api below

	function getWiki(searchTerm) {
		var params = {
			format: "json",
			prop: "info",
			action: "query",
			list: "search", 
  			srsearch: searchTerm, 
  			rvprop: "content",
  
		}

		$.ajax({
			type: 'GET',
			url: "https://en.wikipedia.org/w/api.php",
			data: params,
			dataType: 'json',
			jsonp: 'callback',
			success: function(data) {
				console.log("wiki data is: " +data);
			},
			error: function() {
				console.log("could not retrieve wiki data", arguments);
			}
		})
	}

//https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Sachin_Tendulkar





   
