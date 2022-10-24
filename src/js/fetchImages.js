// const BASE_URL = 'https://pixabay.com/api/';
// const KEY = '30765883-517ae795d1e2950758ca42c2f';

// // export async function seacrhPixabay(searchValue) {
// //   const response = await fetch(`${BASE_URL}?key=${KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=4`);
// //   const images = await response.json();
// //   return images;
// // }

// export default class PixabayApiService {
//   constructor() {
//     this.searchValue = '';
//     this.page = 1;
//   }

//   fetchArticles() {
//     const url = `${BASE_URL}?key=${KEY}&q=${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=5`;
//     return fetch(url)
//       .then(res => res.json())
//       .then(({ hits }) => {
//         this.page += 1;
//         return hits;
//       });
//   }
//   resetPage() {
//     this.page = 1;
//   }
//   get value() {
//     return this.searchValue;
//   }
//   set value(newValue) {
//     this.searchValue = newValue;
//   }
// }
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30765883-517ae795d1e2950758ca42c2f';

// export async function seacrhPixabay(searchValue) {
//   const response = await fetch(`${BASE_URL}?key=${KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=4`);
//   const images = await response.json();
//   return images;
// }

export default class PixabayApiService {
  constructor() {
    this.searchValue = '';
    this.page = 1;
  }

  async fetchArticles() {
    const url = `${BASE_URL}?key=${KEY}&q=${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=20`;
    this.page += 1;
    const response = await axios.get(url);
    return response.data;
  }

  resetPage() {
    this.page = 1;
  }

  get value() {
    return this.searchValue;
  }
  set value(newValue) {
    this.searchValue = newValue;
  }
}
