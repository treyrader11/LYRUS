'use strict'

$(function() {
	$('#search-term').submit(function (event) {
		event.preventDefault(); //need this to prevent the page from refreshing since that is the default functionality

		var searchTerm = $('#query').val();
    $('#query').val(function() {
      $(this).focus('');
    })
    
    
		getRequest(searchTerm);
	})
})
	
	
	function getRequest(searchTerm) {
    
    	var params = {
      		
      		apikey: "876a23160e89575e71ba5d7851842cb6", //look at the output format on the API doc
      		//q: searchTerm,
      		format: 'JSONP',
      		q_track: searchTerm,
 		}
    
    	$.ajax({
			type: 'GET',
			url: "http://api.musixmatch.com/ws/1.1/track.search",
			data: params,
			success: function(data) {
				console.log(data.message);
				//showResults(data.track);
				$('#search-results').html("<li>" +
					data.message +
					"</li>");
			},
			error: function() {
				$('#feed').text("couldn't retrieve data");
			}
		});
	}

function showResults(results) {
	var html = "test";

  $.each(results, function(index, value){
  	console.log(value)
 
  }); 
  //$('#search-results').html(html);

}

	






