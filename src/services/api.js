
//Base URL: https://api.themoviedb.org/3/
//URL da API: /movie/now_playing?api_key=fd2aee32a57bc8b79974f3800795ec98&language=pt-br


import axios from "axios";

const api = axios.create({

    baseURL: 'https://api.themoviedb.org/3/'
});


export default api;