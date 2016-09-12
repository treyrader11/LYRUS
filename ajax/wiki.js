'use strict'


//mediawiki api below

	function getWiki(searchTerm) {
		var params = {
			format: "json",
			prop: "info",
			action: "query",
			list: "search", 
  			srsearch: searchTerm, 
  			rvprop: "content"
	}

		$.ajax({
			type: 'GET',
			url: "https://en.wikipedia.org/w/api.php",
			data: params,
			dataType: 'jsonp',
			jsonp: 'callback',
			success: function(data) {
				//console.log("wiki data is", data);
				var search_info = data.query.search;
				showWiki(search_info);
				
			},
			error: function() {
				console.log("could not retrieve wiki data", arguments);
			}
		})
	}

function showWiki(search_info) {
    $('#artist-list').empty()

      	$.each(search_info, function(index, info){
          	//console.log(info);
          	var name = info.title;
          	var bio = info.snippet;

          	var li = $('<li></li><br/>');
        	var a = $('<a href="#artist-modal" data-toggle="modal" data-artist_name="' +name+ '" data-bio="">' +name+ '</a>')
			a.data("bio", bio)

			li.append(a)


			$('#artist-list').append(li)

    	});
}


$('ul#artist-list').on('click', 'a', function(e) {
    e.preventDefault();
    var artistName = $(this).data('artist_name');
    var artistBio = $(this).data('bio');
    var artist_name = '<h4><em>' +artistName+ '</em></h4>';

    $('#artist-modal .modal-header').html(artist_name);
    $('#artist').html(artistBio);
    

})


