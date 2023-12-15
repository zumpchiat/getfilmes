import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import "./style.css";
import { toast } from "react-toastify";


function Filme() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {

        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "fd2aee32a57bc8b79974f3800795ec98",
                    language: "pt-br",
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    console.log("Filme não encontrado");
                    navigate("/", {replace: true});
                    return;

                })
        }

        loadFilme();
        return () => {
            console.log("COMPONETE DESMONTADO")
        }

    }, [id, navigate]);

    function salvarFilme(){
        
     
        //pegar minha lista 
        const minhaLista = localStorage.getItem("@primeflix");

        // verificar se existe lista,caso não crie uma 

        let filmesSalvos = JSON.parse(minhaLista) || [];

        // verifica se  ID é igual ao ID da lista

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)
        
        if(hasFilme){
            
            toast.warn("Ops!! filme já cadastrado na lista.")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");




    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes do filme...</h1>

            </div>
        )
    }

    return (
        <div className="filme-info">

            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
                alt={filme.title} />

                <h3>Sinopse</h3>

                <span>{filme.overview}</span>

                <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons"> 

                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="noopener" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                
                        Trailler
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme; 