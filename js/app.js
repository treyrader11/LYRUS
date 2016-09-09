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
			$('#bg-container').hide();
			$('#bg-image').hide();
		})
	})

	$('#about-btn').click(function() {
		$('#modal').hide(function() {
			$('#bg-container').show();
			$('#bg-image').show();
		})
	}) 

	$('.hide-modal').click(function() {
		$('#modal').hide(function() {
			$('#bg-container').show();
			$('#bg-image').show();
		})
	}) 

})

















	