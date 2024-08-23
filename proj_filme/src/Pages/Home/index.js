
import {useEffect , useState} from 'react'
import api from '../../services/api'
import {Link} from 'react-router-dom'
import './home.css'

// movie/157336?api_key=f26b6c1543111bf0c6b9f3cae16ba67e&append_to_response=videos,images
function Home(){
    const [filmes, setFilmes]= useState([])
    const [loading,setloading] = useState(true)

    useEffect(()=>{
        async function load_api() {
            const response = await api.get("movie/now_playing", {
            params:{
                api_key: "f26b6c1543111bf0c6b9f3cae16ba67e", 
                language: "pt-br",
                page: 1
            }    
            })
            console.log(response.data.results.slice(0,10))
            setFilmes(response.data.results.slice(0,10))
            setloading(false)
        }
        load_api();
    },[])

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando filme</h2>
            </div>
            
        )
    }
    return(
      
        <div className='container'>
            <div className='lista-filmes'>
                {
                  filmes.map((filme)=> {
                    return(
                        <article key={filme.id}>
                        <strong> {filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}>
                      
                        
                    </img>
                    <Link to={`/filmes/${filme.id}`}>Acessar</Link>
                    </article>
                    
                    )
                    
                  })  
                }

            </div>

        </div>
    )
}
export default Home;