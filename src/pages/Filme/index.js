import './filme-info.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';

export default function Filme(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme(){      
      const response = await api.get(`r-api/?api=filmes/${id}`);
      if(response.data.length === 0){
        // Tentou acessar com um id que não existe, navego ele para a home!
        navigate('/', { replace: true })
        return;
      }
      setFilme(response.data);
      setLoading(false);
    }

    loadFilme();

    return () => {
      console.log('Componente desmontado')
    }
  }, [navigate, id])

  function salvaFilme(){
    const minhaLista = localStorage.getItem('filmes');
    let filmesSalvos = JSON.parse(minhaLista) || [];

    // Se tiver algum filme salvo com esse mesmo id precisa ignorar...
    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
    if(hasFilme){
      toast.error('Você já possui esse filme salvo!')      
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!')
  }

  if(loading){
    return(
      <div className='filme-info'>
        <h1>Carregando seu filme...</h1>
      </div>
    )
  }
  return(
    <div className='filme-info'>
      <h1>{filme.nome}</h1>
      <img src={filme.foto} alt={filme.nome}/>
      <h3>Sinopse</h3>
      {filme.sinopse}
      <div className='botoes'>
        <button onClick={salvaFilme}>Salvar</button>
        <button>
          <a href={`https://youtube.com/results?search_query=${filme.nome} Trailer`} target="blank">
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}