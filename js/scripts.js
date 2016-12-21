$(document).ready(function(){

	$('#weather-form').submit(function(){
		event.preventDefault();
		var location = $('#location').val();
		var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip='+location+',us&appid='+apiKey;

		$.getJSON(weatherUrl, function(weatherData){
		// console.log(weatherData);
			var currTemp = weatherData.main.temp;
			var currHumid = weatherData.main.humidity;
			var currTempText = Math.floor(currTemp)+'\xB0';
			// console.log(currTemp)
			var name = weatherData.name;
			$('#condition').html(weatherData.weather[0].description);
			$('#wind').html(weatherData.wind.speed+"mph");
			$('#humidity').html(weatherData.main.humidity+"%");
			var icon = weatherData.weather[0].icon+'.png';
			$('#currTemp').html("<img src=http://openweathermap.org/img/w/"+icon+">The temperature in "+name+" is currently:");
			var canvas = $('#weather-canvas');
			var context = canvas[0].getContext('2d');
			var tempColor = "black";
			if(currTemp < 32){
				tempColor = "skyblue";
			}else if(currTemp < 60){
				tempColor = "steelblue";
			}else if(currTemp < 80){
				tempColor = "orange";
			}else if(currTemp > 79){
				tempColor = "tomato";
			}

			var currPercent = 0;
			function animate(current){
				// draw inner circle
				$('#weather-canvas').addClass('hide-bg')
				context.clearRect(0,0,500,500)
				context.fillStyle = "white";
				context.beginPath();
				context.arc(155,75,65,Math.PI*0,Math.PI*2);
				context.closePath();
				context.fill();
				// console.log(weatherData)

				context.font = "50px Arial"
				context.fillStyle = tempColor;
				context.fillText(currTempText,125,90)


				// draw outer line
				context.lineWidth = 10; //this outer line
				context.strokeStyle = tempColor;
				context.beginPath();
				context.arc(155,75,70,Math.PI*1.5,(Math.PI*2*current) + Math.PI*1.5);
				context.stroke(); //stroke not fill
				currPercent++; //increment currPerc 
				if(currPercent < currTemp){
					requestAnimationFrame(function(){
						animate(currPercent / 100);
					});
				}
			}
			animate();
			console.log(weatherData);
		});
	})
});