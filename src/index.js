import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list')
inputEl.addEventListener('input', onCountrySearch);

function onCountrySearch() {
  fetchCountries(inputEl.value)
    .then(data => {
      if (data.length > 10) {
        console.log('too many matches'); // сделать красиво
      } else {
        countryList.innerHTML = createMarkUp(data);
      }
    })
    .catch(error => console.log(error));
}


function createMarkUp (countriesArr) {
    return countriesArr.map(({name:{official}, capital,
        population, flags:{svg}, languages}) => `<li>
    <img src="${svg}" alt="${official}">
     <h2>${official}</h2>
     <h3>Capital:${capital} </h3>
     <p>Population:${population}</p>
     <p>Languages:${Object.values(languages)}</p>
   </li>`).join('');
   
};

