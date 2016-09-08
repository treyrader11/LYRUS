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
			console.log(trackURL);
			//showTrackNames(trackList);
			var lyricsLink = '<br/><a href="' +trackURL+ '" target="_blank"><li id="full-lyrics" class="pull-left link">See full lyrics here</li></a>'; 
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


/*$('#lyrics-footer').on('click', 'a', function(e) {
    e.preventDefault();

    var track_id = $(this).data('track_id');
    //getTracks(track_id);
    console.log('the track_id is ' +track_id+ '!')

   

})

$('#lyrics-footer > a').click(function() {
	 var track_id = $(this).data('track_id');
    //getTracks(track_id);
      console.log('the track_id is ' +track_id+ '!')

});
*/
   
