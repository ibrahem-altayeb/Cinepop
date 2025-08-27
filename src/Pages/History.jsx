import { Link } from "react-router-dom";
import { GlobalContext } from "../Components/Context";
import { useContext } from "react";


const History = () => {
  const { historyMovie } = useContext(GlobalContext);
  


  return (
    <div> 
        <Link to={`/movie/${historyMovie.movie_id}`}>
        {historyMovie.length > 0 && ( 
            <section className="history"> 
            <h2>History Movie</h2> 
            <ul> {historyMovie.map((movie, index) => ( 
                <li key={movie.$id}> 
                <p>{index + 1}</p> 
                <img src={movie.poster_url} alt={movie.title || "Movie poster"} /> </li> ))}
                 </ul> 
                 </section>
                 )}
                 </Link>
                  </div>
  );
};

export default History;
