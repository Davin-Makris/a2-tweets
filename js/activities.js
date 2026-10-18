function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	var numberActivites = allActivityTypes(tweet_array).size;
	console.log(allActivityTypes(tweet_array));
	console.log(-1 == true);
	document.getElementById("numberActivities").innerText = numberActivites;


	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	activity_vis_spec = returnActivityVisSpec();
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	document.getElementById("firstMost").innerText = "Run";
	document.getElementById("secondMost").innerText = "Walk";
	document.getElementById("thirdMost").innerText = "Bike";

	
	distance_vis_spec = returnDistanceVisSpec();
	vegaEmbed('#distanceVis', distance_vis_spec, {actions:false, renderer:'canvas'});

	agg_distance_vis_spec = returnAggDistanceVisSpec();
	vegaEmbed('#distanceVisAggregated', distance_vis_spec, {actions:false, renderer:'canvas'});

}

function allActivityTypes(tweet_array){
	var activityCounter = new Set();
	for (var i = 0; i < tweet_array.length; i++){
		var tweet = tweet_array[i];
		activityCounter.add(tweet.activityType);
	}
	return activityCounter

}
function returnActivityVisSpec(){
	return {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  },
	  //TODO: Add mark and encoding
	  "mark": "bar",
	  "encoding" : {
		"x" : {
			"type" : "nominal",
			"field" : "activityType"
		},
		"y" : {
			"type" : "quantitative",
			"aggregate": "count",
			//"scale": {
        	//	"type": "log"
			//}
	  	}
	}
	};
}

function returnDistanceVisSpec(){
	distance_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
		"values": tweet_array,
		"format": {
                "parse": null
            }
	},
	"transform" : [{
		"filter" : {
		"field" : "activityType",
		"oneOf" : ["walk", "run", "bike"]
		}
	}],
	"mark": "point",
	"encoding" : {
		"x" : {
			"type" : "nominal",
			"field" : "dayOfWeek"
		},
		"y" : {
			"type": "quantitative", 
			"field": "distance" 
		},
		color: {
			field: "activityType",
			type: "nominal"
	}
	},
	
	};
	return distance_vis_spec;
}
function returnAggDistanceVisSpec(){
	distance_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
		"values": tweet_array,
		"format": {
                "parse": null
            }
	},
	"transform" : [{
		"filter" : {
		"field" : "activityType",
		"oneOf" : ["walk", "run", "bike"]
		}
	}],
	"mark": "point",
	"encoding" : {
		"x" : {
			"type" : "nominal",
			"field" : "dayOfWeek"
		},
		"y" : {
			"type": "quantitative", 
			"field": "distance", 
			"aggregate" : "mean"
		},
		color: {
			field: "activityType",
			type: "nominal"
	}
	},
	
	};
	return distance_vis_spec;
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});