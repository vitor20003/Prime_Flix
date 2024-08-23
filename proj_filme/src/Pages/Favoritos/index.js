import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import './favoritos.css'
import {toast} from 'react-toastify'
function Favoritos(){
    const [filmes, setFilmes] = useState([])

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeFlix")

        setFilmes(JSON.parse(minhaLista) || [])
    },[])

    function excluirFilme(id){
        let filtrarFilmes = filmes.filter((item)=>{
            return(
                item.id !== id
            )
            
        })
        setFilmes(filtrarFilmes)
        toast.success("filme exlcuido com sucesso" )
        localStorage.setItem("@primeFlix", JSON.stringify(filtrarFilmes))
    }
    return(
        <div className="meus-filmes">
          <h1>Meus Filmes</h1>

          {filmes.length === 0 && <span>Você não possui nenhum filme na sua lista</span>}

          <ul>
            {filmes.map((item)=>{
                return(
                    <li key={item.id}>
                    <span>{item.title}</span>

                    <div>
                        <Link to={`/filmes/${item.id}`}>Ver detalhes </Link>
                        <button onClick={()=>excluirFilme(item.id)}>Excluir</button>
                    </div>
                </li>
                )
              
                
            })}
          </ul>
        </div>
    )
}
export default Favoritos