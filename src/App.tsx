import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Home from './pages/Home';
import Usuarios from './pages/Usuarios';
import Deposito from './pages/Deposito';
import Saque from './pages/Saque';
import Conversao from './pages/Conversao';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota solta sem o menu lateral */}
        <Route path="/" element={<Login />} />
        
        {/* Rotas protegidas dentro do Layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/deposito" element={<Deposito />} />
          <Route path="/saque" element={<Saque />} />
          <Route path="/conversao" element={<Conversao />} />
        </Route>
        
        {/* Redirecionamento padrão */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;