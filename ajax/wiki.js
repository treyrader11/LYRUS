'use strict'


//mediawiki api below

	function getWiki(searchTerm) {
		var params = {
			format: "json",
			//prop: "info",
			action: "query",
			list: "search", 
  			srsearch: searchTerm, 
  			rvprop: "content",
  			
  			//lookitup:

  			origin: '*',
		    prop: 'extracts|pageimages',
		    indexpageids: 1,
		    titles: searchTerm, 
		    exintro: 1,
		    exchars: 1000,
		    exsectionformat: 'plain',
		    piprop: 'name|thumbnail|original',
		    pithumbsize: 300
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
	var html = "";

  	$.each(search_info, function(index, info){
  		//console.log(info);
  		var name = info.title;
  		var bio = info.snippet;
  		showBio(bio);

  		html += '<li><a href="#artist-modal" data-toggle="modal" data-artist_name="' +name+ '" data-bio="">' +name+ '</a></li><br/>';
	});//bio contains info that isn't correctly parsed so will need a plan B

  	$('#artist-list').html(html)

}


	function showBio(bio) {
		var addBio = $('#artist-list a').attr('data', '"' +bio+ '"');
		 $('#artist').append('<li><p>' +addBio+ '</p></li>');
		 console.log('showBio', bio)
	}


$('ul#artist-list').on('click', 'a', function(e) {
    e.preventDefault();
    showBio();
    var artistName = $(this).data('artist_name'); //this is how you transfer data 
    //that are contained within a variable of another function.
    //We're getting the value of 'data-track_id' from showTrackNames() and
    //passing it to getLyrics().
    var artistBio = $(this).data('bio');
    var artist_name = '<h4><em>' +artistName+ '</em></h4>';
    //var bio = '<li>' +artistBio+ '</li>';

    $('#artist-modal .modal-header').html(artist_name);
    //$('#artist').append('<li><p>' +bio+ '</p></li>');
	

})



/*


//AJAX call to Wikipedia API - 'lookitup'


function getWiki(searchTerm){
  var params = {
    origin: '*',
    action: 'query',
    format: 'json',
    prop: 'extracts|pageimages',
    indexpageids: 1,
    titles: searchTerm, 
    exintro: 1,
    exchars: 1000,
    exsectionformat: 'plain',
    piprop: 'name|thumbnail|original',
    pithumbsize: 300
  };
  var url = 'https://en.wikipedia.org/w/api.php';
  $.getJSON(url, params, function(data){
    console.log(data.query);
    //showWiki(data.query);
  });
}

//Display Wikipedia data
function showWiki(results){
  var pageId = results.pageids[0];
  var info = results.pages[pageId].extract;
  var thumbnail = results.pages[pageId].thumbnail
  var html = "";

  //Error msgs from Wikipedia
  var misSpell = "<ul>\n<li><b>From a misspelling</b>: This is a redirect from a misspelling or typographical error. The correct form is given by the target of the redirect.\n<ul>\n<li>This redirect is made available to aid searches. Pages that use this link should be updated to link directly to the target without the use of a piped link that hides the correct details.</li>\n<li>This template tags redirects with a subcategory of the Redirects from incorrect names category, so template {{R from incorrect name}} should not be used with this template.</li>\n</ul>\n</li>\n</ul>..."
  var misCap = "<ul>\n<li><b>From a miscapitalisation</b>: This is a redirect from a miscapitalisation. The correct form is given by the target of the redirect.\n<ul>\n<li>This redirect is made available to aid searches or to maintain links. Pages that use this link should be updated to link directly to the correct form without using a piped link hiding the correct details.</li>\n<li>This template tags redirects with a subcategory of the Redirects from incorrect names category, so template {{R from incorrect name}} should not be used with this template.</li>\n</ul>\n</li>\n</ul>..."
  var wrongCap = "<ul>\n<li><b>From other capitalisation</b>: This is a redirect from a title with another method of capitalisation. It leads to the title in accordance with the Wikipedia naming conventions for capitalisation, or it leads to a title that is associated in some way with the conventional capitalisation of this redirect title. This may help writing, searching and international language issues.\n<ul>\n<li>If this redirect is an incorrect capitalisation, then {{R from miscapitalisation}} should be used <i>instead</i>, and pages that use this link should be updated to link <i>directly</i> to the target. Miscapitisations can be tagged in <i>any namespace</i>.</li>\n<li>Use this rcat to tag <i>only</i> mainspace redirects; when other capitalisations are in other namespaces, use {{R from modification}} <i>instead</i>.</li>\n</ul>\n</li>\n</ul>..."

  //Error msg for no Wiki page
  if (info === undefined || info === null || info.length < 100 || info === misCap || info === wrongCap || info === misSpell) {
  html += '<p class="emptyMsg"><span class="dotdotdot">' + "?(0_0)?</span><br>" +
  "Wikipedia doesn't have any pages that match the way you typed your searchword, " +
  "but Wikipedia is indeed very particular with correct <u>ca</u>p<u>italizations</u>. " +
  "If your search consists of more than one word, try another search capitalizing your words as follows:<br><br>" + 
  "(1) For proper nouns like the names of places/people, capitalize every word (ex. Los Angeles, Angkor Wat, Paulo Freire).<br><br>" +
  "(2) For all other things, leave the words uncapitalized. First word is up to you! " + 
  "(ex. Learning theory, responsive web design)</p>";
  $('.wiki').append(html);
  } else {
    //If thumbnail is unavailable
    if (thumbnail === undefined || thumbnail === null) {
      //Check if extract from is cut off
      if (info.length < 1000) {
        info = info.substring(0, info.length-3)
        html += info;
        $('.wiki').append(html);
      //If it is cut, get rid off abbreviated ending
      } else {
        info = info.substring(0, info.length-7)
        for (var i = 1; i < 6; i++) {
          if (info.charAt(info.length-i) === '<') {
            info = info.substring(0, info.length-i)
          }
        }
        html += info + '...</p>';
        $('.wiki').append(html);
      }
    //If thumbnail is available
    } else {
      //Same as above, check if extract is cut off or not
      if (info.length < 1000) {
        info = info.substring(0, info.length-3)
        html += '<a href="' + thumbnail.original + '" data-lity><div class="picWrap"><img class="wikipic" src="' +
        thumbnail.source + '"><p class="expand"><i class="fa fa-arrows-alt" aria-hidden="true"></i></div></a>' + info;
        $('.wiki').append(html);
      } else {
        info = info.substring(0, info.length-7)
        for (var i = 1; i < 6; i++) {
          if (info.charAt(info.length-i) === '<') {
            info = info.substring(0, info.length-i)
          }
        }
        html += '<a href="' + thumbnail.original + '" data-lity><div class="picWrap"><img class="wikipic" src="' +
        thumbnail.source + '"><p class="expand"><i class="fa fa-arrows-alt" aria-hidden="true"></i></div></a>' + info + '...</p>';
        $('.wiki').append(html);
      }
    }
    $('.wiki').append('<hr>');
    $('.wiki').append('<b><a href="https://en.wikipedia.org/wiki/' + $('#searchfield').val() + 
      '" class="wikilink" target="_blank">Read more on Wikipedia</a></b><p></p>'
    );
  }
}

*/