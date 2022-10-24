import './css/styles.css';
import PixabayApiService from './js/fetchImages';
import markup from './templates/markupe.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  div: document.querySelector('.gallery'),
  btn: document.querySelector('button'),
  input: document.querySelector('[name=searchQuery]'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  guard: document.querySelector('.guard'),
};

const apiPixabay = new PixabayApiService();

const forGuardOptions = {
  root: null,
  rootMargin: '50px',
  threshold: 1,
};
const observer = new IntersectionObserver(onLoad, forGuardOptions);

function onFormSubmit(e) {
  e.preventDefault();

  apiPixabay.value = e.currentTarget[0].value;

  if (apiPixabay.value.trim() === '') {
    return alert('cant find');
  }

  apiPixabay.resetPage();
  apiPixabay.fetchArticles().then(data => {
    newRenderOnSearch();
    render(data.hits);
    new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      animationSpeed: 300,
      fadeSpeed: 600,
    });
  });

  return;
}

refs.form.addEventListener('submit', onFormSubmit);

function render(data) {
  observer.observe(refs.guard);
  refs.div.insertAdjacentHTML('beforeend', markup(data));

  return;
}

function newRenderOnSearch() {
  refs.div.innerHTML = '';
}

function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      refs.div.insertAdjacentHTML(
        'beforeend',
        apiPixabay.fetchArticles().then(data => render(data.hits))
      );
    }
  });
}
// ------------------------------------------------------------------------
// let page = 1;

// const refs = {
//   form: document.querySelector('.search-form'),
//   div: document.querySelector('.gallery'),
//   btn: document.querySelector('button'),
//   input: document.querySelector('[name=searchQuery]'),
//   loadMoreBtn: document.querySelector('.load-more-btn'),
// };

// async function onFormSubmit(e) {
//   e.preventDefault();
//   const searchValue = e.currentTarget[0].value;
//   await seacrhPixabay(searchValue).then(updateTemplates);
//   new SimpleLightbox('.gallery a', {
//     captionsData: 'alt',
//     captionDelay: 250,
//   });
//   return;
// }

// refs.form.addEventListener('submit', onFormSubmit);

// function updateTemplates(data) {
//   return refs.div.insertAdjacentHTML('beforeend', markup(data.hits));
// }

// // refs.loadMoreBtn.addEventListener('click', onLoad);

// // function onLoad() {
// //   page += 1;
// //   console.log();
// //   updateTemplates(page).then(data => {
// //     refs.div.insertAdjacentHTML('beforeend', markup(data.hits));
// //     console.log(data);
// //     console.log(page);
// //     console.log(data.hits);
// //     if (data.page === data.pages) {
// //       refs.loadMoreBtn.setAttribute('hidden', true);
// //     }
// //   });
// // }

// // const ccc = new SimpleLightbox('.gallery a', {
// //   captionsData: 'alt',
// //   captionDelay: 250,
// //   overlay: true,
// // });
// // const timeOut = window.setTimeout(ccc, 2000);
