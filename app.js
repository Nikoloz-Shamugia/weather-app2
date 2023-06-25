let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let year = today.getFullYear();

const date = dd + '/' + mm + '/' + year;

const apiKey = 'c18e3390fa850e266649a33c456a631b';

async function checkWeather(city) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const result = await fetch(apiUrl);
    const data = await result.json();

    const wrapper = document.querySelector('.cards');
    const div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('data-city', city);
    wrapper.appendChild(div);
    div.innerHTML = `
      <button class="delete-button">delete</button>
      <div class = 'flex-box'>
        <div>
          <img class = "weather-icon" src="">
        </div>
        <div class = 'date'>
          <p>${data.name}</p>
          <span>${date}</span>
        </div>
      </div>
      <div>
        <h1 class = "temp">${data.main.temp.toFixed(1)} °C</h1>
      </div>
      <div class = "info-wrapper">
        <div>
          <p>${data.main.humidity} %</p>
          <span>Humidity</span>
        </div>
        <div>
          <p>${data.wind.speed} km/hr</p>
          <span>wind speed</span>
        </div>
      </div>
    `;

    const img = div.querySelector('img');
    if (data.weather[0].main == 'Clouds') {
      img.src = 'images/logo.svg';
    } else if (data.weather[0].main == 'Clear') {
      img.src = 'images/clear.png';
    } else if (data.weather[0].main == 'Rain') {
      img.src = 'images/rain.png';
    } else if (data.weather[0].main == 'Drizzle') {
      img.src = 'images/drizzle.avif';
    } else if (data.weather[0].main == 'Mist') {
      img.src = 'images/mist.png';
    }

    const deleteBtn = div.querySelector('.delete-button');
    deleteBtn.addEventListener('click', () => {
      const cardToRemove = document.querySelector(`[data-city="${city}"]`);
      if (cardToRemove) {
        cardToRemove.remove();
      }
    });

  } catch (error) {
    const card = document.querySelector('.card')
    card.style.display = 'none'
    const p = document.querySelector('.vanish');
    p.style.display = 'block';

  }
}
const cardsWrapper = document.querySelector('.cards');

const input = document.querySelector('.input')
const btn2 = document.querySelector('.search-btn')
btn2.addEventListener('click' , () =>{
    checkWeather(input.value)
})

