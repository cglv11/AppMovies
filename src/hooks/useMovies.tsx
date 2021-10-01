import { useEffect, useState } from "react"
import movieDB from "../api/movieDB"
import { MovieDBResponse, Movie } from "../interfaces/movieInterface"

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

export const useMovies = () => {

    const [ isLoading, setIsLoading ] = useState(true)

    const [ moviesState , setsetMoviesState ] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
    })

    const getMovies = async () => {

        const nowPlayingPromise = movieDB.get<MovieDBResponse>('/now_playing');
        const popularPromise    = movieDB.get<MovieDBResponse>('/popular');
        const topRatedPromise   = movieDB.get<MovieDBResponse>('/top_rated');
        const upComingPromise   = movieDB.get<MovieDBResponse>('/upcoming');
        
        const resp = await Promise.all([ 
            nowPlayingPromise, 
            popularPromise, 
            topRatedPromise, 
            upComingPromise 
        ])

        setsetMoviesState( { 
            nowPlaying: resp[0].data.results,
            popular: resp[1].data.results,
            topRated: resp[2].data.results,
            upcoming: resp[3].data.results,
        })

        setIsLoading( false );
    }

    useEffect(() => {
        // now_playing
        getMovies();

    }, [])
    

    return {
        ...moviesState,
        isLoading,
    }

}