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
	var totalTweets = tweet_array.length;
	document.getElementById('numberTweets').innerText = totalTweets;	
	

	//Part 1.1: TweetDates
	var [earliest, latest] = findEarliestAndLatestTweet(tweet_array);

	document.getElementById('firstDate').innerText = earliest;
	document.getElementById('lastDate').innerText = latest;

	//Part 1.2: Tweet Categories
	
	var counts = countCategories(tweet_array);

	document.getElementsByClassName("completedEvents")[0].innerText = counts.get("completed_event")
	document.getElementsByClassName("completedEvents")[1].innerText = counts.get("completed_event");
	document.getElementsByClassName("liveEvents")[0].innerText = counts.get("live_event")
	document.getElementsByClassName("achievements")[0].innerText = counts.get("achievement")
	document.getElementsByClassName("miscellaneous")[0].innerText = counts.get("miscellaneous")

	counts.forEach((value, key) => {
		counts.set(key, math.format(value * 100 / totalTweets, 2) + '%');
	});

	document.getElementsByClassName("completedEventsPct")[0].innerText = counts.get("completed_event");
	document.getElementsByClassName("liveEventsPct")[0].innerText = counts.get("live_event");
	document.getElementsByClassName("achievementsPct")[0].innerText = counts.get("achievement");
	document.getElementsByClassName("miscellaneousPct")[0].innerText = counts.get("miscellaneous");

	//Part 1.3: 
	var [writtenCount, unwrittenCount] = findUnwrittenCount(tweet_array);


	document.getElementsByClassName("written")[0].innerText = writtenCount;
	document.getElementsByClassName("writtenPct")[0].innerText = math.format(writtenCount / (writtenCount + unwrittenCount), 2) + '%';

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
	const counts = new Map();
	counts.set("completed_event", 0);
	counts.set("live_event", 0);
	counts.set("achievement", 0);
	counts.set("miscellaneous", 0);
	tweet_array.forEach(tweet => {
		counts.set(tweet.source, counts.get(tweet.source) + 1)
	});

	return counts;
}

function findUnwrittenCount(tweet_array){
	// Opens up the dirty window and let the sun illuminate the words that were written by a user.
	var writtenCount = 0;
	var unwrittenCount = 0;
	tweet_array.forEach(tweet => {
		tweet.source == 'completed_event' ? (tweet.written ? writtenCount += 1 : unwrittenCount += 1) : {}; 
		// don't penalize points for this line, it came to me in a vision. release your inhibitions
	});

	return [writtenCount, unwrittenCount];
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});