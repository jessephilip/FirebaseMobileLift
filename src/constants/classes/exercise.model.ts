import { ExerciseNote } from './exerciseNote.model';
import { Workout } from './workout.model';
import { MuscleCategory, MuscleGroup, ResistanceType } from '../enums';
import * as helpers from '../helpers';

export interface OptionalProperties {
  endDate?: Date;
  exerciseNote?: ExerciseNote;
  muscleCategory?: MuscleCategory;
  prefix?: string;
  primaryMuscleGroup?: MuscleGroup;
  reps?: number;
  repType?: string;
  resistanceType?: ResistanceType;
  secondaryMuscleGroup?: MuscleGroup;
  startDate?: Date;
  suffix?: string;
  weightUnit?: string;
  weight?: number | string;
  workout?: Workout;
}

export class Exercise {
  private _ID: string;
  private _createdDate: Date;
  private _endDate: Date;
  private _exerciseNote: ExerciseNote;
  private _isWeighted: boolean;
  private _name: string;
  private _muscleCategory: MuscleCategory;
  private _prefix: string;
  private _primaryMuscleGroup: MuscleGroup;
  private _reps: number;
  private _repType: string;
  private _resistanceType: ResistanceType;
  private _secondaryMuscleGroup: MuscleGroup;
  private _startDate: Date;
  private _suffix: string;
  private _uid: string;
  private _weightUnit: string;
  private _weight: number | string;
  private _workout: Workout;

  /*  GETTERS and SETTERS  */

  public get ID (): string { return this._ID; }
  public set ID (value: string) { this._ID = value; }

  public get createdDate (): Date { return this._createdDate; }
  public set createdDate (value: Date) { this._createdDate = value; }

  public get endDate (): Date { return this._endDate; }
  public set endDate (value: Date) { this._endDate = value; }

  public get exerciseNote (): ExerciseNote { return this._exerciseNote; }
  public set exerciseNote (value: ExerciseNote) { this._exerciseNote = value; }

  public get isWeighted (): boolean { return this._isWeighted; }
  public set isWeighted (value: boolean) { this._isWeighted = value; }

  public get muscleCategory (): MuscleCategory { return this._muscleCategory; }
  public set muscleCategory (value: MuscleCategory) { this._muscleCategory = value; }

  public get name (): string { return this._name; }
  public set name (value: string) { this._name = value; }

  public get prefix (): string { return this._prefix; }
  public set prefix (value: string) { this._prefix = value; }

  public get primaryMuscleGroup (): MuscleGroup { return this._primaryMuscleGroup; }
  public set primaryMuscleGroup (value: MuscleGroup) { this._primaryMuscleGroup = value; }

  public get reps (): number { return this._reps; }
  public set reps (value: number) { this._reps = value; }

  public get resistanceType (): ResistanceType { return this._resistanceType; }
  public set resistanceType (value: ResistanceType) { this._resistanceType = value; }

  public get repType (): string { return this._repType; }
  public set repType (value: string) { this._repType = value; }

  public get secondaryMuscleGroup (): MuscleGroup { return this._secondaryMuscleGroup; }
  public set secondaryMuscleGroup (value: MuscleGroup) { this._secondaryMuscleGroup = value; }

  public get startDate (): Date { return this._startDate; }
  public set startDate (value: Date) { this._startDate = value; }

  public get suffix (): string { return this._suffix; }
  public set suffix (value: string) { this._suffix = value; }

  public get uid (): string { return this._uid; }
  public set uid (value: string) { this._uid = value; }

  public get weightUnit (): string { return this._weightUnit; }
  public set weightUnit (value: string) { this._weightUnit = value; }

  public get weight (): number | string  { return this._weight; }
  public set weight (value: number | string) {
    this._weight = value;
    this.isWeighted = Boolean(value);
  }

  public get workout (): Workout { return this._workout; }
  public set workout (value: Workout) { this._workout = value; }

  constructor (name: string, uid: string, optionalProperties?: OptionalProperties) {
    // auto set
    this.ID = 'eID' + Date.now() + helpers.getRandomInt(10000);
    this.createdDate = new Date();

    // required
    this.name = name;
    this.uid = uid;

    // optional
    if (optionalProperties) {
      this.endDate = optionalProperties.endDate;
      this.exerciseNote = optionalProperties.exerciseNote;
      this.muscleCategory = optionalProperties.muscleCategory;
      this.prefix = optionalProperties.prefix;
      this.primaryMuscleGroup = optionalProperties.primaryMuscleGroup;
      this.reps = optionalProperties.reps;
      this.repType = optionalProperties.repType;
      this.resistanceType = optionalProperties.resistanceType;
      this.secondaryMuscleGroup = optionalProperties.secondaryMuscleGroup;
      this.suffix = optionalProperties.suffix;
      this.weightUnit = optionalProperties.weightUnit;
      this.weight = optionalProperties.weight;
      this.workout = optionalProperties.workout;
    }
  }

  /*  PUBLIC METHODS  */

  public getValues (): Object {
    return {
      ID: this.ID,
      createdDate: this.createdDate,
      endDate: this.endDate,
      exerciseNote: this.exerciseNote,
      isWeighted: this.isWeighted,
      muscleCategory: this.muscleCategory,
      name: this.name,
      prefix: this.prefix,
      primaryMuscleGroup: this.primaryMuscleGroup,
      reps: this.reps,
      repType: this.repType,
      resistanceType: this.resistanceType,
      secondaryMuscleGroup: this.secondaryMuscleGroup,
      startDate: this.startDate,
      suffix: this.suffix,
      uid: this.uid,
      weight: this.weight,
      weightUnit: this.weightUnit,
      workout: this.workout,
    };
  }

  public timestamp = (key: string): Date => {
    if (key === 'createdDate' || key === 'startDate' || key === 'endDate') {
      this[key] = new Date;
      return this[key];
    }
    throw new Error ('Improper key name provided to timestamp function. Values must be "createdDate", "startDate", or "endDate".');
  }
}
