import { Workout } from './classes/workout.model';
// TODO: Set this up as coming from the database. This is just mock data right now.

import { Exercise, OptionalProperties } from './classes/exercise.model';
import { MuscleCategory, MuscleGroup, ResistanceType } from './enums';

export const CURRENTCHALLENGES = [
  { name: 'Drop and Give Me!', type: 'Set Number', muscleGroup: 'chest', amount: 20, exercise: 'push up', points: 5, isActiveChallenge: true },
  { name: 'Up, Up, and Away!', type: 'Set Number', muscleGroup: 'back', amount: 10, exercise: 'pull up', points: 15, isActiveChallenge: true },
  { name: 'Get Up to Get Down!', type: 'Set Number', muscleGroup: 'full body', amount: 20, exercise: 'burpee', points: 10, isActiveChallenge: true }
];

  // TODO: Set this up as coming from the database. This is just mock data right now.
export const PASTCHALLENGES = [
  { name: 'Pump You Up!', type: 'Set Number', muscleGroup: 'arms', amount: 20, exercise: 'bicep curl', points: 5 },
  { name: 'Get Low!', type: 'Set Number', muscleGroup: 'legs', amount: 10, exercise: 'squat', points: 15 },
  { name: 'Gonna Make You Jump!', type: 'Timed', muscleGroup: 'legs', amount: '60s', exercise: 'half tuck jump', points: 30 },
  { name: 'Pump You Up!', type: 'Set Number', muscleGroup: 'arms', amount: 20, exercise: 'bicep curl', points: 5 },
  { name: 'Get Low!', type: 'Set Number', muscleGroup: 'legs', amount: 10, exercise: 'squat', points: 15 },
  { name: 'Gonna Make You Jump!', type: 'Timed', muscleGroup: 'legs', amount: '60s', exercise: 'half tuck jump', points: 30 },
  { name: 'Pump You Up!', type: 'Set Number', muscleGroup: 'arms', amount: 20, exercise: 'bicep curl', points: 5 },
  { name: 'Get Low!', type: 'Set Number', muscleGroup: 'legs', amount: 10, exercise: 'squat', points: 15 },
  { name: 'Gonna Make You Jump!', type: 'Timed', muscleGroup: 'legs', amount: '60s', exercise: 'half tuck jump', points: 30 },
  { name: 'Pump You Up!', type: 'Set Number', muscleGroup: 'arms', amount: 20, exercise: 'bicep curl', points: 5 },
  { name: 'Get Low!', type: 'Set Number', muscleGroup: 'legs', amount: 10, exercise: 'squat', points: 15 },
  { name: 'Gonna Make You Jump!', type: 'Timed', muscleGroup: 'legs', amount: '60s', exercise: 'half tuck jump', points: 30 },
  { name: 'Pump You Up!', type: 'Set Number', muscleGroup: 'arms', amount: 20, exercise: 'bicep curl', points: 5 },
  { name: 'Get Low!', type: 'Set Number', muscleGroup: 'legs', amount: 10, exercise: 'squat', points: 15 },
  { name: 'Gonna Make You Jump!', type: 'Timed', muscleGroup: 'legs', amount: '60s', exercise: 'half tuck jump', points: 30 }
];

const secondExerciseProps: OptionalProperties = {
  muscleCategory: MuscleCategory.chest,
  primaryMuscleGroup: MuscleGroup.pectorals,
  reps: 20,
  repType: 'reps',
  resistanceType: ResistanceType.barbell,
  secondaryMuscleGroup: MuscleGroup.pectorals,
  weightUnit: 'lbs',
  weight: 175
};

const exercises: Exercise[] = [
  new Exercise('Bicep Curl', 'iuyadfhan'),
  new Exercise('Bench Press', 'iuyadfhan', secondExerciseProps),
  new Exercise('Pull-up', 'iuyadfhan')
];

export const WORKOUT: Workout = new Workout ('Full Body Pump', exercises);