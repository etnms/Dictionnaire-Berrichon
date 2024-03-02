export type ResponseFuncs = {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
};

export type Word = {
  _id?: number;
  word: string;
  translation: string;
  definition: string;
  pos: string;
  gloss: string;
};

export type SimilarWord = {
  word: string;
  _id?: number;
};
