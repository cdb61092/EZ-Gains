import {
  Box,
  HStack,
  VStack,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  GridItem,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { MdRemoveCircle } from 'react-icons/md';

const BuildDay = ({ day, workout, setWorkout }) => {
  const [exercises, setExercises] = useState([
    { name: '', sets: 0, reps: 0, weight: 0, rest: 0 },
  ]);

  const addExercise = () => {
    const newExercises = [...exercises];
    const newExercise = { name: '', sets: 0, reps: 0, weight: 0, rest: 0 };
    setExercises([...newExercises, newExercise]);
  };

  const updateExercise = (e, oldExercise) => {
    const { value, name } = e.target;

    setExercises(
      exercises.map((exercise) => {
        return exercise === oldExercise
          ? { ...exercise, [name]: value }
          : exercise;
      })
    );
  };

  useEffect(() => {
    console.log('in use effect');
    return () =>
      setWorkout([
        ...workout,
        {
          day: day,
          exercises: exercises,
        },
      ]);
  }, []);

  return (
    <Box>
      <Text>{day}</Text>
      <VStack spacing={5}>
        <Text>Add an exercise</Text>
        <Button onClick={addExercise}>Add +</Button>
        {exercises.map((exercise, index) => {
          return (
            <Box key={index}>
              <HStack>
                <FormControl>
                  <FormLabel>Exercise name</FormLabel>
                  <Input
                    value={exercise.name}
                    onChange={(e) => updateExercise(e, exercise)}
                    name='name'
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Sets</FormLabel>
                  <Input
                    value={exercise.sets}
                    name='sets'
                    onChange={(e) => updateExercise(e, exercise)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Reps</FormLabel>
                  <Input
                    value={exercise.reps}
                    name='reps'
                    onChange={(e) => updateExercise(e, exercise)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Weight</FormLabel>
                  <Input
                    value={exercise.weight}
                    name='weight'
                    onChange={(e) => updateExercise(e, exercise)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Rest</FormLabel>
                  <Input
                    value={exercise.rest}
                    name='rest'
                    onChange={(e) => updateExercise(e, exercise)}
                  />
                </FormControl>

                <IconButton
                  icon={<MdRemoveCircle />}
                  aria-label='Remove exercise'
                  color='red'
                  alignSelf='flex-end'
                  fontSize='30px'
                  variant='unstyled'
                  onClick={() =>
                    setExercises(
                      exercises.filter((filteredExercise) => {
                        return filteredExercise !== exercise;
                      })
                    )
                  }
                ></IconButton>
              </HStack>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export { BuildDay };
