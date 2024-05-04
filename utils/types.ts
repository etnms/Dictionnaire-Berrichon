export type ResponseFuncs = {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
};

export type Entry = {
  _id?: number;
  word: string;
  translation: string;
  definition: string;
  pos: string;
  gloss: string;
  dialect: string;
};

export type EntryResults = {
  entries: Entry[];
  similarWords: SimilarWord[];
};

export type SimilarWord = {
  word: string;
  _id?: number;
};
