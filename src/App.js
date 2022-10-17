import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './contexts/auth';
import Routes from './routes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={2000}/>
          <Routes />
      </BrowserRouter>
    </AuthProvider>


  );
}

export default App;
