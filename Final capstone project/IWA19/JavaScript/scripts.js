import { authors, genres, books, BOOKS_PER_PAGE } from './data.js';
//Importing variables from the data.js


const matches = books      
let page = 1;              

if (!books && !Array.isArray(books)) {throw new Error('Source required') }
if (!page && page.length < 2) {throw new Error('Range must be an array with two numbers')}

//Variables for night and day

const day = {               
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {            
    dark: '255, 255, 255',
    light: '10, 10, 20',
}


const fragment = document.createDocumentFragment()   
let startIndex = 0;                                  
let endIndex = 36;                                   
const extracted = books.slice(startIndex, endIndex)

for (let i = 0; i < extracted.length; i++) {          
    const preview = document.createElement('dl')      
    preview.className = 'preview'                     

    preview.dataset.id = books[i].id
    preview.dataset.title = books[i].title
    preview.dataset.image = books[i].image
    preview.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`
    preview.dataset.description = books[i].description
    preview.dataset.genre = books[i].genres

   
    preview.innerHTML=/*html*/ `
    <div>
    <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
    </div>
    <div class='preview__info'>
    <dt class='preview__title'>${books[i].title}<dt>
    <dt class='preview__author'> By ${authors[books[i].author]}</dt>
    </div>`

     
    fragment.appendChild(preview)
    }
const booklist1 = document.querySelector('[data-list-items]') 
booklist1.appendChild(fragment)

const searchbutton = document.querySelector("[data-header-search]");
searchbutton.addEventListener('click', () => {
 document.querySelector("[data-search-overlay]").style.display = "block";
})

const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener('click', () => {
 document.querySelector("[data-search-overlay]").style.display = "none";
})

const settingbutton = document.querySelector("[data-header-settings]")
settingbutton.addEventListener('click', () => {
 document.querySelector("[data-settings-overlay]").style.display = "block";
})

const settingCancel = document.querySelector('[data-settings-cancel]')
settingCancel.addEventListener('click', () => {
document.querySelector("[data-settings-overlay]").style.display = "none";
})

const dataSettingsTheme = document.querySelector('[data-settings-theme]');

const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary");
saveButton.addEventListener('click', handleClick);

function handleClick(event) {
  event.preventDefault();
  const value = dataSettingsTheme.value;
  const body = document.querySelector('body');
  const overlay = document.querySelector("[data-settings-overlay]");
  
  const themes = {
    day: {
      dark: '#000000',
      light: '#FFFFFF'
    },
    night: {
      dark: '#111111',
      light: '#CCCCCC'
    }
  };

  if (value === 'day') {
    setThemeColors(body, themes.day.dark, themes.day.light);
    overlay.style.display = "none";
  }
  
  if (value === 'night') {
    setThemeColors(body, themes.night.dark, themes.night.light);
    overlay.style.display = "none";
  }
}

function setThemeColors(element, darkColor, lightColor) {
  element.style.setProperty('--color-dark', darkColor);
  element.style.setProperty('--color-light', lightColor);
}
//Now the code properly includes the day and night objects with their corresponding color values.


const authorSelect = document.querySelector("[data-search-authors]");
const genreSelect = document.querySelector("[data-search-genres]");

Object.entries(authors).forEach(([authorId, authorName]) => {
  const optionElement = createOptionElement(authorId, authorName);
  authorSelect.appendChild(optionElement);
});

Object.entries(genres).forEach(([genreId, genreName]) => {
  const optionElement = createOptionElement(genreId, genreName);
  genreSelect.appendChild(optionElement);
});

function createOptionElement(value, text) {
  const optionElement = document.createElement('option');
  optionElement.value = value;
  optionElement.textContent = text;
  return optionElement;
}
//Object.entries() is used to iterate over the authors and genres objects, allowing us to access both the key and value of each entry.


const detailsToggle = (event) => {  
    const overlay1 = document.querySelector('[data-list-active]');
    const title = document.querySelector('[data-list-title]')
    const subtitle = document.querySelector('[data-list-subtitle]')
 const description = document.querySelector('[data-list-description]')
    const image1 = document.querySelector('[data-list-image]')
    const imageblur = document.querySelector('[data-list-blur]')
    event.target.dataset.id ? overlay1.style.display = "block" : undefined;
    event.target.dataset.description ? description.innerHTML = event.target.dataset.description : undefined;
    event.target.dataset.subtitle ? subtitle.innerHTML = event.target.dataset.subtitle : undefined;
    event.target.dataset.title ? title.innerHTML = event.target.dataset.title : undefined;
    event.target.dataset.image ? image1.setAttribute ('src', event.target.dataset.image) : undefined;
    event.target.dataset.image ? imageblur.setAttribute ('src', event.target.dataset.image) : undefined;
};
const detailsClose = document.querySelector('[data-list-close]')    
detailsClose.addEventListener('click', () => {
document.querySelector("[data-list-active]").style.display = "none";
});

const bookclick = document.querySelector('[data-list-items]')
bookclick.addEventListener('click', detailsToggle)

const showMoreButton = document.querySelector('[data-list-button]')
    
    const numItemsToShow = Math.min(books.length - endIndex,)
    const showMoreButtonText = `Show More (${numItemsToShow})`
    showMoreButton.textContent = showMoreButtonText

showMoreButton.addEventListener('click', () => {         
    const fragment = document.createDocumentFragment()
    startIndex += 36;
    endIndex += 36;
    const startIndex1 = startIndex
    const endIndex1 = endIndex
    console.log(startIndex1)
    console.log(endIndex1)
    const extracted = books.slice(startIndex1, endIndex1)
    for (const {author ,image, title, id , description, published} of extracted) {
        const preview = document.createElement('dl')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description
        

        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`
        fragment.appendChild(preview)
    }
    
    const booklist1 = document.querySelector('[data-list-items]') 
    booklist1.appendChild(fragment)
});