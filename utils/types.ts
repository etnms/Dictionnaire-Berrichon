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
  gloss: string; 
}

export interface ISimilarWord {
  word: string,
  _id?: number,
}