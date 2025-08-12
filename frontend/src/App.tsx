import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './features/auth/login/login';
import Home from './features/home/homepage';
import LoginGuard from './shared/guards/loginGuard';

import AuthGuard from './shared/guards/authGuard';
import Profile from './profile';

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

      {/* Change profile route to accept user ID */}
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
