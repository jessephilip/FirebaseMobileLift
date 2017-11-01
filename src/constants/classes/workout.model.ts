import { Exercise } from './exercise.model';
import { ExerciseNote } from './exerciseNote.model';
import * as helpers from '../helpers';

interface OptionalProps {
  endDate: Date;
  exerciseNote: ExerciseNote;
  startDate: Date;
}

export class Workout {
  private _ID: string;
  private _createdDate: Date;
  private _endDate: Date;
  private _exerciseNote: ExerciseNote;
  private _exercises: Exercise[];
  private _name: string;
  private _startDate: Date;
  private _uid: string;

  /* GETTERS and SETTERS */

  public get ID (): string { return this._ID; }
  public set ID (value: string) { this._ID = value; }

  public get createdDate (): Date { return this._createdDate; }
  public set createdDate (value: Date) { this._createdDate = value; }

  public get endDate (): Date { return this._endDate; }
  public set endDate (value: Date) { this._endDate = value; }

  public get exerciseNote (): ExerciseNote { return this._exerciseNote; }
  public set exerciseNote (value: ExerciseNote) { this._exerciseNote = value; }

  public get exercises (): Exercise[] { return this._exercises; }
  public set exercises (value: Exercise[]) { this._exercises = value; }

  public get name (): string { return this._name; }
  public set name (value: string) { this._name = value; }

  public get startDate (): Date { return this._startDate; }
  public set startDate (value: Date) { this._startDate = value; }

  /*  PUBLIC METHODS  */

  constructor (name: string, exercises: Exercise[], optionalProps?: OptionalProps) {
    this.ID = 'wID' + Date.now() + helpers.getRandomInt(10000);
    this.createdDate = new Date;

    this.name = name;
    this.exercises = exercises;

    if (optionalProps) {
      this.endDate = optionalProps.endDate;
      this.exerciseNote = optionalProps.exerciseNote;
      this.startDate = optionalProps.startDate;
    }
  }

  public getValues = (): Object => {
    return {
      ID: this.ID,
      createdDate: this.createdDate,
      endDate: this.endDate,
      name: this.name,
      exercises: this.exercises,
      startDate: this.startDate
    };
  }

  private hasExercise (value: Exercise): boolean {
    return this.exercises.find(exercise => exercise.ID === value.ID) !== undefined;
  }

  public timestamp = (key: string): Date => {
    if (key === 'createdDate' || key === 'startDate' || key === 'endDate') {
      this[key] = new Date;
      return this[key];
    }
    throw new Error ('Improper key name provided to timestamp function. Values must be "createdDate", "startDate", or "endDate".');
  }

  // CRUD

  public addExercise (value: Exercise): Exercise[] {
    // no duplicate exercises. meaning no exercises with the same ID
    if (this.hasExercise(value)) {
      throw new Error ('No duplicate exercises in a workout. This means the ID number of the exercises must be different.');
    }

    this.exercises.push(value);
    return this.exercises;
  }

  public getExerciseById (id: string): Exercise {
    return this.getExercisesByValue('ID', id)[0];
  }

  public getExercisesByName (name: string): Exercise[] {
    return this.getExercisesByValue('name', name);
  }

  public getExercisesByValue (key: string, value: any): Exercise[] {
    return this.exercises.filter(exercise => exercise[key] === value);
  }

  public updateExercise (exercise: Exercise, key: string, newValue: any): Exercise {
    const target = this.getExerciseById(exercise.ID);
    target[key] = newValue;
    return target;
  }

  public replaceExercise (exerciseToReplace: Exercise, newValue: Exercise): Exercise[] {
    return this.exercises;
  }

  public deleteExercise (value: Exercise): Exercise[] {
    if (!this.hasExercise(value)) {
      throw new Error ('The provided exercises is not in this workout.');
    }

    const index = this.exercises.findIndex(exercise => exercise.ID === value.ID);
    this.exercises.splice(index, 1);
    return this.exercises;
  }

  public deleteAllExercises (): Exercise[] {
    this.exercises = [];
    return this.exercises;
  }
}