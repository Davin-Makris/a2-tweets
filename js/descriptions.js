var writtenTweets = [];

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	runkeeper_tweets.forEach(tweet => {
		var tweetObj = new Tweet(tweet.text, tweet.created_at);
		if (tweetObj.written){
			writtenTweets.push(tweetObj);
		}
	});
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	var searchBox = document.getElementById("textFilter");

	searchBox.addEventListener('input', searchTableForString);
	//console.log(writtenTweets[0]);

}

function searchTableForString(event){
	const query = event.target.value.toLowerCase();
	const filteredTweets = writtenTweets.filter(tweet => {
		return tweet.text.toLowerCase().includes(query);
	}
	)	
	
	//Clear old results with fresh stats

	//Display the results
	console.log(filteredTweets.slice(0,11));

	//Update counts and contains text

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});