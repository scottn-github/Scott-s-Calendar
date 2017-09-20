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
    var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday"];
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
    document.getElementById("calendarDisplay").innerHTML=calendarBody;

	return true;
}

//End sourced code section

//Display events for a particular day
function displayEvents(year, month, day){
	//$.getJSON("js/eventsData.json", function(json) {
	
	var date = new Date(year, month, day);
	var dateNow = new Date();
	var monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
    var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday"];
	var dayOfWeek = date.getDay();
	var events = [];
	var hasEvents = false;
	
	
	
	
	
	var htmlCode = "<h4>Events for " + dayNames[dayOfWeek] + ", " + monthNames[month] + " " + day + ", " + year +"</h4>";
	//var headerCode = "<a href='#main' data-rel='button' class='ui-btn ui-btn-inline ui-corner-all ui-icon-back ui-btn-icon-left'>Back</a>";
	
	try{
		events = JSON.parse(localStorage.getItem('events'));
	
		if(events != null){
	
			for(var i=0; i<events.length; i++)
			{
				if(events[i].year == year && events[i].month == month && events[i].day == day)
				{
					htmlCode += "<ul>";
				
					for(var j=0; j<events[i].data.length; j++)
					{
						htmlCode += "<li>" + events[i].data[j] + "&nbsp&nbsp<a href='#pg3' onclick='deleteEvent(" + i + ", " + j + ", " + events[i].year + ", " + events[i].month + ", " + events[i].day + ", 1)'>Delete</a></li>";
					}
				
					htmlCode += "</ul>";
					hasEvents = true;
				}
			}
		}
	}
	catch(e){
		
	}
	
	if(hasEvents == false)
	{
		htmlCode += "<p>No events</p>";
	}
	
	//htmlCode += "<a href='#addEventPopup' data-rel='popup' class='ui-btn ui-btn-inline ui-corner-all'>Add Event</a>";

	//headerCode += "<div data-role='popup' id='addEventPopup'>"
	//headerCode += "<input type='text' data-clear-btn='true' id='eventInput' value='' />"
	//headerCode += "<button class='ui-btn'>Add</button>"
	//headerCode += "</div>";
	//headerCode += "<h1>Scott's Calendar</h1>"

	

	//Set HTML
	document.getElementById("dayEvents").innerHTML=htmlCode;
	document.getElementById("eventInputButton").onclick=function(){addEvent(year, month, day);};
	//document.getElementById("eventsHeader").innerHTML=headerCode;
	//});
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
		var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday"];
		var events = [];
		//var eventDate = new Date();
		//var eventDateInDays;
		var hasEvents = false;
		
		
		
		
		var htmlCode = "<h3>Upcoming Events</h3><hr />";
		
		try{
			events = JSON.parse(localStorage.getItem('events'));
			
			if(events != null){
				for(var i=0; i<events.length; i++)
				{
					var eventDate = new Date(events[i].year, events[i].month, events[i].day);
					var dayOfWeek = eventDate.getDay();
					//Get number of days since January 1, 1970
					var eventDateInDays = eventDate.getTime() / 86400000;
					
					if(eventDateInDays >= dateNowInDays && eventDateInDays <= dateNowInDays + 365)
					{
						htmlCode += "<h4>" + dayNames[dayOfWeek] + ", " + monthNames[events[i].month] + " " + events[i].day + ", " + events[i].year +"</h4>";
						
						htmlCode += "<ul>";
						
						for(var j=0; j<events[i].data.length; j++)
						{
							htmlCode += "<li>" + events[i].data[j] + "&nbsp&nbsp<a href='#pg1' onclick='return deleteEvent(" + i + ", " + j + ", " + events[i].year + ", " + events[i].month + ", " + events[i].day + ", 2)'>Delete</a></li>";
						}
						
						htmlCode += "</ul>";
						hasEvents = true;
					}
				}
			}
		}
		catch(e){
			
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

//Add an event on a date specified by parameters
function addEvent(year, month, day){
	var eventText = document.getElementById("eventInput").value.replace(/[^a-zA-Z 0-9':]+/g,'');
	var events = [];
	var evt;
	var multipleEvents = false;
	
	if(eventText != ""){
		try{
			events = JSON.parse(localStorage.getItem('events'));
			
			evt = {
				"year": year,
				"month": month,
				"day": day,
				"data": [eventText]
			};
			
			for(var i=0; i<events.length; i++){
				if(events[i].year == year && events[i].month == month && events[i].day == day){
					events[i].data.push(eventText);
					//Sort events in ascending order
					events = sortEvents(events);
					multipleEvents = true;
				}
			}
			
			if(multipleEvents == false){
				events.push(evt);
				//Sort events in ascending order
				events = sortEvents(events);
			}
			
			localStorage.setItem('events', JSON.stringify(events));
		}
		catch(e){
			evt = [{
				"year": year,
				"month": month,
				"day": day,
				"data": [eventText]
			}];
			
			localStorage.setItem('events', JSON.stringify(evt));
		}
		displayEvents(year, month, day);
		return true;
	}
	else{
		return false;
	}
	
}

//Delete a specific event
function deleteEvent(index, subIndex, year, month, day, displayType){
	var events = []
	
	try{
		events = JSON.parse(localStorage.getItem('events'));
		
		events[index].data.splice(subIndex, 1);
		
		if(events[index].data.length < 1){
			events.splice(index, 1);
		}
		
		localStorage.setItem('events', JSON.stringify(events));
		
		if(displayType == 1){
			displayEvents(year, month, day);
		}
		else if(displayType == 2){
			displayUpcomingEvents();
		}
	}
	catch(e){
		
	}
	
	return true;
}

//Sort events in ascending order
function sortEvents(events){
	var sortedEvents = events;
	var temp;
	
	for(var i=sortedEvents.length - 1; i > 0; i--){
		for(var j=0; j < i; j++){
			if(new Date(sortedEvents[j].year, sortedEvents[j].month, sortedEvents[j].day).getTime() > new Date(sortedEvents[j+1].year, sortedEvents[j+1].month, sortedEvents[j+1].day).getTime()){
				temp = sortedEvents[j];
				sortedEvents[j] = sortedEvents[j+1];
				sortedEvents[j+1] = temp;
			}
		}
	}
	
	return sortedEvents;
}

//Sync user events data to introtoapps server
function syncToServer(key){
	try{
		document.getElementById("syncResult").innerHTML="<p>Please wait...</p>";
		var data = localStorage.getItem(key);
		var encodedData = encodeURI(data);
		
		var xhttp = new XMLHttpRequest();
			
		xhttp.onreadystatechange = function() {
			//Successful response handler
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("syncResult").innerHTML="<p>Data successfully synced to cloud.</p>";
			}
			//Unsuccessful response handler
			if (this.readyState == 4 && this.status == 404) {
				document.getElementById("syncResult").innerHTML="<p>Failed to sync data. Unable to contact remote server.</p>";
			}
		};
		xhttp.open("POST", "http://introtoapps.com/datastore.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("action=save&appid=800469543&objectid=user-test&data=" + encodedData);
	}
	catch(e){
		alert("Your calendar has no events");
	}
	return true;
}

//Sync user events data from introtoapps server
function syncFromServer(username){	
	document.getElementById("syncResult").innerHTML="<p>Please wait...</p>";
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		//Successful response handler
		if (this.readyState == 4 && this.status == 200) {
			//Put events data into local storage
			localStorage.setItem('events', xhttp.responseText);
			document.getElementById("syncResult").innerHTML="<p>Data successfully synced from cloud.</p>";
		}
		//Unsuccessful response handler
		if (this.readyState == 4 && this.status == 404) {
			document.getElementById("syncResult").innerHTML="<p>Failed to sync data. Unable to contact remote server.</p>";
		}
	};
	
	xhttp.open("GET", "http://introtoapps.com/datastore.php?action=load&appid=800469543&objectid=user-" + username, true);
	xhttp.send();
}
