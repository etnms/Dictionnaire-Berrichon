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
  definition: string;
  pos: string;
}

export interface ISimilarWord {
  word: string,
  translation: string,
  _id?: number,
}