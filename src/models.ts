export interface ISelectOneFromArray {
  type: "selectOneFromArray";
  array: any[];
}

export interface IRandomNumber {
  type: "randomNumber";
  min: number;
  max: number;
}

export interface IFormat {
  type: "format";
  format: string;
  sendComplete?: boolean;
  fn(v: string): string;
}

export interface IName {
  type: "name";
  gender: "male" | "female";
}

export interface IType {
  type: "lastname" | "uniqueId";
}

export interface IObject {
  [name: string]: ISuperType;
}

export type ISuperType =
  | IRandomNumber
  | IFormat
  | IName
  | IType
  | ISelectOneFromArray
  | IObject;
