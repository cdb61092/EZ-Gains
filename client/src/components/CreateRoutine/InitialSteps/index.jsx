import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import { useState } from 'react';

const days = [
  ['Sunday', 1],
  ['Monday', 2],
  ['Tuesday', 3],
  ['Wednesday', 4],
  ['Thursday', 5],
  ['Friday', 6],
  ['Saturday', 7],
];

const InitialSteps = ({ workoutDays, setWorkoutDays }) => {
  const handleChange = (e) => {
    if (workoutDays.includes(e.target.value)) {
      setWorkoutDays(workoutDays.filter((day) => day !== e.target.value));
    } else {
      setWorkoutDays([...workoutDays, e.target.value]);
    }
  };
  return (
    <>
      <FormControl>
        <FormLabel htmlFor='name'>Workout name</FormLabel>
        <Input id='name' placeholder='name'></Input>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='description'>Workout description</FormLabel>
        <Input id='description' placeholder='description'></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Which days do you want to work out?</FormLabel>
        <Flex w='100%' justify='space-between'>
          <CheckboxGroup>
            {days.map(([day, dayNum]) => {
              return (
                <Checkbox
                  value={day}
                  key={dayNum}
                  onChange={(e) => handleChange(e)}
                >
                  {day}
                </Checkbox>
              );
            })}
          </CheckboxGroup>
        </Flex>
      </FormControl>
    </>
  );
};

export { InitialSteps };
