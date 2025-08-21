import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './features/auth/login/login';
import Register from './features/auth/register/register'; // Add this import
import Home from './features/home/homepage';
import LoginGuard from './shared/guards/loginGuard';
import AuthGuard from './shared/guards/authGuard';
import Profile from './profile';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="login" replace />} />
      <Route path='/login' element={
        <LoginGuard>
          <Login />
        </LoginGuard>
      } />
      <Route path='/register' element={
        <LoginGuard>
          <Register />
        </LoginGuard>
      } />
      <Route path='/home' element={<Home />} />
      <Route
        path='/profile/:id'
        element={
          <AuthGuard>
            <Profile />
          </AuthGuard>
        }
      />
    </Routes>
  );
}

export default App;