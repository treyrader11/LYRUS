'use strict'

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

	function getArtistInfo(searchTerm) {
		var params = {
			format: "jsonp",
			action: searchTerm,
			prop: "extracts",
			action: "opensearch", 
  			search: searchTerm, 
  
		}

		$.ajax({
			type: 'GET',
			url: "https://en.wikipedia.org/w/api.php",
			data: params,
			dataType: 'jsonp',
			//jsonp: 'callback',
			success: function(data) {
				console.log("wiki data is: " +data);
			}
		})
	}

//https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Sachin_Tendulkar





   
