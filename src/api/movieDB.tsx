import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'e3970657e6ed21d27310737971724cb7',
        lenguage: 'es-ES'
    }
});

export default movieDB;