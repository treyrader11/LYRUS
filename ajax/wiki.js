'use strict'


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
			dataType: 'jsonp',
			jsonp: 'callback',
			success: function(data) {
				//console.log("wiki data is", data);
				var artist_info = data.query.search;
				showWiki(artist_info);
			},
			error: function() {
				console.log("could not retrieve wiki data", arguments);
			}
		})
	}


	function showWiki(artist_info) {
	var html = "";

  	$.each(artist_info, function(index, artist){
  		//console.log(artist);
  		var name = artist.title;
  		var bio = artist.snippet;

  		console.log(bio);
    	
  		//$('#artist').append('<li>' +bio+ '</li>');
  		html += '<li><a href="#artist-modal" data-toggle="modal" data-artist_name="' +name+ '" data-bio="' +bio+ '">' +name+ '</a></li><br/>';
	});//bio contains info that isn't correctly parsed so will need a plan B

  	$('#artist-list').html(html)

}

$('ul#artist-list').on('click', 'a', function(e) {
    e.preventDefault();

    var artistName = $(this).data('artist_name'); //this is how you transfer data 
    //that are contained within a variable of another function.
    //We're getting the value of 'data-track_id' from showTrackNames() and
    //passing it to getLyrics().
    var artistBio = $(this).data('bio');
    var artist_name = '<h4><em>' +artistName+ '</em></h4>';
    var bio = '<li>' +artistBio+ '</li>';

    $('#artist-modal .modal-header').html(artist_name);
    $('#artist').append('<li><p>' +bio+ '</p></li>');
	

})