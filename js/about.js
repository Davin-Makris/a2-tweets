function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	


	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	
	

	//Part 1.1: TweetDates
	var [earliest, latest] = findEarliestAndLatestTweet(tweet_array);

	document.getElementById('firstDate').innerText = earliest;
	document.getElementById('lastDate').innerText = latest;

	//Part 1.2: Tweet Categories
	
	console.log(countCategories(tweet_array));
}

function findEarliestAndLatestTweet(tweet_array){
	var earliest = tweet_array[0].time;
	var latest = tweet_array[0].time;
	tweet_array.forEach(element => {
		if (element.time < earliest){
			earliest = element.time;
		}
		if (element.time > latest){
			latest = element.time;
		}

	});

	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric"
	};

	earliest = earliest.toLocaleDateString("en-US", options);
	latest = latest.toLocaleDateString("en-US", options);

	return [earliest, latest];
}

function countCategories(tweet_array){
	const hashmap = new Map();
	hashmap.set("completed_event", 0);
	hashmap.set("live_event", 0);
	hashmap.set("achievement", 0);
	hashmap.set("miscellaneous", 0);
	tweet_array.forEach(tweet => {
		hashmap.set(tweet.source, hashmap.get(tweet.source) + 1)
	});

	return Array.from(hashmap);
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});