// Função para obter dados climáticos
const API_KEY = 'aqui vai a sua chave de API'; // Chave de API do OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const fetchWeatherData = async (city) => {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`;

  // Faz a requisição para a API
  const response = await fetch(url);

  // Verifica se a requisição foi bem sucedida
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Erro ao buscar dados climáticos: ${response.status} - ${response.statusText}`);
    console.error(`Detalhes do erro: ${errorText}`);
    throw new Error('Erro ao buscar dados climáticos');
  }

  return await response.json();

};

// Função para buscar o clima e exibir na tela
async function buscarClima() {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('weatherResult');

  try {
    const data = await fetchWeatherData(city);
    resultDiv.innerHTML = `
          <h2>${data.name}</h2>
          <p>Temperatura: ${Math.round(data.main.temp)}°C</p>
          <p>Sensação térmica: ${Math.round(data.main.feels_like)}°C</p>
          <p>Umidade: ${data.main.humidity}%</p>
          <p>Condição: ${data.weather[0].description}</p>
          <p>Vento: ${Math.round(data.wind.speed * 3.6)} km/h</p>
      `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`;
  }
}