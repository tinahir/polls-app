export type ResultSuccess<T> = {
  limit: number;
  content: Array<T>;
  totalFound: number;
  offset: number;
};

export type ResultFail = {
  Error: string;
};

export type Result<T> = ResultSuccess<T> | ResultFail;
