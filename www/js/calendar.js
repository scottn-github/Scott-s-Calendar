/*

Filename: calendar.js
Code source: Web Code Geeks(https://www.webcodegeeks.com/javascript/javascript-calendar-example/)

*/

function displayCalendar(year, mon){


    var htmlContent ="";
    var FebNumberOfDays ="";
    var counter = 1;


    var dateNow = new Date();
    var month = mon;
    var day = dateNow.getDate();
    var year = year;

    var nextMonth = month+1;
    var prevMonth = month -1;



    //The number of days in February
    if (month == 1){
        if ( (year%100!=0) && (year%4==0) || (year%400==0)){
            FebNumberOfDays = 29;
        }else{
            FebNumberOfDays = 28;
        }
    }


    // Set the names of months and days
    var monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
    var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
    var dayPerMonth = ["31", ""+FebNumberOfDays+"","31","30","31","30","31","31","30","31","30","31"];


    // days in previous month and next one , and day of week.
    var nextDate = new Date(nextMonth +' 1 ,'+year);
    var weekdays= nextDate.getDay();
    var weekdays2 = weekdays;
    var numOfDays = dayPerMonth[month];




    // Leaves a white space for days of previous month.
    while (weekdays>0){
        htmlContent += "<td class='monthPre'></td>";

        weekdays--;
    }

    // Loop builds the calendar body.
    while (counter <= numOfDays){

        // Starts new line for next week.
        if (weekdays2 > 6){
            weekdays2 = 0;
            htmlContent += "</tr><tr>";
        }



        // If the counter is the current day
        // highlight the current day using the CSS defined in header.
        if (counter == day && month == dateNow.getMonth()){
            htmlContent +="<td class='dayNow' " + "><a onclick='return displayEvents(" + year + ", " + month + ", " + counter + ");' href='#pg3'>"+counter+"</a></td>";
				//   onMouseOver='this.style.background=\"#FFFF00\"; this.style.color=\"#FFFFFF\"'
				//onMouseOut='this.style.background=\"#FFFFFF\"; this.style.color=\"#00FF00\"'
        }
		else{
            htmlContent +="<td class='monthNow' "+" ><a onclick='return displayEvents(" + year + ", " + month + ", " + counter + ");' href='#pg3'>"+counter+"</a></td>";
			//onMouseOver='this.style.background=\"#FFFF00\"'
			//onMouseOut='this.style.background=\"#FFFFFF\"'
        }
		//else{
			//htmlContent +="<td class='monthNow' "+" >"+counter+"</td>";
		//}
			
		
        weekdays2++;
        counter++;
    }



    //Build the calendar HTML
    var calendarBody = "<table class='calendar' align='center'> <tr class='monthNow'><th colspan='7'>"
        +monthNames[month]+" "+ year +"</th></tr>";
    calendarBody +="<tr>  <td class='dayNames'>Sun</td class='dayNames'>  <td class='dayNames'>Mon</td> <td class='dayNames'>Tue</td>"+
        "<td class='dayNames'>Wed</td class='dayNames'> <td class='dayNames'>Thu</td> <td class='dayNames'>Fri</td> <td class='dayNames'>Sat</td> </tr>";
    calendarBody += "<tr>";
    calendarBody += htmlContent;
    calendarBody += "</tr></table>";
    //Set the HTML in page
    document.getElementById("calendar").innerHTML=calendarBody;

	return true;
}

//End sourced code section

//Display events for a particular day
function displayEvents(year, month, day){
	$.getJSON("js/eventsData.json", function(json) {
	
	var date = new Date(year, month, day);
	var dateNow = new Date();
	var monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
    var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
	var dayOfWeek = date.getDay();
	var events = [];
	var hasEvents = false;
	
	
	events = json.events;
	
	
	
	var htmlCode = "<h4>Events for " + dayNames[dayOfWeek] + ", " + monthNames[month] + " " + day + ", " + year +"</h4>";
	
	for(var i=0; i<events.length; i++)
	{
		if(events[i].year == year && events[i].month == month && events[i].day == day)
		{
			htmlCode += "<ul>";
			
			for(var j=0; j<events[i].data.length; j++)
			{
				htmlCode += "<li>" + events[i].data[j] + "</li>";
			}
			
			htmlCode += "</ul>";
			hasEvents = true;
		}
	}
	
	if(hasEvents == false)
	{
		htmlCode += "<p>No events</p>";
	}
	
	htmlCode += "<a href='#addEventPopup' data-rel='popup' class='ui-btn ui-btn-inline ui-corner-all'>Add Event</a>";
	//htmlCode += "<div data-role='popup' id='myPopup5' style='min-width:200px;'>"
	//htmlCode += "<ul data-role='listview'>";
	//htmlCode += "<li data-icon='false'><a href='#main'>Calendar</a></li>";
	//htmlCode += "</ul>";
	//htmlCode += "</div>";
	//else
	//{
		//var events = augustEvents[day - 1].split("|");
		
		//htmlCode += "<ul>";
		
		//for(var i=0; i<events.length; i++)
		//{
			//htmlCode += "<li>" + events[i] + "</li>";
		//}
		
		//htmlCode += "</ul>";
	//}

	//Set HTML
	document.getElementById("dayEvents").innerHTML=htmlCode;
	});
	return true;
}

//Get the upcoming events and display them
function displayUpcomingEvents(){
	$.getJSON("js/eventsData.json", function(json) {
		var dateNow = new Date();
		//Get number of days since January 1, 1970
		var dateNowInDays = dateNow.getTime() / 86400000;
		var year = dateNow.getFullYear();
		var month = dateNow.getMonth();
		var day = dateNow.getDate();
		var monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
		var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
		var events = [];
		//var eventDate = new Date();
		//var eventDateInDays;
		var hasEvents = false;
		
		events = json.events;
		
		var htmlCode = "<h3>Upcoming Events</h3><hr />";
		
		for(var i=0; i<events.length; i++)
		{
			var eventDate = new Date(events[i].year, events[i].month, events[i].day);
			var dayOfWeek = eventDate.getDay();
			var eventDateInDays = eventDate.getTime() / 86400000;
			
			if(eventDateInDays >= dateNowInDays && eventDateInDays <= dateNowInDays + 365)
			{
				htmlCode += "<h4>" + dayNames[dayOfWeek] + ", " + monthNames[events[i].month] + " " + events[i].day + ", " + events[i].year +"</h4>";
				
				htmlCode += "<ul>";
				
				for(var j=0; j<events[i].data.length; j++)
				{
					htmlCode += "<li>" + events[i].data[j] + "</li>";
				}
				
				htmlCode += "</ul>";
				hasEvents = true;
			}
		}
		
		if(hasEvents == false)
		{
			htmlCode += "<p>No events</p>";
		}
		
		//Set HTML
		document.getElementById("upcomingEvents").innerHTML=htmlCode;
	});
	return true;
}
