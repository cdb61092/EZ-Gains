import {
  Heading,
  Button,
  Text,
  Flex,
  Box,
  VStack,
  Link,
} from '@chakra-ui/react';
import { useAuth } from '../../context/auth';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DisplayRoutine } from '../DisplayRoutine';

const Home = () => {
  const { user } = useAuth();
  const [selectedRoutine, setSelectedRoutine] = useState();
  return (
    <Box width='100%'>
      <VStack marginTop='20'>
        <Heading>Welcome, {user.username}</Heading>
        <Text fontSize='xl'>Select a workout, or create a new one</Text>
        {user.routines.map((routine) => {
          return (
            <Button onClick={() => setSelectedRoutine(routine)}>
              {routine.name}
            </Button>
          );
        })}
        <Link as={RouterLink} to='/create-routine'>
          Create New Routine
        </Link>

        {selectedRoutine && <DisplayRoutine routine={selectedRoutine} />}
      </VStack>
    </Box>
  );
};

export { Home };
