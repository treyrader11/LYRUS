'use strict'


$(function() {

	var $searchForm = $('#search-term');
	
	$searchForm.submit(function(e) { //the <button> has to have a type="submit"
		e.preventDefault(); //need this to prevent the page from refreshing since that is the default functionality
    	var searchTerm = $('#query').val(); //define variable last
    	getTrackNames(searchTerm);
    	getVideos(searchTerm);
	});
})




//makes an AJAX call to the restful musiXmatch api to retreive data

function getTrackNames(searchTerm) {
    
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
			showTrackNames(trackList);
		},
		error: function() {
			$('#lyrics-list').text("Sorry, but we're having difficulties retrieving the data");
		}
	});
}

//a function to loop thru themusiXmatch track data

function showTrackNames(trackList) {
	var html = "";

  $.each(trackList, function(index, tracks){
  		//console.log("looping thru trackLyrics");
  		var artist = tracks.track.artist_name;
  		var trackId = tracks.track.track_id;
  		var trackName = tracks.track.track_name;
  		html += '<li><a href="#lyrics-modal" data-toggle="modal" data-track_id="' +trackId+ '">' +artist+ ': ' +trackName+ '</a></li><br/>';
  	}); 

  $('ul#lyrics-list').html(html); //this html is a <li> in which a link targets a modal window
}

$('ul#lyrics-list').on('click', 'a', function(e) {
    e.preventDefault();

    var track_id = $(this).data('track_id'); //this is how you transfer data 
    //that are contained within a variable of another function.
    //We're getting the value of 'data-track_id' from showTrackNames() and
    //passing it to getLyrics().
    
    getLyrics(track_id);

})

function getLyrics(track_id) {
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
			//console.log(data);
			showLyrics(lyrics);
		},
	});
}

function showLyrics(lyrics) {
	var html = lyrics;

	$('ul#lyrics').html(html);
}




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
    		console.log(data.items);
    		var itemsArr = data.items;
    		showVideos(itemsArr);
    		$('#query').val();
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

  		html += '<li><h5>' +title+ '</h5><br/><a href="#video-modal" data-toggle="modal" data-embed="' +embedURL+ '"><img src="' +thumbnail+ '"/></a></li><br/>';
  
	});

  	$('#videos-list').html(html)

}

$('#videos-list').on('click', 'a', function(e) {
    e.preventDefault();

    var URL = $(this).data('embed'); //getting the data from 'embedVideo'
    //that is contained within the 'a' (link).
    showLightbox(URL);
    //now passing the data to the showLightbox function.
 })

function showLightbox(URL) {
	var html = '<li><iframe width="300" height="230" src="' +URL+ '" frameborder="0" allowfullscreen></iframe></li>';
	$('ul#video').html(html);
	//giving the modal-box <ul> all of this new html that has some store data from our ajax call
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
