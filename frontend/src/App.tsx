import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './features/auth/login/login';
import Home from './features/home/homepage';
import LoginGuard from './shared/guards/loginGuard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="Login" replace />} />
      <Route path='/login' element={
        <LoginGuard>
          <Login />
        </LoginGuard>
      } />
      <Route path='/home' element={<Home />} />
    </Routes>
  );
}

export default App;
