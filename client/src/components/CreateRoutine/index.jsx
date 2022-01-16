import {
  Box,
  Text,
  Input,
  Checkbox,
  CheckboxGroup,
  Flex,
  Button,
  HStack,
  FormLabel,
  FormControl,
  FormErrorMessage,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { InitialSteps } from './InitialSteps';
import { BuildDay } from './BuildDay';
import {
  useBuildRoutine,
  BuildRoutineProvider,
} from '../../context/build-routine';

const days = [
  ['Sunday', 1],
  ['Monday', 2],
  ['Tuesday', 3],
  ['Wednesday', 4],
  ['Thursday', 5],
  ['Friday', 6],
  ['Saturday', 7],
];

const CreateRoutine = () => {
  const [workoutDays, setWorkoutDays] = useState([]);
  const [firstStepComplete, setFirstStepComplete] = useState(false);
  const [workout, setWorkout] = useState([]);
  const [dayStep, setDayStep] = useState(0);
  const [currentDay, setCurrentDay] = useState(workoutDays[dayStep]);

  useEffect(() => {
    setCurrentDay(workoutDays[dayStep]);
  }, [dayStep, workoutDays]);

  const nextStep = () => {
    // addToWorkout(day);
    setDayStep(dayStep + 1);
  };
  // const addToWorkout = (day) => {
  //   setWorkout([...workout, day]);
  // };
  // const {
  //   firstStepComplete,
  //   workoutDays,
  //   setWorkoutDays,
  //   currentDay,
  //   setFirstStepComplete,
  //   nextStep,
  // } = useBuildRoutine();

  return (
    <Box w='700px'>
      {!firstStepComplete && (
        <InitialSteps
          workoutDays={workoutDays}
          setWorkoutDays={setWorkoutDays}
        />
      )}

      {firstStepComplete &&
        workoutDays.map((day) => {
          return (
            day === currentDay && (
              <BuildDay
                day={currentDay}
                workout={workout}
                setWorkout={setWorkout}
                // addToWorkout={addToWorkout}
              />
            )
          );
        })}

      <Button
        isFullWidth
        marginTop='30px'
        onClick={() =>
          !firstStepComplete ? setFirstStepComplete(true) : nextStep()
        }
      >
        {firstStepComplete ? 'Continue' : 'Build Routine'}
      </Button>
    </Box>
  );
};

export { CreateRoutine };
