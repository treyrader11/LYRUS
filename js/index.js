'use strict'

var $ = require('jquery');
var getLyricsFromAPI = require('./musixmatch');
var getWikiAPI = require('./wiki');
var getVideosFromYoutubeAPI = require('./youtube');

function searchForStuff() {

	$(function() {

		var $searchForm = $('#search-term');
		
		$searchForm.submit(function(e) { //the <button> has to have a type="submit"
			e.preventDefault(); //need this to prevent the page from refreshing since that is the default functionality
	    	var searchTerm = $('#query').val(); //define variable last
	    	$('.bg-image').fadeTo(500, .1, function() {
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
			$(this).toggleClass('fade');
			$(this).next().slideToggle();
		})
		$('#lyrics-header-modal').click(function() {
			$(this).toggleClass('fade');
			$(this).next().slideToggle();
		})
		$('#artist-header-modal').click(function() {
			$(this).toggleClass('fade');
			$(this).next().slideToggle();
		})
	})
}

module.exports = searchForStuff;


















	