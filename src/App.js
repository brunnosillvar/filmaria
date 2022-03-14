import './styles.css';
import Routers from './routes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// https://sujeitoprogramador.com/r-api/api=filmes -> Link da API

export default function App() {
  return (
    <div className='app'>
      <Routers/>
      <ToastContainer autoClose={3000} />
    </div>
  );
}