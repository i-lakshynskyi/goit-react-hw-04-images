import axios from 'axios';


function getImagesAPI(q, page, per_page) {
  const baseURL =
    `https://pixabay.com/api/?q=${q}&page=${page}&key=28643198-45e8a339dbe8b884e89e95c2b&image_type=photo&orientation=horizontal&per_page=${per_page}`;
  return axios.get(baseURL);
}

export { getImagesAPI };
