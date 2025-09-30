function get_weather_btn() {
  if(!!document.getElementsByClassName("climate-icon")[0]){
          document.getElementsByClassName("climate-icon")[0].remove();
       }
  var city = document.getElementsByClassName("search_box")[0].value;

  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f00c38e0279b7bc85480c3fe775d518c&units=metric")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementsByClassName('cards')[0].style.display = "block";  
      document.getElementsByClassName('city_name')[0].innerText = data.name + " - " + data.sys.country;
      var mintemp = data.main.temp_min;//min tem and max temp
      var maxtemp = data.main.temp_max;
      document.getElementsByClassName('min_temp')[0].innerHTML = "&#8595; " + mintemp + "°C";
      document.getElementsByClassName('max_temp')[0].innerHTML = "&#x2191; " + maxtemp + "°C";
      var windspeed = data.wind.speed;//wind details
      var winddeg = data.wind.deg;
      document.getElementsByClassName('wind_speed_deg')[0].innerHTML = "Speed: " + windspeed + " m/s, deg: " + winddeg;
      var timezoneOffset = data.timezone;
      var localDate = new Date((data.dt + timezoneOffset) * 1000); 
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      var formattedDate = localDate.toLocaleDateString('en-IN', options);
      document.getElementsByClassName('day_name')[0].innerHTML = formattedDate;
      document.getElementsByClassName("humidity")[0].innerHTML = data.main.humidity + "%";
      document.getElementsByClassName("weather")[0].innerHTML = data.main.temp + " °C";
      document.getElementsByClassName('realfeel')[0].innerHTML = data.main.feels_like + " °C";
      document.getElementsByClassName('Pressure')[0].innerHTML = data.main.pressure;
      document.getElementsByClassName('climate')[0].innerHTML=data.weather[0].main;
       var icon_set= document.getElementsByClassName('weather_icon')[0];
       var create_icon=document.createElement("i");

      if(data.weather[0].main=="Haze"){
       create_icon.setAttribute("class","fa-solid fa-cloud-sun climate-icon");
       icon_set.append(create_icon)
      }
      else if (data.weather[0].main=="Clouds"){
        
       create_icon.setAttribute("class","fa-solid fa-cloud climate-icon");
       icon_set.append(create_icon)

      }
      else if (data.weather[0].main=="Clear"){
 
       create_icon.setAttribute("class","fa-solid fa-sun climate-icon");

       icon_set.append(create_icon)

      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      alert("City not found. Please try again!");
    });
}
