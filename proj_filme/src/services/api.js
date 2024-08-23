import axios from 'axios'
//  base url https://api.themoviedb.org/3/
// url da api movie/157336?api_key=f26b6c1543111bf0c6b9f3cae16ba67e&append_to_response=videos,images

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
}

)
export default api;