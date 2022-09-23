export interface ResponseFuncs {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}

export interface IWord {
  _id?: number;
  word: string;
  translation: string;
}
