// Confirm JS is connected
console.log("JavaScript connected successfully");

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "1d93cafcfd9aa2dbaf23dec595657e91"; // <-- PUT YOUR API KEY HERE
  const resultDiv = document.getElementById("result");
  const body = document.body;

  // Validation
  if (city.trim() === "") {
    resultDiv.innerHTML = "Please enter a city name";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        resultDiv.innerHTML = "City not found";
        return;
      }

      // Display weather details
      resultDiv.innerHTML = `
        <p><b>City:</b> ${data.name}</p>
        <p><b>Temperature:</b> ${data.main.temp} °C</p>
        <p><b>Weather:</b> ${data.weather[0].description}</p>
        <p><b>Humidity:</b> ${data.main.humidity}%</p>
      `;

      // Background change based on weather
      const weatherType = data.weather[0].main.toLowerCase();

      if (weatherType.includes("cloud")) {
        body.style.backgroundImage = "url('images/clouds.jpg')";
      } else if (weatherType.includes("rain")) {
        body.style.backgroundImage = "url('images/rain.jpg')";
      } else if (weatherType.includes("clear")) {
        body.style.backgroundImage = "url('images/clear.jpg')";
      } else if (weatherType.includes("snow")) {
        body.style.backgroundImage = "url('images/snow.jpg')";
      } else {
        // No default image → keep current background
        body.style.backgroundImage = "";
      }

      body.style.backgroundSize = "cover";
      body.style.backgroundRepeat = "no-repeat";
      body.style.backgroundPosition = "center";
    })
    .catch(error => {
      console.error(error);
      resultDiv.innerHTML = "Error fetching weather data";
    });
}