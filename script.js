const apiKey = "816f3bd0d2e1edc2b9454440b705ec86"; //  API key

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "❗ Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    resultDiv.innerHTML = "🔄 Loading...";
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const weather = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
      `;
      resultDiv.innerHTML = weather;
    } else {
      resultDiv.innerHTML = `❌ City "${city}" not found.`;
    }
  } catch (error) {
    resultDiv.innerHTML = "❌ Error fetching weather data.";
    console.error(error);
  }
}
