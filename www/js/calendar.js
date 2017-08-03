/*

Filename: calendar.js
Code source: Web Code Geeks(https://www.webcodegeeks.com/javascript/javascript-calendar-example/)

*/

function displayCalendar(mon){


    var htmlContent ="";
    var FebNumberOfDays ="";
    var counter = 1;


    var dateNow = new Date();
    var month = mon;
    var day = dateNow.getDate();
    var year = dateNow.getFullYear();

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
            htmlContent +="<td class='dayNow' " + "><a onclick='return displayEvents(" + counter + ");' href='#pg3'>"+counter+"</a></td>";
				//   onMouseOver='this.style.background=\"#FFFF00\"; this.style.color=\"#FFFFFF\"'
				//onMouseOut='this.style.background=\"#FFFFFF\"; this.style.color=\"#00FF00\"'
        }
		else if(month == dateNow.getMonth()){
            htmlContent +="<td class='monthNow' "+" ><a onclick='return displayEvents(" + counter + ");' href='#pg3'>"+counter+"</a></td>";
			//onMouseOver='this.style.background=\"#FFFF00\"'
			//onMouseOut='this.style.background=\"#FFFFFF\"'
        }
		else{
			htmlContent +="<td class='monthNow' "+" >"+counter+"</td>";
		}
			
		
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

//Display events for a particular day in August
function displayEvents(day){
	var augustEvents = ["", "", "", "", "", "", "", "", "", "", "", "Golf 2:00pm", "", "Doctor's appointment 10:00am|Pick up groceries", "", "", "", "", "", "", "", "", "", "", "", "Do laundry|Karaoke night", "", "", "", "", ""];
	
	var htmlCode = "<h4>Events for August " + day + ", 2017</h4>";
	if(augustEvents[day - 1] == "")
	{
		htmlCode += "<p>No events</p>";
	}
	else
	{
		var events = augustEvents[day - 1].split("|");
		
		htmlCode += "<ul>";
		
		for(var i=0; i<events.length; i++)
		{
			htmlCode += "<li>" + events[i] + "</li>";
		}
		
		htmlCode += "</ul>";
	}
	
	//Set HTML
	document.getElementById("dayEvents").innerHTML=htmlCode;
	return true;
}
