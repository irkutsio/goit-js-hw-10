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
      } else {
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
      }
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name.')
    );
};

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
};


function createPreviewMarkUp(countriesArr) {
  return countriesArr
    .map(
      ({  name: { official }, flags:{ svg }}) => `<li class="flex">
      <img width ="50" src="${svg}" alt="${official}"> <p class="preview-name">${official}</p></li>`
    )
    .join('');
};


