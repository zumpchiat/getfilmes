
import { useEffect, useState } from "react";
//URL da API: /movie/now_playing?api_key=fd2aee32a57bc8b79974f3800795ec98&language=pt-br
import api from "../../services/api";
import { Link } from "react-router-dom";
import './style.css';

function Home() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("/movie/now_playing", {
                params: {
                    api_key: "fd2aee32a57bc8b79974f3800795ec98",
                    language: "pt-br",
                    page: 1,
                }
            })
            // console.log(response.data.results.slice(0, 10));
            setFilmes(response.data.results.slice(0, 20))
        }

        loadFilmes();
    }, [])

    return (
        <div className="container">
            <div className="lista_filme">

                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                                alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>

        </div>
    );
}

export default Home;
