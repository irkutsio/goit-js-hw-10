import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
inputEl.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch() {
  fetchCountries(inputEl.value.trim())
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length > 1 && data.length < 10) {
        countryInfo.innerHTML = createPreviewMarkUp(data);
        countryList.innerHTML = '';
      } else if (data.length === 1) {
        countryList.innerHTML = createMarkUp(data);
        countryInfo.innerHTML = '';
      };
    })
    .catch(error => {
      console.log(error);
      if (error.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name.');
        resetMarkup();
      } else {
        console.log(error.message);
        Notiflix.Notify.failure(error.message);
        resetMarkup();
      }
    });
}

function createMarkUp(countriesArr) {
  return countriesArr
    .map(
      ({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
      }) => `<li class="country"><div class="flex">
  <img width="50" src="${svg}" alt="${official}">
   <h2>${official}</h2></div>
   <h3>Capital: ${capital} </h3>
   <p>Population: ${population}</p>
   <p>Languages: ${Object.values(languages)}</p>
 </li>`
    )
    .join('');
}

function createPreviewMarkUp(countriesArr) {
  return countriesArr
    .map(
      ({ name: { official }, flags: { svg } }) => `<li class="flex">
      <img width ="50" src="${svg}" alt="${official}"> <p class="preview-name">${official}</p></li>`
    )
    .join('');
}

function resetMarkup() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
