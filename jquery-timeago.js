
/*Plugin definition*/
$.fn.timeago = function(){
	/*Getting current value in the span*/
    var currentValue = this.html();
    /*Getting the timeago string*/
    var modifiedValue = getTimeAgo(currentValue);
    /*Setting modifiedDateString in span*/
    this.html(modifiedValue);
    
    /*Display MM-DD-YY on hovering over span in HTML title tag*/
    var currentDate = new Date(currentValue);
    var month = Number(currentDate.getMonth()) + 1;
    month = month.toString().length > 1 ? month : "0" + month;
    var date = currentDate.getDate();
    date = date.toString().length > 1 ? date : "0" + date;
    var year = currentDate.getFullYear().toString().substr(-2);
    var titleValue = month + "-" + date + "-" + year;
    this.attr("title",titleValue)

	/*On clicking span, toggling the value between modified timeago 		string and date in MM-DD-YY format */
    this.click((function(){
      /*I had here implemented Javascript closure technique so that I can 		get a private variable which can be only modified when clicking on 		span*/
      var isNewValue = true;
      return function(){
        isNewValue = !isNewValue;
        if(!isNewValue){
          $(this).html(titleValue)
        }
        else{
          modifiedValue = getTimeAgo(currentValue);
          $(this).html(modifiedValue);
        }
      }
    })());
}

/*Function that check time in span and then compares with current time to get timeago modified string*/
function getTimeAgo(datetime){
	var date = new Date(datetime);
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    var displayedTime = date.getTime();
    var seconds = Math.floor((currentTime-displayedTime)/1000);
    var minutes = Math.floor(seconds/60);
    var hour = Math.floor(minutes/60);
    var days = Math.floor(hour/24);
    var weeks = Math.floor(days/7);
    
    if(seconds >= 0){
      if(seconds < 60){
          return seconds + " seconds ago";
      }
      else if(seconds < 120){
          return "a minute ago";
      }
      else if(minutes < 60){
          return minutes + " minutes ago";
      }
      else if(hour < 24){
          return hour + " hours ago";
      }
      else if(hour < 48){
          return "yesterday";
      }
      else if(days < 7){
          return days + " days ago";
      }
      else if(days < 31){
          return weeks + " weeks ago";
      }
      else{
          return weeks + " weeks ago";
      }
	}  
    return datetime;
}
