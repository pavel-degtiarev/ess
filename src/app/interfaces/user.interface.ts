export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
}

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: GENDER.MALE | GENDER.FEMALE;
}

