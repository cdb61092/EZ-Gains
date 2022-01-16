import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import Login from './components/Login';
import { useAuth } from './context/auth';
import { Home } from './components/Home';
import { CreateRoutine } from './components/CreateRoutine';
import { BuildRoutineProvider } from './context/build-routine';

axios.defaults.withCredentials = true;

function App() {
  const { user } = useAuth();
  console.log(user);
  return (
    <Router>
      <BuildRoutineProvider>
        <Flex h='100vh' justify='center' align='center'>
          <Routes>
            <Route exact path='/' element={user ? <Home /> : <Login />} />
            <Route exact path='create-routine' element={<CreateRoutine />} />
          </Routes>
        </Flex>
      </BuildRoutineProvider>
    </Router>
  );
}

export default App;
