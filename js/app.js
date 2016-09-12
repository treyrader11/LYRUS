'use strict'


$(function() {

	var $searchForm = $('#search-term');
	
	$searchForm.submit(function(e) { //the <button> has to have a type="submit"
		e.preventDefault(); //need this to prevent the page from refreshing since that is the default functionality
    	var searchTerm = $('#query').val(); //define variable last
    	$('#bg-image').fadeTo(500, .1, function() {
    		searchTrack(searchTerm);
    		getVideos(searchTerm);
    		getWiki(searchTerm);
    	});
	});

	$('#about-modal').click(function() {
		$('#modal').show(function() {
			$('#content').hide();
			$('#bg-image').hide();
		})
	})

	$('#about-btn').click(function() {
		$('#modal').hide(function() {
			$('#content').show();
			$('#bg-image').show();
		})
	}) 

	$('.hide-modal').click(function() {
		$('#modal').hide(function() {
			$('#content').show();
			$('#bg-image').show();
		})
	})

	
	

	$('#video-header-modal').click(function() {
		$(this).next().slideToggle();
	})
	$('#lyrics-header-modal').click(function() {
		$(this).next().slideToggle();
	})
	$('#artist-header-modal').click(function() {
		$(this).next().slideToggle();
	})
	
	
	
	


	
})





//below is code for removing items from each lists: artist, lyrics, videos.

/*
	$('#videos-list').on('mouseenter', 'li', function() {
		$(this).find('.remove').show();
	});
	$('#videos-list').on('mouseleave', 'li', function() {
		$(this).find('.remove').hide();
	});
	
	$('#videos-list').on('click', '.remove', function() {
		$(this).closest('li').remove();
	});

	$('#lyrics-list').on('mouseenter', 'li', function() {
		$(this).find('.remove').show();
	});
	$('#lyrics-list').on('mouseleave', 'li', function() {
		$(this).find('.remove').hide();
	});
	
	$('#lyrics-list').on('click', '.remove', function() {
		$(this).closest('li').remove();
	});


})*/

















	