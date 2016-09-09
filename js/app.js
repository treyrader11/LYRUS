'use strict'


$(function() {

	var $searchForm = $('#search-term');
	
	$searchForm.submit(function(e) { //the <button> has to have a type="submit"
		e.preventDefault(); //need this to prevent the page from refreshing since that is the default functionality
    	var searchTerm = $('#query').val(); //define variable last
    	searchTrack(searchTerm);
    	getVideos(searchTerm);
    	getWiki(searchTerm);
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


})

















	