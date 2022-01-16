import { useState } from 'react';
import axios from 'axios';
import {
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { useAuth } from '../../context/auth';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/react-fontawesome';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const { login, register } = useAuth();

  const testProtected = () => {
    const options = {
      url: 'http://localhost:3001/routines',
      method: 'GET',
    };
    axios(options).then((res) => {
      console.log(res);
    });
  };
  return (
    <VStack>
      <Heading textAlign='center'>{isLogin ? 'Login' : 'Register'}</Heading>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width='100px'>
            <Button height='80%' onClick={toggleShow}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        isFullWidth
        onClick={() =>
          isLogin
            ? login({ username: username, password: password })
            : register({ username: username, password: password })
        }
      >
        {isLogin ? 'Login' : 'Register'}
      </Button>
      <Button variant='link' onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Don't have an account? Register now"
          : 'Click here to login'}
      </Button>
      <Button onClick={testProtected}>test protected route</Button>
    </VStack>
  );
};

export default Login;
