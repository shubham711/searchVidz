
// SearchBar Handler

$(document).ready(function(){

	var searchField = $('#query');
	var icon = $('#search-btn');
	var windowSize = $(window).width();

	// Focus Event Handler - Clicking inside
	$(searchField).on('focus',function(){
		$(this).animate({
			width:'100%'
		},400);

		$(icon).animate({
			right:'1%'
		},400);
	});
		
	if(windowSize > 480) {
	
		// Blur Event Handler - Clicking Outside
		$(searchField).on('blur',function(){
			$(this).animate({
				width:'45%'
			},400);

			$(icon).animate({
				right:'55.5%'
			},400);
		});
	} else {
		// Blur Event Handler - Clicking Outside
		$(searchField).on('blur',function(){
			$(this).animate({
				width:'60%'
			},400);

			$(icon).animate({
				right:'37%'
			},400);
		});		
	}

	$("#search-form").submit(function(e){
		e.preventDefault();
	});

});

function search() {

	// Clear Results - used to clear previous results.
	$('#results').html('');
	$('#buttons').html('');

	// Get the input query
	var query = $('#query').val();

	// GET Request
	$.get(
		"https://www.googleapis.com/youtube/v3/search",
		{	
			part: 'snippet,id',
			q:query,
			type: 'video',
			key: 'AIzaSyCFU0iWCdzQPDPYyMWo5BvFWfQmloJo4AA'
		},
		function(data){
			
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;

			console.log(data);

			$.each(data.items, function(i,item){
				// console.log(i); - prints the index of the item
				// console.log(item); - prints the item itself

				// Get Output
				var output = getOutput(item);

				// Display results
				$('#results').append(output);
			});

			var buttons = getButtons(prevPageToken,nextPageToken);

			//Display buttons
			$('#buttons').append(buttons);
		}
	);
}


// Build Output
function getOutput(item){
	
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var channelTitle = item.snippet.channelTitle;
	var publishedDate = item.snippet.publishedAt;
	var thumb = item.snippet.thumbnails.high.url;

	var dt = new Date(publishedDate);
	var time = dt.getMonth()+"/"+dt.getDate()+"/"+dt.getFullYear()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();

	var myURL = 'http://www.youtube.com/embed/'+videoId+'?autoplay=1';
	// var myURL = 'http://www.youtube.com/watch?v=opj24KnzrWo';
	//Build Output string
	var output = '<li>'+
	'<div class="list-left">'+
	'<img src="'+thumb+'">'+
	'</div>'+
	'<div class="list-right">'+
	'<h3><a data-fancybox href="'+myURL+'">'+title+'</a></h3>'+
	'<small>By <span class="cTitle">'+channelTitle+'</span> on '+time+'</small>'+
	'<p>'+description+'</p>'+
	'</div>'+
	'</li>'+
	'<div class="clearFix"></div>'+
	'';

	return output;
}


function getButtons(prevPageToken,nextPageToken){
	
	if(!prevPageToken){
		var btn_output = '<div class="button-container">'+
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+query+'" onclick="nextPage();">'+
		'Next</button></div';
	} else {
		var btn_output = '<div class="button-container">'+
		'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+query+'" onclick="prevPage();">'+
		'Previous</button>'+
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+query+'" onclick="nextPage();">'+
		'Next</button>'+
		'</div>';
	}

	return btn_output;
}

// Next Page Function
function nextPage(){

	var token = $('#next-button').data('token');
	var query = $('#next-button').data('query');

	// Clear Results - used to clear previous results.
	$('#results').html('');
	$('#buttons').html('');

	// Get the input query
	var query = $('#query').val();

	// GET Request
	$.get(
		"https://www.googleapis.com/youtube/v3/search",
		{	
			part: 'snippet,id',
			q:query,
			pageToken: token,
			type: 'video',
			key: 'AIzaSyCFU0iWCdzQPDPYyMWo5BvFWfQmloJo4AA'
		},
		function(data){
			
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;

			console.log(data);

			$.each(data.items, function(i,item){
				// console.log(i); - prints the index of the item
				// console.log(item); - prints the item itself

				// Get Output
				var output = getOutput(item);

				// Display results
				$('#results').append(output);
			});

			var buttons = getButtons(prevPageToken,nextPageToken);

			//Display buttons
			$('#buttons').append(buttons);
		}
	);	
}


// Previous Page Function
function prevPage(){

	var token = $('#prev-button').data('token');
	var query = $('#prev-button').data('query');

	// Clear Results - used to clear previous results.
	$('#results').html('');
	$('#buttons').html('');

	// Get the input query
	var query = $('#query').val();

	// GET Request
	$.get(
		"https://www.googleapis.com/youtube/v3/search",
		{	
			part: 'snippet,id',
			q:query,
			pageToken: token,
			type: 'video',
			key: 'AIzaSyCFU0iWCdzQPDPYyMWo5BvFWfQmloJo4AA'
		},
		function(data){
			
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;

			console.log(data);

			$.each(data.items, function(i,item){
				// console.log(i); - prints the index of the item
				// console.log(item); - prints the item itself

				// Get Output
				var output = getOutput(item);

				// Display results
				$('#results').append(output);
			});

			var buttons = getButtons(prevPageToken,nextPageToken);

			//Display buttons
			$('#buttons').append(buttons);
		}
	);	
}