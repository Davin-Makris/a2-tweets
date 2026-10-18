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
                                     this.text.indexOf('https://t'));
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        
        var activityString = this.text;
        if (this.written){
            activityString = this.text.substring(0, this.text.indexOf(this.writtenText));
        }
        
        activityString = activityString.toLowerCase();
        
        var startLoc = Math.max(this.text.indexOf(' km '), this.text.indexOf(' mi '));
        var endLoc = activityString.indexOf(' with ') == -1 ? this.text.indexOf(' - ') : activityString.indexOf(' with ');

        if (startLoc == -1 || startLoc > endLoc){
            return 'unknown';
        }

        return this.text.substring(startLoc + 4, endLoc);
    }

    get dayOfWeek():string {
        const options:Intl.DateTimeFormatOptions = {
            weekday: "long"
	    };

	    var day:string = this.time.toLocaleDateString("en-US", options)
        return day;
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }

        var kmFlag:boolean = false;
        
        var startLoc = this.text.indexOf(' a ')
        var endLoc = Math.max(this.text.indexOf(' km '), this.text.indexOf(' mi '));
        if (this.text.indexOf(' km ') == endLoc){
            kmFlag = true;
        }
        if (startLoc == -1 || endLoc == -1){
            return 0;
        }

        var distString:string = this.text.substring(startLoc + 3, endLoc)
        var distInMiles:number = parseFloat(distString) * (1.609 * (kmFlag?1:0));
        
        if (isNaN(distInMiles)){
            return 0;
        }

        return distInMiles;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}