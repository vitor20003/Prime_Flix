import {useEffect , useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import api from '../../services/api'
import './filme.css'
import {toast} from 'react-toastify'
function Filmes(){
    const {id} = useParams()
    const navigation = useNavigate();
    const [filme,setFilme] = useState({})
    const [loading, setLoading] = useState(true)

     useEffect(()=>{
        async function load_api(){
            await api.get(`/movie/${id}`,
                {
                    params:{
                        api_key: "f26b6c1543111bf0c6b9f3cae16ba67e", 
                language: "pt-br",
                page: 1
                    }
                }
            ).then((response)=>{
                setFilme(response.data)
                setLoading(false)
            }).catch(()=>{
                navigation('/', {replace: true})
                return;
            })
        }
        load_api();

      
            
        
     },[])


     if(loading){
        return(<div className='filme-info'>
            <h1>
                Carregando Filme
            </h1>
        </div>)}

        function salvarFilme(){
           const minhaLista = localStorage.getItem("@primeFlix");

           let filmesSalvos = JSON.parse(minhaLista) || []

           const hasfilme = filmesSalvos.some((filmesSalvoss) => filmesSalvoss.id === filme.id)

           if(hasfilme){
            toast.warn("Este filme ja foi salvo")
            return
           }

           filmesSalvos.push(filme);

           localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos))
           toast.success("filme salvo com sucesso")
        }

    return(

        <div className='filme-info'>
             <strong> {filme.title}</strong>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinpose</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} </strong>
            
            <div className='botoes'>
                <button onClick={salvarFilme}>Salvar</button>
                <button> 
               <a target="blank" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}> 
                Trailer

               </a>
                </button>
            </div>
        </div>
    )
}
export default Filmes;