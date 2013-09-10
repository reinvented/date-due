var iCalLinks = [];
var iCalCounter = 1;

$('#process-btn').bind('click', function() {
	$("#ical-links").html('');
	inputString = $("#date-due-text").val();
	lines = inputString.split('\n');
	var lookForBook = false;
	var lookForAuthor = false;
	var lookForDate = false;
	for (index = 0; index < lines.length; ++index) {
		if (lines[index].substring(4,15) == 'call number') {
			lookForBook = true;
	  }
	  else if (lookForBook) {
		  theBook = lines[index].substring(4);
		  lookForBook = false;
		  lookForAuthor = true;
	  }
	  else if (lookForAuthor) {
		  theAuthor = lines[index].substring(4);
		  lookForAuthor = false;
		  lookForDate = true;
	  }
	  else if (lookForDate) {
		  dateDue = lines[index].substring(8);
		  theDate = moment(dateDue, "D/M/YYYY,hh:mm").format("YYYYMMDD");
		  theDatePretty = moment(dateDue, "D/M/YYYY,hh:mm").format("dddd, MMMM Do YYYY");

			ical = "";
			ical += "BEGIN:VCALENDAR\n";
			ical += "CALSCALE:GREGORIAN\n";
			ical += "PRODID:-//Reinvented Inc.//DateDue 1.1//EN\n";
			ical += "VERSION:2.0\n";
			ical += "METHOD:PUBLISH\n";
			ical += "BEGIN:VEVENT\n";
			ical += "TRANSP:TRANSPARENT\n";
			ical += "LOCATION:" + lines[2] + "\n";
			ical += "STATUS:CONFIRMED\n";
			ical += "SUMMARY:" + theBook + "\n";
			ical += "DTSTART;VALUE=DATE:" + theDate + "\n";
			ical += "DTEND;VALUE=DATE:" + theDate + "\n";
			ical += "END:VEVENT\n";
			ical += "END:VCALENDAR\n";
			
			iCalLinks[iCalCounter] = ical;

			$("#ical-links").append('<h2>' + theBook + '</h2><p><img src="images/ical-icon.png" align="absmiddle"> <a href="javascript:sendIcal(' + iCalCounter + ')">Due on ' + theDatePretty + '</a></p>');

			iCalCounter++;

		  lookForDate = false;
	  }
	}
});

function sendIcal(counter) {
	window.open("data:text/calendar;charset=utf8," + escape(iCalLinks[counter]));
}
