import { ExerciseNoteType } from '../enums';

export class ExerciseNote {

  /*  PRIVATE PROPERTIES  */

  private _type: ExerciseNoteType;
  private _notes: string[];

  /*  GETTERS and SETTERS */

  public get type (): ExerciseNoteType { return this._type; }
  public set type (value: ExerciseNoteType) { this._type = value; }

  public get notes (): string[] { return this._notes; }
  public set notes (value: string[]) { this._notes = value; }

  /*  PRIVATE METHODS  */

  private hasNote (value: string): boolean {
    return this.notes.find(note => note === value) !== undefined;
  }

  /*  PUBLIC METHODS  */

  public addNote (value: string): string[] {

    if (!value) {
      throw new Error ('Cannot pass empty string to Exercise Note.');
    }

    if (this.hasNote(value)) {
      throw new Error ('Duplicate notes are not allowed.');
    }

    this.notes.push(value);
    return this.notes;
  }

  public findNote (value: string): string {
    if (!this.hasNote(value)) {
      throw new Error ('This note does not exist.');
    }

    const index = this.notes.findIndex(note => note === value);
    return this.notes[index];
  }

  public editNote (oldValue: string, newValue: string): string[] {

    let noteToChange = this.findNote(oldValue);
    noteToChange = newValue;

    return this.notes;
  }

  public deleteNote (value: string): string[] {
    if (!this.hasNote(value)) {
      throw new Error ('This note does not exist, and therefore, cannot be deleted.');
    }

    const index = this.notes.findIndex(note => note === value);
    this.notes.splice(index, 1);
    return this.notes;
  }

  public deleteAll () {
    this.notes = [];
  }

  public getValues (): Object {
    return {
      type: this.type,
      notes: this.notes
    };
  }

  constructor (type, notes?: string[]) {
    this.type = type;
    this.notes = notes || [];
  }
}
