class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if (this.text == null){
            return "unknown"
        }
        
        if (this.text.includes("completed") || this.text.includes("posted")){
            return "completed_event"
        }

        else if (this.text.includes("right now")){
            return "live_event"
        }

        else if (this.text.includes("Achieved")){
            return "achievement"
        }

        else return "miscellaneous"     
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        return this.text.includes(' - ');
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }

        //select text past ' - ' and before '...'
        //TODO: parse the written text from the tweet

        return this.text.substring(this.text.indexOf(' - ') + ' - '.length,
                                     this.text.indexOf('https://t') - 'https://t'.length);
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        
        var activityString = this.text;
        if (this.written){
            this.text.substring(0, this.text.indexOf(this.writtenText));
        }
        
        activityString = activityString.toLowerCase();
        
        if (activityString.includes(' walk ')){
            return 'walk'
        }
        
        if (activityString.includes(' run ')){
            return 'run'
        }
        
        if (activityString.includes(' run ')){
            return 'run'
        }
        return "other";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}