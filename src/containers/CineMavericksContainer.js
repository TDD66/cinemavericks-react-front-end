import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navigation from "../components/Navigation";
import Cinema from "../components/Cinema";
import Movies from "../components/Movies";
import Movie from "../components/Movie";

const CineMavericksContainer = () => {
    
    const [movies, setMovies] = useState([]);
    const [movieLists, setMovieLists] = useState([]);
    const [highestRatedMovies, setHighestRatedMovies] = useState([]);
    
    const fetchMovies = async () => {
        const response = await fetch("http://localhost:8080/movies");
        const data = await response.json();
        setMovies(data);
    };

    const fetchMovieLists = async () => {
        const response = await fetch("http://localhost:8080/movielists");
        const data = await response.json();
        setMovieLists(data);
    };

    const fetchHighestRatedMovies = async () => {
        const response = await fetch("http://localhost:8080/movies");
        const data = await response.json();
        const sortedData = data.sort((movie1, movie2) => {
            return movie2.averageRating - movie1.averageRating;
        })
        setHighestRatedMovies(sortedData.slice(0,5));
    };

    const movieLoader = ({params}) => {
        return movies.find(movie => {
            return movie.id === parseInt(params.id);
        });
    }

    
    const cineMaverickRoutes = createBrowserRouter([
        {
            path: "/",
            element: <Navigation />,
            children: [
                {
                    path: "/cinema",
                    element: <Cinema 
                        movies={movies}
                        highestRatedMovies={highestRatedMovies}
                        movieLists={movieLists}
                    />
                },
                {                  
                    path: "/cinema/:userId", 
                    element: <Cinema 
                        movies={movies}
                        highestRatedMovies={highestRatedMovies}
                        movieLists={movieLists}
                    />
                },                 
                {
                    path: "/movies",
                    element: <Movies 
                        movies={movies}
                    />
                },
                {
                    path: "/movies/:id",
                    loader: movieLoader,
                    element: <Movie />
                }                
            ]
        }
    ]);


    useEffect(() => {
        fetchMovies();
        fetchMovieLists();
        fetchHighestRatedMovies();
    }, []);

    return (  
        <>
           <RouterProvider router={cineMaverickRoutes}/>
        </>
    );
}
 
export default CineMavericksContainer;