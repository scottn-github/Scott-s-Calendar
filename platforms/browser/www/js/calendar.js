/*

Filename: calendar.js
Code source: Web Code Geeks(https://www.webcodegeeks.com/javascript/javascript-calendar-example/)

*/

//Create a new calendar
calendar = new createCalendar();

//Create a calendar
function createCalendar(){
	
	var dateNow = new Date();
    var month = dateNow.getMonth();
    var day = dateNow.getDate();
    var year = dateNow.getFullYear();
    
	//Display the calendar
	this.displayCalendar = function(){
		var htmlContent ="";
		var FebNumberOfDays ="";
		var counter = 1;

    

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
		var calendarBody = "<table class='calendar' align='center'> <tr class='monthNow'><th colspan='7'><a href='#' onclick='calendar.goToPreviousMonth()' style='color: yellow; text-decoration: none'>&#8678Next</a>&nbsp&nbsp"
			+monthNames[month]+" "+ year +"&nbsp&nbsp<a href='#' onclick='calendar.goToNextMonth()' style='color: yellow; text-decoration: none'>Prev&#8680</a></th></tr>";
		calendarBody +="<tr>  <td class='dayNames'>Sun</td class='dayNames'>  <td class='dayNames'>Mon</td> <td class='dayNames'>Tue</td>"+
			"<td class='dayNames'>Wed</td class='dayNames'> <td class='dayNames'>Thu</td> <td class='dayNames'>Fri</td> <td class='dayNames'>Sat</td> </tr>";
		calendarBody += "<tr>";
		calendarBody += htmlContent;
		calendarBody += "</tr></table>";
		//Set the HTML in page
		document.getElementById("calendarDisplay").innerHTML=calendarBody;
	};
	
	//Go to the next month
	this.goToNextMonth = function(){
		if(month < 11){
			month += 1;
		}
		else{
			month = 0;
			year += 1;
		}
		this.displayCalendar();
	};
	
	//Go to the previous month
	this.goToPreviousMonth = function(){
		if(month > 0){
			month -= 1;
		}
		else{
			month = 11;
			year -= 1;
		}
		this.displayCalendar();
	};
	
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
function syncToServer(){
	try{
		document.getElementById("syncResult").innerHTML="<p>Please wait...</p>";
		var data = localStorage.getItem('events');
		var username = localStorage.getItem('username');
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
		xhttp.send("action=save&appid=800469543&objectid=user-" + username + "&data=" + encodedData);
	}
	catch(e){
		document.getElementById("syncResult").innerHTML="<p>You are not logged in, or your calendar has no events.</p>";
	}
	return true;
}

//Sync user events data from introtoapps server
function syncFromServer(){	
	
	try{
		var username = localStorage.getItem('username');
		document.getElementById("syncResultFromServer").innerHTML="<p>Please wait...</p>";
		var xhttp = new XMLHttpRequest();
	
		xhttp.onreadystatechange = function() {
			//Successful response handler
			if (this.readyState == 4 && this.status == 200) {
				//Put events data into local storage
				localStorage.setItem('events', xhttp.responseText);
				document.getElementById("syncResultFromServer").innerHTML="<p>Data successfully synced from cloud.</p>";
			}
			//Unsuccessful response handler
			if (this.readyState == 4 && this.status == 404) {
				document.getElementById("syncResultFromServer").innerHTML="<p>Failed to sync data. No data stored in cloud.</p>";
			}
		};
	
		xhttp.open("GET", "http://introtoapps.com/datastore.php?action=load&appid=800469543&objectid=user-" + username, true);
	
		xhttp.timeout = 5000;
	
		//Response timed out handler
		xhttp.ontimeout = function(e){
			document.getElementById("syncResultFromServer").innerHTML="<p>Failed to sync data. Unable to contact remote server.</p>";
		};
	
		xhttp.send();
	}
	catch(e){
		document.getElementById("syncResultFromServer").innerHTML="<p>Failed to sync data. Not logged in.</p>";
	}
}

//Creates a user account
function createAccount(){
	var username = document.getElementById("newuname").value.replace(/[^a-zA-Z0-9]+/g,'').toLowerCase();
	var pwd = document.getElementById("newpwd").value;
	var retypePwd = document.getElementById("retypenewpwd").value;
	var email = document.getElementById("email").value.replace(/[^a-zA-Z0-9@.]+/g,'');
	var account;
	var encodedData;
		
		//Validate user input
		if(pwd != retypePwd){
			document.getElementById("newAccountResult").innerHTML="<p>Failed to create account. Typed passwords do not match.</p>";
		}
		else if(pwd.length < 6 || pwd.length > 30){
			document.getElementById("newAccountResult").innerHTML="<p>Failed to create account. Password must be between 6 and 30 characters.</p>";
		}
		else if(username != document.getElementById("newuname").value.toLowerCase()){
			document.getElementById("newAccountResult").innerHTML="<p>Failed to create account. Username may only contain letters and numbers.</p>";
		}
		else if(username.length < 6 || username.length > 30){
			document.getElementById("newAccountResult").innerHTML="<p>Failed to create account. Username must be between 6 and 30 characters.</p>";
		}
		else if(email != document.getElementById("email").value || !email.includes("@") || !email.includes(".") || email.indexOf("@") != email.lastIndexOf("@")){
			document.getElementById("newAccountResult").innerHTML="<p>Failed to create account. Not a valid email address.</p>";
		}
		else{
			account = {
				"username": username,
				"password": rstr_sha256(pwd), //Hash password with SHA-256
				"email": email,
			};
		
			encodedData = encodeURI(JSON.stringify(account));
		
			var xhttp = new XMLHttpRequest();
	
			xhttp.onreadystatechange = function() {
				//Successful response handler
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById("newAccountResult").innerHTML="<p>Account successfully created. Logged in as <span style='font-weight: bold'>" + username + "</span>.</p>";
					document.getElementById("goToMyCalendarNewAccount").style.visibility="visible";
					localStorage.setItem('username', username);
				}
				//Unsuccessful response handler
				if (this.readyState == 4 && this.status == 404) {
					document.getElementById("newAccountResult").innerHTML="<p>Failed to create account. Unable to contact remote server.</p>";
				}
			};
			
			xhttp.open("POST", "http://introtoapps.com/datastore.php", true);
			xhttp.timeout = 5000;
	
			//Response timed out handler
			xhttp.ontimeout = function(e){
				document.getElementById("newAccountResult").innerHTML="<p>Failed to create account. Unable to contact remote server.</p>";
			};
			
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("action=append&appid=800469543&objectid=users&data=" + encodedData);
		
		}

	
	return true;
}

//Check if user already exists
function doesUserExist(){	
	var xhttp = new XMLHttpRequest();	
	
	document.getElementById("newAccountResult").innerHTML="<p>Please wait...</p>";
	
	xhttp.onreadystatechange = function(username) {
		var username = document.getElementById("newuname").value;
		var usernames;
		var exists = false;
		
		//Successful response handler
		if (this.readyState == 4 && this.status == 200) {
			usernames = JSON.parse(xhttp.responseText);
			for(var i=0; i<usernames.length; ++i){
				if(usernames[i].username == username){
					exists = true;
				}
			}
			
			if(exists == false){
				createAccount();
			}
			else{
				document.getElementById("newAccountResult").innerHTML="<p>Failed to create account. Username already exists.</p>"
			}
		}
		//Unsuccessful response handler
		if (this.readyState == 4 && this.status == 404) {
			document.getElementById("newAccountResult").innerHTML="<p>Failed to create account. Unable to contact remote server.</p>";
		}
	};
	
	xhttp.open("GET", "http://introtoapps.com/datastore.php?action=load&appid=800469543&objectid=users", true);
	xhttp.timeout = 5000;
	
	//Response timed out handler
	xhttp.ontimeout = function(e){
		document.getElementById("newAccountResult").innerHTML="<p>Failed to create account. Unable to contact remote server.</p>";
	};
	xhttp.send();
	
	return true;
}

//Validate user login
function validateLogin(){	
	var xhttp = new XMLHttpRequest();	
	
	document.getElementById("loginResult").innerHTML="<p>Please wait...</p>";
	document.getElementById("goToMyCalendar").style.visibility="hidden";
	
	xhttp.onreadystatechange = function(username) {
		var username = document.getElementById("uname").value;
		var pwd = document.getElementById("pwd").value;
		//Hash password with SHA-256
		pwd = rstr_sha256(pwd);
		var users;
		var validated = false;
		
		//Successful response handler
		if (this.readyState == 4 && this.status == 200) {
			users = JSON.parse(xhttp.responseText);
			for(var i=0; i<users.length; ++i){
				if(users[i].username == username && users[i].password == pwd){
					validated = true;
				}
			}
			
			if(validated == true){
				document.getElementById("loginResult").innerHTML="<p>Login successful. Logged in as <span style='font-weight: bold'>" + username + "</span>.</p>";
				document.getElementById("goToMyCalendar").style.visibility="visible";
				document.getElementById("loggedIn1").innerHTML="<p>Logged in as <span style='font-weight: bold'>" + username + "</span>.</p>";
				document.getElementById("loggedIn2").innerHTML="<p>Logged in as <span style='font-weight: bold'>" + username + "</span>.</p>";
				document.getElementById("loggedIn3").innerHTML="<p>Logged in as <span style='font-weight: bold'>" + username + "</span>.</p>";
				document.getElementById("alreadyLoggedIn").style.visibility = "visible";
				localStorage.setItem('username', username);
				//Sync events from introtoapps.com/datastore
				//syncFromServer();
			}
			else{
				document.getElementById("loginResult").innerHTML="<p>Login failed. Incorrect username or password.</p>";
			}
		}
		//Unsuccessful response handler
		if (this.readyState == 4 && this.status == 404) {
			document.getElementById("loginResult").innerHTML="<p>Login failed. Unable to contact remote server.</p>";
		}
		
	};
	
	xhttp.open("GET", "http://introtoapps.com/datastore.php?action=load&appid=800469543&objectid=users", true);
	xhttp.timeout = 5000;
	
	//Response timed out handler
	xhttp.ontimeout = function(e){
		document.getElementById("loginResult").innerHTML="<p>Login failed. Unable to contact remote server.</p>";
	};
	
	xhttp.send();
	
	return true;
}

//Log user out
function logOut(){
	localStorage.removeItem('username');
	document.getElementById("loggedIn1").innerHTML="";
	document.getElementById("loggedIn2").innerHTML="";
	document.getElementById("loggedIn3").innerHTML="";
	document.getElementById("alreadyLoggedIn").style.visibility = "hidden";
}

//Check if user is logged in
function checkLoggedIn(){
	try{
		var username = localStorage.getItem('username');
		username = "" + username;
		if(username != "null"){
			document.getElementById("loggedIn1").innerHTML="<p>Logged in as <span style='font-weight: bold'>" + username + "</span>.</p>";
			document.getElementById("loggedIn2").innerHTML="<p>Logged in as <span style='font-weight: bold'>" + username + "</span>.</p>";
			document.getElementById("loggedIn3").innerHTML="<p>Logged in as <span style='font-weight: bold'>" + username + "</span>.</p>";
			document.getElementById("alreadyLoggedIn").style.visibility = "visible";
		}
		else{
			document.getElementById("loggedIn1").innerHTML="";
			document.getElementById("loggedIn2").innerHTML="";
			document.getElementById("loggedIn3").innerHTML="";
			document.getElementById("alreadyLoggedIn").style.visibility = "hidden";
		}
	}
	catch(e){
		document.getElementById("loggedIn1").innerHTML="";
		document.getElementById("loggedIn2").innerHTML="";
		document.getElementById("loggedIn3").innerHTML="";
		document.getElementById("alreadyLoggedIn").style.visibility = "hidden";
	}
}



