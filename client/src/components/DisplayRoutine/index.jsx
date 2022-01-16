import {
  Box,
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from '@chakra-ui/react';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const getDayOfWeek = (num) => {
  return days[num];
};

const DisplayRoutine = ({ routine }) => {
  return (
    <Box width='100%'>
      <Flex width='100%' justifyContent='space-around'>
        {routine?.days.map((day) => {
          return (
            <Box>
              <Table variant='simple' width='300px'>
                <TableCaption placement='top'>
                  {getDayOfWeek(day.day + 1)}
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Exercise</Th>
                    <Th>Sets</Th>
                    <Th>Reps</Th>
                    <Th>Weight</Th>
                    <Th>Rest</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {day.exercises.map((exercise) => {
                    return (
                      <Tr>
                        <Td>{exercise.name}</Td>
                        <Td>{exercise.sets}</Td>
                        <Td>{exercise.reps}</Td>
                        <Td>{exercise.weight}</Td>
                        <Td>{exercise.rest}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          );
        })}
      </Flex>
      <Box textAlign='center' marginTop='30px'>
        <Button width='300px'>Start Workout</Button>
      </Box>
    </Box>
  );
};

export { DisplayRoutine };
