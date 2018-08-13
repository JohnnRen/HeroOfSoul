// @flow

/* To make it clear, types defined here are for type-checking.
   Classes here are for object construction  */

export type typeTask = {
  content: string,
  status: 'active' | 'inactive',
  timeEstimated: number,
  timeCost: number,
};

export class Task {
  content: string;
  status: ('active' | 'inactive') = 'inactive';
  timeEstimated: number = 15 * 60 * 1000;
  timeCost: number = 0;

  constructor(content: string) {
    this.content = content;
  }
}
