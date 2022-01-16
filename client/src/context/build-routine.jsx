import { useContext, createContext, useState, useEffect } from 'react';

const BuildRoutineContext = createContext(null);
BuildRoutineContext.displayName = 'BuildRoutineContext';

const BuildRoutineProvider = ({ children }) => {
  const [workoutDays, setWorkoutDays] = useState([]);
  const [firstStepComplete, setFirstStepComplete] = useState(false);
  const [workout, setWorkout] = useState({});
  const [dayStep, setDayStep] = useState(0);
  const [currentDay, setCurrentDay] = useState(workoutDays[dayStep]);

  useEffect(() => {
    setCurrentDay(workoutDays[dayStep]);
  }, [dayStep, workoutDays]);

  console.log(workoutDays[0]);
  const nextStep = () => {
    setDayStep(dayStep + 1);
  };

  return (
    <BuildRoutineContext.Provider
      value={{
        workoutDays,
        setWorkoutDays,
        firstStepComplete,
        setFirstStepComplete,
        workout,
        setWorkout,
        dayStep,
        currentDay,
        nextStep,
      }}
    >
      {children}
    </BuildRoutineContext.Provider>
  );
};

const useBuildRoutine = () => useContext(BuildRoutineContext);

export { BuildRoutineProvider, useBuildRoutine };
