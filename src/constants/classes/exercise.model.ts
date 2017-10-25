import { ExerciseNote } from './../interfaces';
import { MuscleCategory, MuscleGroup } from '../enums';
import * as helpers from '../helpers';

interface OptionalProperties {
  endTime?: Date;
  exerciseNote?: ExerciseNote;
  muscleCategory?: MuscleCategory;
  primaryMuscleGroup?: MuscleGroup;
  secondaryMuscleGroup?: MuscleGroup;
  startTime?: Date;
  weightUnit?: string;
  weight?: number | string;
  workout?: Exercise[];
}

export class Exercise {
  private _ID: number;
  private _createdTime: Date;
  private _endTime: Date;
  private _exerciseNote: ExerciseNote;
  private _isWeighted: boolean;
  private _name: string;
  private _muscleCategory: MuscleCategory;
  private _primaryMuscleGroup: MuscleGroup;
  private _secondaryMuscleGroup: MuscleGroup;
  private _startTime: Date;
  private _uid: string;
  private _weightUnit: string;
  private _weight: number | string;
  private _workout: Exercise[];

  /*  GETTERS and SETTERS  */

  public get ID (): number { return this._ID; }
  public set ID (value: number) { this._ID = value; }

  public get createdTime (): Date { return this._createdTime; }
  public set createdTime (value: Date) { this._createdTime = value; }

  public get endTime (): Date { return this._endTime; }
  public set endTime (value: Date) { this._endTime = value; }

  public get exerciseNote (): ExerciseNote { return this._exerciseNote; }
  public set exerciseNote (value: ExerciseNote) { this._exerciseNote = value; }

  public get isWeighted (): boolean { return this._isWeighted; }
  public set isWeighted (value: boolean) { this._isWeighted = value; }

  public get name (): string { return this._name; }
  public set name (value: string) { this._name = value; }

  public get muscleCategory (): MuscleCategory { return this._muscleCategory; }
  public set muscleCategory (value: MuscleCategory) { this._muscleCategory = value; }

  public get primaryMuscleGroup (): MuscleGroup { return this._primaryMuscleGroup; }
  public set primaryMuscleGroup (value: MuscleGroup) { this._primaryMuscleGroup = value; }

  public get secondaryMuscleGroup (): MuscleGroup { return this._secondaryMuscleGroup; }
  public set secondaryMuscleGroup (value: MuscleGroup) { this._secondaryMuscleGroup = value; }

  public get startTime (): Date { return this._startTime; }
  public set startTime (value: Date) { this._startTime = value; }

  public get uid (): string { return this._uid; }
  public set uid (value: string) { this._uid = value; }

  public get weightUnit (): string { return this._weightUnit; }
  public set weightUnit (value: string) { this._weightUnit = value; }

  public get weight (): number | string  { return this._weight; }
  public set weight (value: number | string) {
    this._weight = value;
    this.isWeighted = Boolean(value);
  }

  public get workout (): Exercise[] { return this._workout; }
  public set workout (value: Exercise[]) { this._workout = value; }

  /*  PUBLIC METHODS  */

  public getValues (): Object {
    return {
      ID: this.ID,
      createdTime: this.createdTime,
      endTime: this.endTime,
      exerciseNote: this.exerciseNote,
      isWeighted: this.isWeighted,
      name: this.name,
      muscleCategory: this.muscleCategory,
      primaryMuscleGroup: this.primaryMuscleGroup,
      secondaryMuscleGroup: this.secondaryMuscleGroup,
      startTime: this.startTime,
      uid: this.uid,
      weight: this.weight,
      weightUnit: this.weightUnit,
      workout: this.workout,
    };
  }

  constructor (name: string, uid: string, optionalProperties?: OptionalProperties) {
    // auto set
    this.ID = Date.now() + helpers.getRandomInt(10000);
    this.createdTime = new Date();

    // required
    this.name = name;
    this.uid = uid;

    // optional
    if (optionalProperties) {
      this.endTime = optionalProperties.endTime;
      this.exerciseNote = optionalProperties.exerciseNote;
      this.muscleCategory = optionalProperties.muscleCategory;
      this.primaryMuscleGroup = optionalProperties.primaryMuscleGroup;
      this.secondaryMuscleGroup = optionalProperties.secondaryMuscleGroup;
      this.weightUnit = optionalProperties.weightUnit;
      this.weight = optionalProperties.weight;
      this.workout = optionalProperties.workout;
    }
  }
}
