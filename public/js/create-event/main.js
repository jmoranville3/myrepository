jQuery(function($) {
	var services = {
		post: function(event) {
			$.ajax({
				url: "/create-event",
				type: "POST",
				data: JSON.stringify(utility.getJSON()),
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(data) {
					console.log(data);
				}
			});
			alert(JSON.stringify(utility.getJSON()));
		}
	};

	var utility = {
		getDates: function() {
			return { "dates": "Hey!"};
			//return $("#currentData").text();
		},

		getJSON: function () {
			var jsonTemplate = {
				"event_name": "Birthday Party",
				"event_type": "recurring",
				"proposed_dates": [
				],
				"creator_name": "ME",
				"creator_email": "trash@thegarbagecan.com",
				"member_email": ["a@dsf.com", "b@dsf.com"],
				"description": "this is a test"
			}

			for (var j = 0; j < 7; j++) {
				var dateJson = {
					"date" : "10/" + j + "/2014",
					"times" : []
				};
				var start = null;
				var end = null;
				for (var i = 0; i < 24; i++) {
					if (start == null && enabled[i][j]) {
						start = i + 1;
					} else if (start != null && !enabled[i][j]) {
						end = i;
						dateJson.times.push(
							{
								"start" : start + ":00",
								"end" : end + ":00"
							}
						);
						start = null;
						end = null;
					}
				}
				if (start != null) {
					dateJson.times.push(
						{
							"start" : "" + start + ":00",
							"end" : "" + (enabled.length - 1) + ":00"
						}
					);
				}
				if (dateJson.times.length > 0) {
					jsonTemplate.proposed_dates.push(dateJson);
				}
			}
			return jsonTemplate;
		}
	};

	var dates = utility.getDates();

	$("#testPost").click({ "dates": dates }, services.post);

	var enabled = new Array(24);
	for (var i = 0; i < enabled.length; i++) {
		enabled[i] = new Array(7);
		for(var j = 0; j < 7; j++) {
			enabled[i][j] = false;
		}
	}

	$('.timeslot').click(function () {
		var $button = $(this);
		var dayIndex = $button.attr("wib-day");
		var timeIndex = $button.attr("wib-time");
		if (enabled[timeIndex][dayIndex]) {
			$button.css("border", "0px solid #000");
			enabled[timeIndex][dayIndex] = false;
		} else {
			$button.css("border", "1px solid #0F0");
			enabled[timeIndex][dayIndex] = true;
		}
	});

	$('#sendButton').click(function (event) {
		services.post(event);
	});
});
